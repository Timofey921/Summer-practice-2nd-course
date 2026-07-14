import api from './axiosInstance';
import type { TripEvent } from '../types/event';

export const fetchEvents = async (): Promise<TripEvent[]> => {
  const { data } = await api.get<TripEvent[]>('/events');
  return data;
};

export const createEvent = async (event: TripEvent): Promise<TripEvent> => {
  const { data } = await api.post<TripEvent>('/events', event);
  return data;
};

export const updateEvent = async (event: TripEvent): Promise<TripEvent> => {
  const { data } = await api.put<TripEvent>(`/events/${event.id}`, event);
  return data;
};

export const deleteEvent = async (id: string): Promise<void> => {
  await api.delete(`/events/${id}`);
};
