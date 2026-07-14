import fs from 'node:fs'
import { createJwt, verifyJwt } from './jwt'

export type MockUser = {
  _id: number
  login: string
  password: string
  name?: string
  about?: string
  email?: string
  avatarUrl?: string
}

export type StoredOffer = {
  id: string
  title: string
  price: number
}

export type StoredEvent = {
  id: string
  userId: number
  type: string
  destination: {
    name: string
    description: string
    photos: string[]
  }
  dateFrom: string
  dateTo: string
  price: number
  offers: StoredOffer[]
  isFavorite: boolean
}

type DbShape = {
  users: MockUser[]
  events?: StoredEvent[]
}

export type SessionUser = Pick<MockUser, '_id' | 'login'>

const dbUrl = new URL('./db.json', import.meta.url)

export function readDb(): DbShape {
  const fileContent = fs.readFileSync(dbUrl, 'utf8')
  return JSON.parse(fileContent) as DbShape
}

export function writeDb(db: DbShape) {
  fs.writeFileSync(dbUrl, `${JSON.stringify(db, null, 2)}\n`, 'utf8')
}

export function sanitizeUser(user: MockUser): SessionUser {
  return { _id: user._id, login: user.login }
}

export function findUserByCredentials(login: string, password: string) {
  return readDb().users.find((user) => user.login === login && user.password === password) ?? null
}

export function findUserById(id: number) {
  return readDb().users.find((user) => user._id === id) ?? null
}

export function createUser(login: string, password: string) {
  const db = readDb()
  const normalizedLogin = login.trim().toLowerCase()

  if (db.users.some((user) => user.login === normalizedLogin)) {
    return { ok: false as const, error: 'User with this email already exists' }
  }

  const nextId = db.users.reduce((maxId, user) => Math.max(maxId, user._id), 0) + 1
  const newUser: MockUser = { _id: nextId, login: normalizedLogin, password }

  db.users.push(newUser)
  writeDb(db)

  return { ok: true as const, user: newUser }
}

export function createTokenForUser(user: MockUser): string {
  return createJwt({ sub: user._id, login: user.login })
}

export function parseBearerToken(authHeader: string | string[] | undefined) {
  if (!authHeader) return null
  if (Array.isArray(authHeader)) return parseBearerToken(authHeader[0])

  const [scheme, token] = authHeader.split(' ')
  if (scheme !== 'Bearer' || !token) return null

  return token
}

export function getUserByToken(token: string | null): SessionUser | null {
  if (!token) return null
  const payload = verifyJwt(token)
  if (!payload) return null

  return { _id: payload.sub, login: payload.login }
}

export function sendJson(res: import('node:http').ServerResponse, statusCode: number, payload: unknown) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(payload))
}

export function sendUnauthorized(res: import('node:http').ServerResponse, reason: string) {
  res.statusCode = 401
  res.setHeader('WWW-Authenticate', 'Bearer realm="Mock API"')
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify({ ok: false, error: reason }))
}

export async function readJsonBody<T>(req: import('node:http').IncomingMessage) {
  const chunks: Buffer[] = []

  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }

  const rawBody = Buffer.concat(chunks).toString('utf8').trim()
  if (!rawBody) {
    return {} as T
  }

  return JSON.parse(rawBody) as T
}
