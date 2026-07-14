import type { TripEvent } from '../types/event';
import { formatTripDate, parseEventDateTime } from './date';

const sortByDateFrom = (events: TripEvent[]): TripEvent[] => {
  return [...events].sort((left, right) => {
    const leftTime = parseEventDateTime(left.dateFrom)?.getTime() ?? Number.MAX_SAFE_INTEGER;
    const rightTime = parseEventDateTime(right.dateFrom)?.getTime() ?? Number.MAX_SAFE_INTEGER;
    return leftTime - rightTime;
  });
};

export const getRouteTitle = (events: TripEvent[]): string => {
  if (events.length === 0) {
    return '';
  }

  const names = sortByDateFrom(events).map((event) => event.destination.name);

  if (names.length <= 3) {
    return names.join(' — ');
  }

  return `${names[0]} —... — ${names[names.length - 1]}`;
};

export const getTripDates = (events: TripEvent[]): string => {
  if (events.length === 0) {
    return '';
  }

  const sorted = sortByDateFrom(events);
  const start = parseEventDateTime(sorted[0].dateFrom);
  const end = parseEventDateTime(sorted[sorted.length - 1].dateTo);

  if (!start || !end) {
    return '';
  }

  const startLabel = formatTripDate(start);

  const isSameDay =
    start.getFullYear() === end.getFullYear() &&
    start.getMonth() === end.getMonth() &&
    start.getDate() === end.getDate();

  if (isSameDay) {
    return startLabel;
  }

  return `${startLabel} — ${formatTripDate(end)}`;
};
