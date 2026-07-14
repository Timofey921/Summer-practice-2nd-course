import { readDb, writeDb, type StoredEvent } from './auth'

export type EventDto = Omit<StoredEvent, 'userId'>

function toEventDto(event: StoredEvent): EventDto {
  const { ...rest } = event
  return rest
}

export function getEventsForUser(userId: number): EventDto[] {
  const db = readDb()
  return (db.events ?? []).filter((event) => event.userId === userId).map(toEventDto)
}

export function createEventForUser(userId: number, payload: EventDto): EventDto {
  const db = readDb()
  if (!db.events) db.events = []

  const newEvent: StoredEvent = { ...payload, userId }
  db.events.push(newEvent)
  writeDb(db)

  return toEventDto(newEvent)
}

export function updateEventForUser(
  userId: number,
  eventId: string,
  payload: Partial<EventDto>,
): EventDto | null {
  const db = readDb()
  const event = (db.events ?? []).find((item) => item.id === eventId && item.userId === userId)
  if (!event) return null

  Object.assign(event, payload)
  writeDb(db)

  return toEventDto(event)
}

export function deleteEventForUser(userId: number, eventId: string): boolean {
  const db = readDb()
  const initialLength = db.events?.length ?? 0

  db.events = (db.events ?? []).filter((item) => !(item.id === eventId && item.userId === userId))
  writeDb(db)

  return (db.events?.length ?? 0) < initialLength
}