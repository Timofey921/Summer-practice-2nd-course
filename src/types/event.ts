export type EventType =
  | 'taxi'
  | 'bus'
  | 'train'
  | 'ship'
  | 'drive'
  | 'flight'
  | 'check-in'
  | 'sightseeing'
  | 'restaurant';

export interface Offer {
  id: string;
  title: string;
  price: number;
}

export interface Destination {
  name: string;
  description: string;
  photos: string[];
}

export interface TripEvent {
  id: string;
  type: EventType;
  destination: Destination;
  dateFrom: string;
  dateTo: string;
  price: number;
  offers: Offer[];
  isFavorite: boolean;
}

export type FilterType = 'everything' | 'future' | 'present' | 'past';

export type SortType = 'day' | 'event' | 'time' | 'price' | 'offer';
