import type { Destination} from '../types/event';
import { DESTINATIONS } from '../mock/data'

export const findDestinationByName = (name: string): Destination | null =>
  DESTINATIONS.find((destination) => destination.name === name) ?? null;