export interface QRcode {
  id: number;
  name: string;
  url: string;
  qrCode: string;
  color: string;
  logo: string | null;
  userId: number;
  editedAt: Date;
}
