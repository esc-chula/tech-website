export const colorOptions = [
  '#000000', // Black
  '#1E90FF', // Dodger Blue
  '#32CD32', // Lime Green
  '#FFD700', // Gold
  '#FF4500', // Orange Red
] as string[]

const ESCLogoString = `
  <svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.64243 25.05L1.62119 20.8218L9.55478 12.7797L0 0H23.9573L24 5.64311L21.4773 3.03633H5.95483L13.5338 13.0497L1.64243 25.05Z" fill="#821923"/>
    <path d="M23.9999 28L1.6681 27.967L1.66406 27.3131L14.6795 14.5347L16.5537 16.9892L8.66957 24.9736L21.3906 24.9918L23.9999 22.502V28Z" fill="#821923"/>
  </svg>
`

export const logoOptions = [
  {
    name: 'ESC Logo',
    data: `data:image/svg+xml;base64,${btoa(ESCLogoString)}`,
  },
] as { name: string; data: string }[]
