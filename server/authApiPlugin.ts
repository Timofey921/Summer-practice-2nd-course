import type { Plugin } from 'vite'
import {
  createTokenForUser,
  createUser,
  findUserByCredentials,
  getUserByToken,
  parseBearerToken,
  readJsonBody,
  sanitizeUser,
  sendJson,
  sendUnauthorized,
} from './auth'
import { getProfileForUser, setAvatarPlaceholderForUser, updateProfileForUser } from './profile'
import { createEventForUser, deleteEventForUser, getEventsForUser, updateEventForUser, type EventDto } from './events'
import { protectedPrefixes } from './protectedRoutes'

type Credentials = { login: string; password: string }

export function authApiPlugin(): Plugin {
  return {
    name: 'auth-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url) return next()

        if (req.url === '/api/auth/register' && req.method === 'POST') {
          const body = await readJsonBody<Credentials>(req)

          if (!body.login || !body.password) {
            return sendJson(res, 400, { ok: false, error: 'login and password are required' })
          }

          const result = createUser(body.login, body.password)
          if (!result.ok) {
            return sendJson(res, 409, { ok: false, error: result.error })
          }

          const token = createTokenForUser(result.user)
          return sendJson(res, 201, {
            ok: true,
            token,
            tokenType: 'Bearer',
            user: sanitizeUser(result.user),
          })
        }

        if (req.url === '/api/auth/login' && req.method === 'POST') {
          const body = await readJsonBody<Credentials>(req)
          const user = findUserByCredentials(body.login, body.password)

          if (!user) {
            return sendJson(res, 401, { ok: false, error: 'Wrong email and password' })
          }

          const token = createTokenForUser(user)
          return sendJson(res, 200, {
            ok: true,
            token,
            tokenType: 'Bearer',
            user: sanitizeUser(user),
          })
        }

        if (req.url === '/api/auth/me' && req.method === 'GET') {
          const token = parseBearerToken(req.headers.authorization)
          const user = getUserByToken(token)

          if (!user) {
            return sendUnauthorized(res, 'Invalid or expired token')
          }

          return sendJson(res, 200, { ok: true, user })
        }

        if (req.url === '/api/profile' && (req.method === 'GET' || req.method === 'PATCH')) {
          const token = parseBearerToken(req.headers.authorization)
          const sessionUser = getUserByToken(token)

          if (!sessionUser) {
            return sendUnauthorized(res, 'Invalid or expired token')
          }

          if (req.method === 'GET') {
            const profile = getProfileForUser(sessionUser._id)
            return sendJson(res, 200, profile)
          }

          const payload = await readJsonBody<{ name?: string; about?: string }>(req)
          const updatedProfile = updateProfileForUser(sessionUser._id, payload)
          return sendJson(res, 200, updatedProfile)
        }

        if (req.url === '/api/profile/avatar' && req.method === 'POST') {
          const token = parseBearerToken(req.headers.authorization)
          const sessionUser = getUserByToken(token)

          if (!sessionUser) {
            return sendUnauthorized(res, 'Invalid or expired token')
          }

          const result = setAvatarPlaceholderForUser(sessionUser._id)
          return sendJson(res, 200, result)
        }

        if (req.url === '/api/events' && (req.method === 'GET' || req.method === 'POST')) {
          const token = parseBearerToken(req.headers.authorization)
          const sessionUser = getUserByToken(token)

          if (!sessionUser) {
            return sendUnauthorized(res, 'Invalid or expired token')
          }

          if (req.method === 'GET') {
            const events = getEventsForUser(sessionUser._id)
            return sendJson(res, 200, events)
          }

          const payload = await readJsonBody<EventDto>(req)
          const created = createEventForUser(sessionUser._id, payload)
          return sendJson(res, 201, created)
        }

        const eventIdMatch = req.url.match(/^\/api\/events\/([^/]+)$/)
        if (eventIdMatch && (req.method === 'PUT' || req.method === 'PATCH' || req.method === 'DELETE')) {
          const token = parseBearerToken(req.headers.authorization)
          const sessionUser = getUserByToken(token)

          if (!sessionUser) {
            return sendUnauthorized(res, 'Invalid or expired token')
          }

          const eventId = eventIdMatch[1]

          if (req.method === 'DELETE') {
            const deleted = deleteEventForUser(sessionUser._id, eventId)
            return sendJson(res, deleted ? 200 : 404, { ok: deleted })
          }

          const payload = await readJsonBody<Partial<EventDto>>(req)
          const updated = updateEventForUser(sessionUser._id, eventId, payload)

          if (!updated) {
            return sendJson(res, 404, { ok: false, error: 'Event not found' })
          }

          return sendJson(res, 200, updated)
        }

        const isProtected = protectedPrefixes.some((prefix) => req.url!.startsWith(prefix))
        if (isProtected) {
          const token = parseBearerToken(req.headers.authorization)
          const user = getUserByToken(token)

          if (!user) {
            return sendUnauthorized(res, 'Invalid or expired token')
          }
        }

        next()
      })
    },
  }
}
