'use client';

import { Ellipsis, History, SquarePen, Trash2 } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import DeleteQRCode from './delete-qrcode';

const QRCodeItem: React.FC<{
  name: string;
  urlString: string;
  qrSrc: string;
  editAt: Date;
}> = ({ name, urlString, qrSrc, editAt }) => {
  const [showEditQrCode, setShowEditQrCode] = useState<boolean>(false);
  const [showDeleteQrCode, setShowDeleteQrCode] = useState<boolean>(false);

  const date = editAt.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  // Mobile variables
  const [isMenuMobileOpen, setIsMenuMobileOpen] = useState<boolean>(false);

  const handleDownloadQrCode = (): void => {
    const link = document.createElement('a');
    link.href = qrSrc;
    link.download = `${name}.png`;
    link.click();
  };

  //   const handleEditQrCode = (): void => {
  //     //api
  //     setShowEditQrCode(false);
  //   };

  const handleDeleteQrCode = (): void => {
    //api
    setShowDeleteQrCode(false);
  };

  useEffect(() => {
    if (showDeleteQrCode || showEditQrCode) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showDeleteQrCode, showEditQrCode]);

  return (
    <>
      {/* Desktop and Ipad */}
      <div className="sm:flex sm:flex-col justify-between content-between hidden bg-black p-6 rounded-3xl w-96 h-[450px] overflow-hidden">
        {/* Header Qr-Code */}
        <div className="flex flex-col justify-start items-start gap-2 w-full">
          <div className="flex flex-row justify-between items-start w-full">
            <div className="line-clamp-1 w-1/2 font-semibold text-2xl">
              {name}
            </div>
            {/* Edit and Delete */}
            <div className="flex flex-row justify-end items-center gap-2 w-1/2">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setShowEditQrCode(true);
                }}
              >
                <SquarePen size={24} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setShowDeleteQrCode(true);
                }}
              >
                <Trash2 size={24} />
              </button>
            </div>
          </div>
          <div className="line-clamp-1 w-full font-semibold text-amber-300 text-base">
            {urlString}
          </div>
        </div>

        <div className="flex flex-col justify-center gap-2 bg-black p-4 w-full">
          <div className="flex justify-center items-center w-full place-self-center">
            <div className="bg-white p-1">
              <Image
                alt="qr-code"
                className="aspect-square"
                height={200}
                src={qrSrc}
                width={200}
              />
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-1 text-neutral-500">
            <History size={16} />
            <p className="font-semibold text-sm">{date}</p>
          </div>
        </div>

        <button
          className="bg-amber-300 py-2 rounded-xl w-full font-bold text-base text-center text-primary"
          type="button"
          onClick={handleDownloadQrCode}
        >
          Download QR Code (.PNG)
        </button>
      </div>
      {/* Mobile */}
      <div className="flex flex-row justify-start items-center gap-4 sm:hidden bg-black p-4 rounded-xl w-full h-32 overflow-hidden">
        <div className="flex-none bg-white p-1 h-full aspect-square">
          <Image
            alt="qr-code"
            className="w-auto h-full aspect-square"
            height={10}
            src={qrSrc}
            width={10}
          />
        </div>
        <div className="flex flex-col flex-auto justify-between items-start h-full grow">
          <div className="flex flex-col w-full">
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row justify-center items-center gap-1 text-neutral-500">
                <History size={10} />
                <p className="font-semibold text-[10px]">{date}</p>
              </div>
              <button
                className="relative"
                type="button"
                onClick={() => setIsMenuMobileOpen(!isMenuMobileOpen)}
              >
                <Ellipsis size={16} />
              </button>
              {isMenuMobileOpen ? (
                <div className="right-10 z-50 absolute flex flex-col bg-neutral-800 mt-20 rounded-xl w-24">
                  <button
                    className="py-1 border-b-2 border-b-neutral-700 rounded-t-xl w-full font-semibold text-[10px] text-center text-white"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMenuMobileOpen(false);
                      setShowEditQrCode(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="py-1 rounded-b-xl w-full font-semibold text-[10px] text-center text-red-600"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMenuMobileOpen(false);
                      setShowDeleteQrCode(true);
                    }}
                  >
                    Delete
                  </button>
                </div>
              ) : null}
            </div>
            <p className="w-10/12 max-w-60 font-semibold text-base text-ellipsis text-white truncate overflow-hidden">
              {name}
            </p>
            <p className="w-10/12 max-w-60 text-ellipsis text-neutral-600 text-xs truncate overflow-hidden">
              {urlString}
            </p>
          </div>
          <button
            className="bg-amber-300 mt-2 px-4 py-1 line-clamp-1 rounded-lg w-fit font-bold text-[10px] text-center text-primary"
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleDownloadQrCode();
            }}
          >
            Download QR Code (.PNG)
          </button>
        </div>
      </div>
      {/* Delete */}
      {showDeleteQrCode ? (
        <div className="fixed inset-0 flex justify-center items-center w-screen h-screen">
          <div className="absolute bg-black opacity-50 backdrop-blur-sm w-full h-full" />
          <DeleteQRCode
            name={name}
            onCancel={() => setShowDeleteQrCode(false)}
            onDelete={() => handleDeleteQrCode()}
          />
        </div>
      ) : null}
    </>
  );
};

export default QRCodeItem;
