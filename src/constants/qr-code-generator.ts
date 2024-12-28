export const colorOptions = [
  '#000000', // Black
  '#1E90FF', // Dodger Blue
  '#32CD32', // Lime Green
  '#FFD700', // Gold
  '#FF4500', // Orange Red
] as string[];

const ESCLogoString = `
  <svg viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.22851 18.7875L1.21263 15.6163L7.14686 9.58478L0 0H17.9197L17.9517 4.23233L16.0648 2.27724H4.45414L10.1231 9.78728L1.22851 18.7875Z" fill="#821923" />
      <path d="M17.951 20.9994L1.24716 20.9746L1.24414 20.4842L10.9795 10.9004L12.3814 12.7413L6.48418 18.7296L15.9994 18.7432L17.951 16.8758V20.9994Z" fill="#821923" />
  </svg>
`;

export const logoOptions = [
  {
    name: 'ESC Logo',
    data: `data:image/svg+xml;base64,${btoa(ESCLogoString)}`,
  },
] as { name: string; data: string }[];
