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
            <div className="hidden sm:grid w-2/3 min-w-72 max-w-80 h-fit min-h-[420px] rounded-3xl p-6 bg-black sm:grid-flow-row gap-1 content-between">
                <div className="w-full flex flex-row justify-between items-start">
                    <div className="w-full flex flex-col gap-2">
                        <div className="w-full flex flex-row justify-between items-center">
                            <p className="line-clamp-1 font-semibold text-2xl">{name}</p>
                            <div className="flex flex-row items-center gap-2">
                                <button
                                    onClick={() => setShowEditQrCode(true)}
                                >
                                    <SquarePen size={24} />
                                </button>
                                <button
                                    onClick={() => setShowDeleteQrCode(true)}
                                >
                                    <Trash2 size={24} />
                                </button>
                            </div>
                        </div>
                        <p className="line-clamp-1 font-semibold text-base text-amber-300">{urlString}</p>
                    </div>
                </div>

                <div className="w-full p-4 flex flex-col justify-center gap-2 bg-black">
                    <div className="w-full flex place-self-center justify-center items-center">
                        <div className=" bg-white p-1">
                            <Image src={qrSrc} alt="qr-code" width={0} height={0} className="w-full max-w-52 aspect-square" />
                        </div>
                    </div>
                    <div className="flex flex-row justify-center items-center text-neutral-500 gap-1">
                        <History size={16} />
                        <p className="text-sm font-semibold">{date}</p>
                    </div>
                </div>

                <button className="w-full rounded-xl bg-amber-300 text-primary text-center text-base font-bold py-2">Download QR Code (.PNG)</button>
            </div>
            {/* Mobile */}
            <div className="grid grid-cols-3 gap-5 justify-center h-fit items-center sm:hidden bg-black rounded-2xl p-4">
                <div className="col-span-1">
                    <div className="w-full bg-white p-1">
                        <Image src={qrSrc} alt="qr-code" width={0} height={0} className="w-full max-w-52 aspect-square" />
                    </div>
                </div>
                <div className="h-full col-span-2 flex flex-col items-start justify-between gap-1">
                    <div className="w-full flex flex-col gap-1">
                        <div className="w-full flex flex-row justify-between items-center">
                            <div className="flex flex-row justify-center items-center text-neutral-500 gap-1">
                                <History size={10} />
                                <p className="text-[10px] font-semibold">{date}</p>
                            </div>
                            <button
                                className="relative"
                                onClick={() => setIsMenuMobileOpen(!isMenuMobileOpen)}
                            >
                                <Ellipsis size={16} />
                            </button>
                            {
                                isMenuMobileOpen && (
                                    <div className="absolute flex flex-col w-24 right-10 mt-20">
                                        <button
                                            className="rounded-t-xl bg-neutral-800 py-1 text-[10px] font-semibold text-center w-full text-white border-b-2 border-b-neutral-700"
                                            onClick={() => setShowEditQrCode(true)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="rounded-b-xl bg-neutral-800 py-1 text-[10px] font-semibold text-center w-full text-red-600"
                                            onClick={() => setShowDeleteQrCode(true)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                        <div className="w-10/12 line-clamp-1 text-base font-semibold text-white">{name}</div>
                        <div className="w-10/12 line-clamp-1 text-xs text-neutral-600">{urlString}</div>
                    </div>
                    <button className="w-fit rounded-lg bg-amber-300 text-primary text-center text-[10px] font-bold mt-2 py-1 px-4">Download QR Code (.PNG)</button>
                </div>
            </div>
            {/* Delete */}
            {
                showDeleteQrCode ?

                    <div className="fixed inset-0 flex items-center justify-center">
                        <div className="absolute w-full h-full bg-black opacity-50"></div>

                    </div> :
                    null
            }
        </>
    )
}