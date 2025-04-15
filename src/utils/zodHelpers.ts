import { ZodSchema } from 'zod';

export function safeParseOrThrow<T>(schema: ZodSchema<T>, data: unknown, errorMessage?: string): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    console.error('Zod parsing error:', result.error.format());
    throw new Error(errorMessage || 'Parsing failed. Invalid response from server.');
  }

  return result.data;
}
