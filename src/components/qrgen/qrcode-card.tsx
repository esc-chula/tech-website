'use client'
import { useEffect, useState } from "react";
import { SquarePen, Trash2, History, Ellipsis } from "lucide-react";
import Image from 'next/image';

import { cn } from "@/lib/utils";

export function QRCodeItem({
    name,
    urlString,
    qrSrc,
    editAt,
}: {
    name: string,
    urlString: string,
    qrSrc: string,
    editAt: Date,
}) {
    const [showEditQrCode, setShowEditQrCode] = useState<boolean>(false);
    const [showDeleteQrCode, setShowDeleteQrCode] = useState<boolean>(false);
    const [deleteConfirm, setDeleteConfirm] = useState<string>('');
    const [isDeleteError, setIsDeleteError] = useState<boolean>(false);

    const date = editAt.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

    // Mobile variables
    const [isMenuMobileOpen, setIsMenuMobileOpen] = useState<boolean>(false);
    const resetState = () => {
        setShowEditQrCode(false);
        setShowDeleteQrCode(false);
        setDeleteConfirm('');
        setIsDeleteError(false);
    }

    const deleteQrCode = () => {
        if (deleteConfirm === name) {
            //api
            console.log('delete successfully')
        }
        else {
            setIsDeleteError(true)
            return
        }
        resetState()
        return
    }

    const handleDownloadQrCode = () => {
        const link = document.createElement('a');
        link.href = qrSrc;
        link.download = `${name}.png`;
        link.click();
    }

    useEffect(() => {
        setIsDeleteError(false);
    }, [deleteConfirm])

    useEffect(() => {
        if (showDeleteQrCode || showEditQrCode)
            document.body.style.overflow = 'hidden';
        else
            document.body.style.overflow = 'auto';
    }, [showDeleteQrCode, showEditQrCode])

    return (
        <>
            {/* Desktop and Ipad */}
            <div className="sm:flex sm:flex-col justify-between content-between hidden bg-black p-6 rounded-3xl w-96 h-[450px] overflow-hidden">
                {/* Header Qr-Code */}
                <div className="flex flex-col justify-start items-start gap-2 w-full">
                    <div className="flex flex-row justify-between items-start w-full">
                        <div className="line-clamp-1 w-1/2 font-semibold text-2xl">{name}</div>
                        {/* Edit and Delete */}
                        <div className="flex flex-row justify-end items-center gap-2 w-1/2">
                            <button onClick={() => setShowEditQrCode(true)}>
                                <SquarePen size={24} />
                            </button>
                            <button onClick={() => setShowDeleteQrCode(true)}>
                                <Trash2 size={24} />
                            </button>
                        </div>
                    </div>
                    <div className="line-clamp-1 w-full font-semibold text-amber-300 text-base">{urlString}</div>
                </div>

                <div className="flex flex-col justify-center gap-2 bg-black p-4 w-full">
                    <div className="flex justify-center items-center w-full place-self-center">
                        <div className="bg-white p-1">
                            <Image
                                src={qrSrc}
                                alt="qr-code"
                                width={200}
                                height={200}
                                className="aspect-square"
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
                    onClick={handleDownloadQrCode}>
                    Download QR Code (.PNG)
                </button>
            </div>
            {/* Mobile */}
            <div className="flex flex-row justify-start items-center gap-4 sm:hidden bg-black p-4 rounded-xl w-full h-32 overflow-hidden">
                <div className="bg-white p-1 h-full aspect-square">
                    <Image src={qrSrc} alt="qr-code" width={10} height={10} className="w-auto h-full aspect-square" />
                </div>
                <div className="flex flex-col justify-between items-start h-full grow">
                    <div className="flex flex-col w-full">
                        <div className="flex flex-row justify-between items-center w-full">
                            <div className="flex flex-row justify-center items-center gap-1 text-neutral-500">
                                <History size={10} />
                                <p className="font-semibold text-[10px]">{date}</p>
                            </div>
                            <button
                                className="relative"
                                onClick={() => setIsMenuMobileOpen(!isMenuMobileOpen)}
                            >
                                <Ellipsis size={16} />
                            </button>
                            {
                                isMenuMobileOpen && (
                                    <div className="right-10 absolute flex flex-col mt-20 w-24">
                                        <button
                                            className="bg-neutral-800 py-1 border-b-2 border-b-neutral-700 rounded-t-xl w-full font-semibold text-[10px] text-center text-white"
                                            onClick={() => setShowEditQrCode(true)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-neutral-800 py-1 rounded-b-xl w-full font-semibold text-[10px] text-center text-red-600"
                                            onClick={() => setShowDeleteQrCode(true)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                        <div className="line-clamp-1 w-10/12 font-semibold text-base text-white">{name}</div>
                        <div className="line-clamp-1 w-10/12 text-neutral-600 text-xs">{urlString}</div>
                    </div>
                    <button
                        className="bg-amber-300 mt-2 px-4 py-1 line-clamp-1 rounded-lg w-fit font-bold text-[10px] text-center text-primary"
                        onClick={handleDownloadQrCode}
                    >
                        Download QR Code (.PNG)
                    </button>
                </div>
            </div>
            {/* Delete */}
            {
                showDeleteQrCode ?

                    <div className="fixed inset-0 flex justify-center items-center">
                        <div className="absolute bg-black opacity-50 w-full h-full"></div>

                    </div> :
                    null
            }
        </>
    )
}