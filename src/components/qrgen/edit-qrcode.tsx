'use client';
import { X } from 'lucide-react';
import Image from 'next/image';
import { default as QRCode } from 'qrcode';
import React, { useEffect, useMemo, useState } from 'react';

import { base64ESCLogo } from '~/app/assets/esc-logo';
import { cn, isURL } from '~/lib/utils';

interface QrCode {
  name: string;
  url: string;
  image_data: string;
}

const EditQRCode: React.FC<{
  onCreate: (data: QrCode) => void;
  onCancel: () => void;
}> = ({ onCreate, onCancel }) => {
  const [qrCodeData, setQrCodeData] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('#000000');
  const [selectedLogo, setSelectedLogo] = useState<string | undefined>(
    undefined,
  );
  const [isSelectedLogo, setIsSelectedLogo] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    image_data: '',
  });
  const [errorName, setErrorName] = useState<boolean>(false);
  const [errorURL, setErrorURL] = useState<boolean>(false);

  const colorOptions: string[] = [
    '#000000', // Black
    '#1E90FF', // Dodger Blue
    '#32CD32', // Lime Green
    '#FFD700', // Gold
    '#FF4500', // Orange Red
  ];

  const logoOptions: string[] = [base64ESCLogo];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (): void => {
    if (formData.name === '') {
      setErrorName(true);
      return;
    }
    if (formData.url === '' || !isURL(formData.url)) {
      setErrorURL(true);
      return;
    }
    // Create form
    const data: QrCode = {
      name: formData.name.trim(),
      url: formData.url.trim(),
      image_data: qrCodeData,
    };
    // api for create new QrCoed
    onCreate(data);
  };

  const previewContent = useMemo(() => {
    if (!qrCodeData) {
      return (
        <div className="flex justify-center items-center p-3 w-full h-full">
          <p className="text-center text-neutral-400">
            Enter a valid URL to generate QR code
          </p>
        </div>
      );
    }

    return (
      <div className="relative flex justify-center items-center w-full aspect-square">
        <Image
          alt="QR Code"
          className="w-full h-full"
          height={0}
          src={qrCodeData}
          width={0}
        />
        {isSelectedLogo && selectedLogo !== undefined ? (
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="relative flex justify-center items-center p-1 w-full aspect-square">
              <Image
                alt="Logo"
                className="bg-white p-1 w-1/5 aspect-square object-contain"
                height={30}
                objectFit="contain"
                src={selectedLogo}
                width={30}
              />
            </div>
          </div>
        ) : null}
      </div>
    );
  }, [qrCodeData, isSelectedLogo, selectedLogo]);

  useEffect(() => {
    const generated = async (): Promise<void> => {
      if (!formData.url || !isURL(formData.url)) {
        setQrCodeData('');
        return;
      }

      try {
        const qrCodeGen = await QRCode.toDataURL(formData.url, {
          errorCorrectionLevel: 'Q',
          margin: 1,
          color: {
            dark: selectedColor,
            light: '#ffffff',
          },
          width: 256,
        });
        setQrCodeData(qrCodeGen);
      } catch (error) {
        console.error('QR Code generation error:', error);
      }
    };

    generated().catch((error: unknown) => {
      console.error('QR Code generation error:', error);
    });
  }, [formData.url, selectedColor]);

  useEffect(() => {
    if (formData.name !== '') {
      setErrorName(false);
    }
    if (formData.url !== '' && isURL(formData.url)) {
      setErrorURL(false);
    }
  }, [formData.name, formData.url]);

  return (
    <div
      className="flex flex-col justify-between items-start p-8 rounded-3xl w-full max-w-[550px] h-fit max-h-[750px] text-white"
      style={{
        background: 'linear-gradient(146.88deg, #404040 0%, #262626 100%)',
      }}
    >
      <div className="space-y-8 w-full">
        <h2 className="font-bold text-center text-xl md:text-2xl lg:text-3xl">
          Create New QR Code
        </h2>
        <div className="space-y-6">
          <div className="space-y-2">
            <label
              className="font-bold text-sm sm:text-base md:text-lg"
              htmlFor="name"
            >
              QR Code Name
            </label>
            <input
              id="name"
              name="name"
              placeholder="Enter QR code name"
              type="text"
              value={formData.name}
              className={cn(
                `w-full border bg-white text-sm sm:text-base rounded-2xl py-2 px-4 text-black`,
                errorName ? 'border-red-500' : 'border-neutral-400',
              )}
              onChange={handleInputChange}
            />
            {errorName ? (
              <p className="text-red-500 text-sm">Please enter a name</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label
              className="font-bold text-sm sm:text-base md:text-lg"
              htmlFor="url"
            >
              URL
            </label>
            <input
              id="url"
              name="url"
              placeholder="Enter URL to generate QR code"
              type="text"
              value={formData.url}
              className={cn(
                `w-full border bg-white text-sm sm:text-base rounded-2xl py-2 px-4 text-black`,
                errorName ? 'border-red-500' : 'border-neutral-400',
              )}
              onChange={handleInputChange}
            />
            {errorURL ? (
              <p className="text-red-500 text-sm">
                Please enter a valid URL. Include http:// or https://
              </p>
            ) : null}
          </div>
        </div>

        <div className="flex flex-row justify-between items-start gap-2">
          <div className="flex flex-col justify-start items-center gap-y-4 px-2 w-64">
            <div className="font-bold text-center text-lg">Preview</div>
            <div className="bg-white w-full aspect-square">
              {previewContent}
            </div>
          </div>

          <div className="flex flex-col gap-3 px-2">
            <div className="space-y-2">
              <h3 className="font-medium text-base">Select Color</h3>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map((color, idx) => (
                  <label
                    key={color}
                    className="relative flex justify-center items-center"
                  >
                    <input
                      checked={selectedColor === color}
                      className="hidden"
                      id={`color-${idx}`}
                      type="radio"
                      value={color}
                      onChange={() => setSelectedColor(color)}
                    />
                    <label className="sr-only" htmlFor={`color-${idx}`}>
                      {`Select color ${color}`}
                    </label>
                    <span
                      className={`w-6 h-6 rounded-full cursor-pointer ${selectedColor === color ? 'border-2 border-black' : ''}`}
                      style={{ backgroundColor: color }}
                    />
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-base">Logo</h3>
              <div className="flex flex-wrap gap-2">
                <label className="relative flex justify-center items-center">
                  <input
                    checked={selectedLogo === undefined}
                    className="hidden"
                    id="logo-none"
                    type="radio"
                    value={undefined}
                    onChange={() => {
                      setIsSelectedLogo(false);
                      setSelectedLogo(undefined);
                    }}
                  />
                  <label className="sr-only" htmlFor="logo-none">
                    Select color none
                  </label>
                  <div className="flex w-10 lg:w-12 aspect-square">
                    <div className="flex justify-center items-center bg-white p-3 rounded-full w-full aspect-square">
                      <X color="black" />
                    </div>
                    <span
                      className={`absolute  w-10 lg:w-12 aspect-square rounded-full cursor-pointer ${selectedLogo === undefined ? 'border-2 border-black' : ''}`}
                    />
                  </div>
                </label>
                {logoOptions.map((logo: string, idx) => (
                  <label
                    key={logo}
                    className="relative flex justify-center items-center"
                  >
                    <input
                      checked={selectedLogo === logo}
                      className="hidden"
                      id={`logo-${idx}`}
                      type="radio"
                      value={logo}
                      onChange={() => {
                        setIsSelectedLogo(true);
                        setSelectedLogo(logo);
                      }}
                    />
                    <label className="sr-only" htmlFor={`logo-${idx}`}>
                      {`Select color ${logo}`}
                    </label>
                    <div className="flex w-10 lg:w-12 aspect-square">
                      <div className="flex justify-center items-center bg-white p-3 rounded-full w-full aspect-square">
                        <Image
                          alt=""
                          className="w-full"
                          height={0}
                          src={logo}
                          width={0}
                        />
                      </div>
                      <span
                        className={`absolute w-10 lg:w-12 aspect-square rounded-full cursor-pointer ${selectedLogo === logo ? 'border-2 border-black' : ''}`}
                      />
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-x-4 mt-6 w-full">
        <button
          className="bg-neutral-300 hover:bg-neutral-400 py-2 rounded-2xl w-1/2 font-semibold text-black text-sm md:text-base lg:text-lg transition"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onCancel();
          }}
        >
          Cancel
        </button>
        <button
          className="bg-amber-300 hover:bg-amber-400 py-2 rounded-2xl w-1/2 font-semibold text-black text-sm md:text-base lg:text-lg transition"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit;
          }}
        >
          Generate QR Code
        </button>
      </div>
    </div>
  );
};

export default EditQRCode;
