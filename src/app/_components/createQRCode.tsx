'use client'
import QRCode from 'qrcode';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import QRCodePage from '../qrcode/page';
import { ESCLogo } from '../assets/logo';

export default function CreateQRCode() {
    const [linkToQR, setLinkToQR] = useState<string>('');
    const [qrCode, setQRCode] = useState('');
    const [qrCodeName, setQRCodeName] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [selectedColor, setSelectedColor] = useState<string>('');

    const colors = [
        '#000000',
        '#FF0000',
        '#00FF00',
        '#0000FF',
        '#FFFF00',
        '#FF00FF',
        '#00FFFF',
        '#FFFFFF',
    ];

    //Download as image file toFile(path, text, [options], [cb(error)])

    const generateQRCode = async () => {
        if (!linkToQR) {
            setError('Please enter a URL');
            return;
        }
        try {
            const qrCodeGen = await QRCode.toDataURL(linkToQR, {
                errorCorrectionLevel: 'Q',
                margin: 1,
                color: {
                    dark: selectedColor || "#000000",
                    light: "#ffffff", // #0000 is transparent
                }
            });
            setQRCode(qrCodeGen);
            setError('');
        } catch (error) {
            console.error(error);
            setError('Failed to generate QR code');
        }
    }

    // useEffect(async () => {
    //     generateQRCode();
    // }, [generateQRCode, selectedColor])

    return (
        <div className="max-w-[550px] mx-auto my-8 p-8 flex flex-col gap-y-10 rounded-3xl text-white" style={{ background: 'linear-gradient(146.88deg, #404040 0%, #262626 100%)' }}>
            <div className="w-full text-center text-3xl font-bold">Create New QR Code</div>

            <div className='w-full flex flex-col gap-y-2'>
                <label htmlFor="qrCodeName" className="font-bold text-lg">QR Code Name</label>
                <input
                    id="qrCodeName"
                    type="text"
                    className="border border-solid border-neutral-400 bg-white rounded-2xl py-2 px-4 text-black"
                    value={qrCodeName}
                    onChange={(e) => setQRCodeName(e.target.value)}
                    placeholder='Please fill your qr code name'
                />
            </div>

            <div className='w-full flex flex-col gap-y-2'>
                <label htmlFor="qrCodeUrl" className="font-bold text-lg">URL</label>
                <input
                    id="qrCodeUrl"
                    type="text"
                    className="border border-solid border-neutral-400 bg-white rounded-2xl py-2 px-4 text-black"
                    value={linkToQR}
                    onChange={(e) => setLinkToQR(e.target.value)}
                    placeholder='Please fill your URL'
                />
            </div>

            <div className='w-full flex flex-row justify-center items-center space-x-2'>
                
                <div className='w-1/2 flex flex-col gap-y-2 items-center'>
                    <div className="w-full font-bold text-lg text-center">Preview</div>
                    {
                        linkToQR && (
                            <div className='flex justify-center items-center'>
                                <Image alt='QR Code' src={qrCode} width={256} height={256} className="mx-auto z-10" />
                                <div className='absolute w-12 h-12 bg-white z-20 flex items-center justify-center p-3 rounded-sm'>
                                    <ESCLogo/>
                                </div>
                            </div>
                        ) || (
                            <div className='w-52 h-52 bg-white'></div>
                        )
                    }
                </div>

                <div className='w-1/2 flex flex-col gap-y-2'>
                    <div className='flex flex-col gap-y-2'>
                        <div className='text-base font-medium'>Select Colour</div>
                        <div className='flex flex-row gap-2'>
                            {
                                colors.map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => setSelectedColor(color)}
                                        className="relative flex justify-center items-center"
                                    >
                                        <div
                                            className="w-6 h-6 border-none rounded-full z-10"
                                            style={{ backgroundColor: color }}
                                        />
                                        {selectedColor === color && (
                                            <div className="z-0 w-7 h-7 ring-2 ring-blue-500 absolute rounded-full" />
                                        )}
                                    </button>
                                ))
                            }
                        </div>
                    </div>

                    <div className='w-1/2 flex flex-col gap-y-2'>
                        <div className='flex flex-col gap-y-2'>
                            <div className='text-base font-medium'>Logo</div>
                            <div className='flex flex-row gap-2'>
                                Coming Soon
                                {
                                    // colors.map((color) => (
                                    //     <button
                                    //         key={color}
                                    //         onClick={() => setSelectedColor(color)}
                                    //         className="relative flex justify-center items-center"
                                    //     >
                                    //         <div
                                    //             className="w-6 h-6 border-none rounded-full z-10"
                                    //             style={{ backgroundColor: color }}
                                    //         />
                                    //         {selectedColor === color && (
                                    //             <div className="z-0 w-7 h-7 ring-2 ring-blue-500 absolute rounded-full" />
                                    //         )}
                                    //     </button>
                                    // ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <p>{qrCode}</p> */}

            <div className='flex flex-row gap-x-8 px-4'>
                <button className='w-1/2 py-2 rounded-2xl bg-neutral-300 text-lg font-semibold text-black'>Cancel</button>
                <button className='w-1/2 py-2 rounded-2xl bg-amber-300 text-lg font-semibold text-black'
                    onClick={generateQRCode}
                >
                    Generate QR Code
                </button>
            </div>
        </div>
    );
}