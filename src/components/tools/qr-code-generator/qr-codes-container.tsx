import QrCodeCard from './qr-code-card';

const QRCodesContainer: React.FC = () => {
  const qrCodeSrc = `data:image/png;base64,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`;

  const mockData = [
    {
      name: 'Example 1',
      url: 'https://www.example1.com',
      qrCode: qrCodeSrc,
      logo: 'ESC Logo',
      backgroundColor: '#FFFFFF',
      editAt: new Date('2023-01-01'),
    },
    {
      name: 'Example 2',
      url: 'https://www.example2.com',
      qrCode: qrCodeSrc,
      logo: 'ESC Logo',
      backgroundColor: '#FFFFFF',
      editAt: new Date('2023-02-01'),
    },
    {
      name: 'Example 3',
      url: 'https://www.example3.com',
      qrCode: qrCodeSrc,
      logo: 'ESC Logo',
      backgroundColor: '#FFFFFF',
      editAt: new Date('2023-03-01'),
    },
    {
      name: 'Example 4',
      url: 'https://www.example4.com',
      qrCode: qrCodeSrc,
      logo: 'ESC Logo',
      backgroundColor: '#FFFFFF',
      editAt: new Date('2023-04-01'),
    },
    {
      name: 'Example 5',
      url: 'https://www.example5.com',
      qrCode: qrCodeSrc,
      logo: '',
      backgroundColor: '#FFFFFF',
      editAt: new Date('2023-05-01'),
    },
    {
      name: 'Example 6 Hahahhahahahahhahahhahaahaaha',
      url: 'https://chatgpt.com/c/673425d8-e1f8-800e-96cd-3ede7ad982a4',
      qrCode: qrCodeSrc,
      logo: '',
      backgroundColor: '#FFFFFF',
      editAt: new Date('2023-06-01'),
    },
  ];

  return mockData.map((data) => (
    <QrCodeCard
      key={data.name}
      backgroundColor={data.backgroundColor}
      date={data.editAt.toDateString()}
      logo={data.logo}
      name={data.name}
      qrCode={data.qrCode}
      url={data.url}
    />
  ));
};

export default QRCodesContainer;
