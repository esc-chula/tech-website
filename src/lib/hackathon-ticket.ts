import { v4 as uuidv4 } from 'uuid';

export function genTicketPublicId(): string {
  return uuidv4();
}
