import type { Destination, EventType, Offer } from '../types/event';

export const EVENT_TYPES: EventType[] = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  taxi: 'Taxi',
  bus: 'Bus',
  train: 'Train',
  ship: 'Ship',
  drive: 'Drive',
  flight: 'Flight',
  'check-in': 'Check-in',
  sightseeing: 'Sightseeing',
  restaurant: 'Restaurant',
};

export const AVAILABLE_OFFERS: Offer[] = [
  { id: 'luggage', title: 'Add luggage', price: 30 },
  { id: 'comfort', title: 'Switch to comfort class', price: 100 },
  { id: 'meal', title: 'Add meal', price: 15 },
  { id: 'seats', title: 'Choose seats', price: 5 },
  { id: 'train', title: 'Travel by train', price: 40 },
];

export const DESTINATIONS: Destination[] = [
  {
    name: 'Amsterdam',
    description:
      'Amsterdam is the capital and most populous city of the Netherlands, known for its canals and cultural heritage.',
    photos: ['/img/1.jpg', '/img/2.jpg'],
  },
  {
    name: 'Geneva',
    description:
      'Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.',
    photos: ['/img/3.jpg', '/img/4.jpg', '/img/5.jpg'],
  },
  {
    name: 'Chamonix',
    description:
      "Chamonix-Mont-Blanc (usually shortened to Chamonix) is a resort area near the junction of France, Switzerland and Italy. At the base of Mont Blanc, the highest summit in the Alps, it's renowned for its skiing.",
    photos: ['/img/1.jpg'],
  },
];
