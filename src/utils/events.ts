import type { FilterType, SortType, TripEvent } from '../types/event';
import { parseEventDateTime } from './date';

export const getEventDuration = (event: TripEvent): number => {
  const start = parseEventDateTime(event.dateFrom);
  const end = parseEventDateTime(event.dateTo);

  if (!start || !end) {
    return 0;
  }

  return Math.max(0, end.getTime() - start.getTime());
};

export const filterEvents = (events: TripEvent[], filter: FilterType): TripEvent[] => {
  if (filter === 'everything') {
    return events;
  }

  const now = Date.now();

  return events.filter((event) => {
    const start = parseEventDateTime(event.dateFrom);
    const end = parseEventDateTime(event.dateTo);

    if (!start || !end) {
      return filter === 'past';
    }

    const startTime = start.getTime();
    const endTime = end.getTime();

    switch (filter) {
      case 'future':
        return startTime > now;
      case 'present':
        return startTime <= now && endTime >= now;
      case 'past':
        return endTime < now;
      default:
        return true;
    }
  });
};

export const sortEvents = (events: TripEvent[], sort: SortType): TripEvent[] => {
  const sorted = [...events];

  sorted.sort((left, right) => {
    switch (sort) {
      case 'day': {
        const leftDate = parseEventDateTime(left.dateFrom)?.getTime() ?? Number.MAX_SAFE_INTEGER;
        const rightDate = parseEventDateTime(right.dateFrom)?.getTime() ?? Number.MAX_SAFE_INTEGER;
        return leftDate - rightDate;
      }
      case 'time':
        return getEventDuration(left) - getEventDuration(right);
      case 'price':
        return left.price - right.price;
      default:
        return 0;
    }
  });

  return sorted;
};
