'use client'
import React, { useState, useEffect, useMemo } from 'react';
import QRCode from 'qrcode';
import Image, { StaticImageData } from 'next/image';
import ESCLogoPath from '../../../../public/main/logo/sigma.png'
import { ESCLogo } from '@/app/assets/logo';

export function CreateQRCode({ onClick }: { onClick: () => void }) {
  const [qrCodeData, setQrCodeData] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('#000000')
  const [selectedLogo, setSelectedLogo] = useState<string | undefined>(undefined)
  const [isSelectedLogo, setIsSelectedLogo] = useState<boolean>(false)
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    image_data: ''
  });
  const [errors, setErrors] = useState({
    name: false,
    url: false,
    generation: '',
  });

  const colorOptions: string[] = [
    '#000000', // Black
    '#1E90FF', // Dodger Blue
    '#32CD32', // Lime Green
    '#FFD700', // Gold
    '#FF4500'  // Orange Red
  ];

  const logoOptions: string[] = [
    ESCLogoPath.src,
    ESCLogo.toString()
  ]

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: false }));
  };

  const handleSubmit = async () => {
    const newErrors = {
      name: !formData.name.trim(),
      url: !formData.url.trim() || !isValidUrl(formData.url),
      generation: qrCodeData,
    };
    setErrors(newErrors);
    if (!errors.name && !errors.url && errors.generation != '') {
      return
    }
    // Create form
    const data = {
      name: formData.name.trim(),
      url: formData.url.trim(),
      image_data: qrCodeData
    }
    // api for create new QrCoed

    // close the form
    onClick();
  };

  const previewContent = useMemo(() => {
    if (!qrCodeData) {
      return (
        <div className="w-full h-full flex items-center justify-center p-3">
          <p className="text-neutral-400 text-center">Enter a valid URL to generate QR code</p>
        </div>
      );
    }

    return (
      <div className='w-full aspect-square flex justify-center items-center'>
        {
          isSelectedLogo && selectedLogo != undefined ? (
            <div className='absolute inset-0 flex justify-center items-center'>
              <div className='relative bg-white w-fit aspect-square p-1'>
                <Image src={selectedLogo} alt='Logo' width={48} height={48} objectFit='contain' className='w-12' />
              </div>
            </div>
          ) : null
        }
        <Image src={qrCodeData} alt='' width={0} height={0} className='w-full h-full' />
      </div>
    );
  }, [qrCodeData, isSelectedLogo, selectedLogo]);

  useEffect(() => {
    const generated = async () => {
      if (!formData.url || isValidUrl(formData.url)) {
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
        setErrors(prev => ({ ...prev, generation: '' }));
      } catch (error) {
        console.error('QR Code generation error:', error);
      }
    };
    generated().catch((error) => {
      setErrors(prev => ({ ...prev, generation: 'Failed to generate QR code' }));
      console.error('QR Code generation error:', error);
    });
  }, [formData.url, selectedColor]);

  return (
    <div className="h-screen max-w-[550px] max-h-[750px] p-8 flex flex-col justify-between items-start rounded-3xl text-white"
      style={{ background: 'linear-gradient(146.88deg, #404040 0%, #262626 100%)' }}>
      <div className="w-full space-y-8">
        <h2 className="text-3xl font-bold text-center">Create New QR Code</h2>

        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="font-bold text-lg">QR Code Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full border bg-white rounded-2xl py-2 px-4 text-black
                ${errors.name ? "border-red-500" : "border-neutral-400"}`}
              placeholder="Enter QR code name"
            />
            {errors.name && (
              <p className="text-sm text-red-500">Please enter a name</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="url" className="font-bold text-lg">URL</label>
            <input
              id="url"
              name="url"
              type="text"
              value={formData.url}
              onChange={handleInputChange}
              className={`w-full border bg-white rounded-2xl py-2 px-4 text-black
                ${errors.url ? "border-red-500" : "border-neutral-400"}`}
              placeholder="Enter URL to generate QR code"
            />
            {errors.url && (
              <p className="text-sm text-red-500">Please enter a valid URL</p>
            )}
          </div>
        </div>

        <div className="flex flex-row justify-between items-center gap-2">
          <div className="w-64 px-2 flex flex-col justify-start items-center gap-y-4">
            <div className="font-bold text-lg text-center">Preview</div>
            <div className='w-full aspect-square bg-white'>
              {previewContent}
            </div>
          </div>

          <div className="px-2 flex flex-col gap-3">
            <div className="space-y-2">
              <h3 className="text-base font-medium">Select Color</h3>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map((color, idx) => (
                  <label key={idx} className="relative flex items-center justify-center">
                    <input
                      id={`color-${idx}`}
                      type="radio"
                      value={color}
                      checked={selectedColor === color}
                      onChange={() => setSelectedColor(color)}
                      className="hidden"
                    />
                    <label htmlFor={`color-${idx}`} className="sr-only">
                      {`Select color ${color}`}
                    </label>
                    <span
                      className={`w-6 h-6 rounded-full cursor-pointer ${selectedColor === color ? 'border-2 border-white' : ''}`}
                      style={{ backgroundColor: color }}
                    ></span>
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-medium">Logo</h3>
              <div className="flex flex-wrap gap-2">
                <label className="relative flex items-center justify-center">
                  <input
                    type="radio"
                    id='logo-none'
                    value={undefined}
                    checked={selectedLogo === undefined}
                    onChange={() => { setIsSelectedLogo(false), setSelectedLogo(undefined) }}
                    className="hidden"
                  />
                  <label htmlFor={`logo-none`} className="sr-only">
                    {`Select color none`}
                  </label>
                  <span
                    className={`w-6 h-6 rounded-full cursor-pointer ${selectedLogo === undefined ? 'border-2 border-white' : ''}`}
                  ></span>
                </label>
                {logoOptions.map((logo: string, idx) => (
                  <label key={idx} className="relative flex items-center justify-center">
                    <input
                      id={`logo-${idx}`}
                      type="radio"
                      value={logo}
                      checked={selectedLogo === logo}
                      onChange={() => { setIsSelectedLogo(true), setSelectedLogo(logo) }}
                      className="hidden"
                    />
                    <label htmlFor={`logo-${idx}`} className="sr-only">
                      {`Select color ${logo}`}
                    </label>
                    <span
                      className={`w-6 h-6 rounded-full cursor-pointer ${selectedLogo === logo ? 'border-2 border-white' : ''}`}
                    ></span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex gap-x-4 mt-6">
        <button
          onClick={onClick}
          className="w-1/2 py-2 rounded-2xl bg-neutral-300 text-lg font-semibold text-black transition hover:bg-neutral-400"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="w-1/2 py-2 rounded-2xl bg-amber-300 text-lg font-semibold text-black transition hover:bg-amber-400"
        >
          Generate QR Code
        </button>
      </div>
    </div>
  )
}
