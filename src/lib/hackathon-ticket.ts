import { randomBytes } from 'node:crypto';

import { customAlphabet } from 'nanoid';
import { v4 as uuidv4 } from 'uuid';

export function genTicketCode(): string {
  // TODO: Use a more secure method for generating ticket code that people cannot brute force
  const nanoid = customAlphabet('23456789ABCDEFGHJKLMNPQRSTUVWXYZ', 12);

  const prefix = randomBytes(2)
    .toString('base64')
    .replace(/[^A-Z]/g, '')
    .slice(0, 3);

  const code = nanoid();

  return `${prefix}-${code}`;
}

export function genTicketPublicId(): string {
  return uuidv4();
}
