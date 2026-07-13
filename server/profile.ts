import { findUserById, readDb, writeDb, type MockUser } from './auth'

export type ProfileDto = {
  name: string
  about: string
  avatarUrl?: string
}

export type ProfileUpdatePayload = Partial<Pick<MockUser, 'name' | 'about'>>

function toProfileDto(user: MockUser): ProfileDto {
  return {
    name: user.name ?? '',
    about: user.about ?? '',
    avatarUrl: user.avatarUrl,
  }
}

export function getProfileForUser(userId: number): ProfileDto | null {
  const user = findUserById(userId)
  return user ? toProfileDto(user) : null
}

export function updateProfileForUser(userId: number, payload: ProfileUpdatePayload): ProfileDto | null {
  const db = readDb()
  const user = db.users.find((item) => item._id === userId)
  if (!user) return null

  if (payload.name !== undefined) user.name = payload.name
  if (payload.about !== undefined) user.about = payload.about

  writeDb(db)
  return toProfileDto(user)
}

export function setAvatarPlaceholderForUser(userId: number): { avatarUrl: string } | null {
  const db = readDb()
  const user = db.users.find((item) => item._id === userId)
  if (!user) return null

  user.avatarUrl = `/img/avatars/${userId}.png`
  writeDb(db)

  return { avatarUrl: user.avatarUrl }
}
