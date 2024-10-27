import { SquarePen, Trash2, History } from "lucide-react";
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import qrCode from '../../../public/main/qr_code_PNG6.png'

export function QRCodeItem({
    name,
    urlString,
    qrSrc,
    date,
}: {
    name: string,
    urlString: string,
    qrSrc?: StaticImageData,
    date: string,
}) {
    if (qrSrc === undefined)
        qrSrc = qrCode
    return (
        <div className="w-80 h-96 rounded-3xl p-7 bg-black grid grid-flow-row content-between">
            <div className="w-full flex flex-row justify-between items-start">
                <div className="flex flex-col gap-1">
                    <p className="font-semibold text-xl">{name}</p>
                    <p className="font-semibold text-sm text-amber-300">{urlString}</p>
                </div>
                <div className="flex flex-row gap-2">
                    <button>
                        <SquarePen size={24} />
                    </button>
                    <button>
                        <Trash2 size={24} />
                    </button>
                </div>
            </div>

            <div className="w-full p-4 flex flex-col justify-center gap-4">
                <div className="w-2/3 flex place-self-center">
                    <div className="bg-white p-2">
                        <Image src={qrSrc} alt="qr-code" width={0} height={0} className="aspect-square" />
                    </div>
                </div>
                <div className="flex flex-row justify-center text-neutral-500 gap-1">
                    <History size={16} />
                    <p className="text-xs font-semibold">{date}</p>
                </div>
            </div>

            <button className="w-full rounded-xl bg-amber-300 text-primary text-center text-sm font-semibold py-1">Download QR Code (.PNG)</button>
        </div>
    )
}