const MONTHS = [
  'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
  'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC',
];

export const parseEventDateTime = (value: string): Date | null => {
  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{2})\s+(\d{2}):(\d{2})$/);

  if (!match) {
    return null;
  }

  const [, day, month, year, hours, minutes] = match;
  return new Date(2000 + Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes));
};

export const formatEventDate = (value: string): string => {
  const date = parseEventDateTime(value);

  if (!date) {
    return value;
  }

  return `${MONTHS[date.getMonth()]} ${String(date.getDate()).padStart(2, '0')}`;
};

export const formatEventTime = (value: string): string => {
  const date = parseEventDateTime(value);

  if (!date) {
    return value;
  }

  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
};

export const formatEventDuration = (from: string, to: string): string => {
  const start = parseEventDateTime(from);
  const end = parseEventDateTime(to);
  
  if (!start || !end) {
    return '';
  }

  const totalMinutes = Math.max(0, Math.round((end.getTime() - start.getTime()) / 60000));
  const days = Math.floor(totalMinutes / (24 * 60));
  const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
  const minutes = totalMinutes % 60;

  if (days > 0) {
    return `${String(days).padStart(2, '0')}D ${String(hours).padStart(2, '0')}H ${String(minutes).padStart(2, '0')}M`;
  }
  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}H ${String(minutes).padStart(2, '0')}M`;
  }
  return `${String(minutes).padStart(2, '0')}M`;
};

export const formatTripDate = (date: Date): string => {
  return `${date.getDate()} ${MONTHS[date.getMonth()]}`;
};
