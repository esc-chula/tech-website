import { SquarePen, Trash2, History } from "lucide-react";
import Image from 'next/image';

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
    const date = editAt.toLocaleDateString('en-US', {day:'numeric' , month: 'short', year: 'numeric'});
    return (
        <div className="w-full lg:w-96 rounded-3xl p-7 bg-black grid grid-flow-row content-between">
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

            <div className="w-full p-2 flex flex-col justify-center gap-4">
                <div className="w-full flex place-self-center justify-center items-center">
                    <div className=" bg-white p-1">
                        <Image src={qrSrc} alt="qr-code" width={0} height={0} className="w-full max-w-64 aspect-square" />
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