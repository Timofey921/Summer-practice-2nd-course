import { AxiosError } from 'axios';

export function toReadableError(error: unknown, fallback: string): Error {
  if (error instanceof AxiosError) {
    const serverMessage = (error.response?.data as { error?: string } | undefined)?.error;
    return new Error(serverMessage ?? fallback);
  }

  return error instanceof Error ? error : new Error(fallback);
}