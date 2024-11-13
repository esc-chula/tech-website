'use client'
import { ArrowLeft, Plus, SquarePen, Trash2, History } from "lucide-react";
import Image from 'next/image';
// import qrCode from '../../../public/main/qr_code_PNG6.png'
// import { CreateQRCode } from "../_components/qrgen/createAndEditQRCode";
import { QRCodeItem } from "@/components/qrgen/qrcode-card";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const qrCode = 'data:image/png;base64,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';

const mockData = [
    {
        name: "Example 1",
        urlString: "https://www.example1.com",
        qrSrc: qrCode,
        editAt: new Date("2023-01-01"),
    },
    {
        name: "Example 2",
        urlString: "https://www.example2.com",
        qrSrc: qrCode,
        editAt: new Date("2023-02-01"),
    },
    {
        name: "Example 3",
        urlString: "https://www.example3.com",
        qrSrc: qrCode,
        editAt: new Date("2023-03-01"),
    },
    {
        name: "Example 4",
        urlString: "https://www.example4.com",
        qrSrc: qrCode,
        editAt: new Date("2023-04-01"),
    },
    {
        name: "Example 5",
        urlString: "https://www.example5.com",
        qrSrc: qrCode,
        editAt: new Date("2023-05-01"),
    },
    {
        name: "Example 6 Hahahhahahahahhahahhahaahaaha",
        urlString: "https://chatgpt.com/c/673425d8-e1f8-800e-96cd-3ede7ad982a4",
        qrSrc: qrCode,
        editAt: new Date("2023-06-01"),
    },
];

export default function QRCodePage() {
    const router = useRouter();
    const [showCreateQrCode, setShowCreateQrCode] = useState<boolean>(false);

    useEffect(() => {
        if (showCreateQrCode)
            document.body.style.overflow = 'hidden';
        else
            document.body.style.overflow = 'auto';
    }, [showCreateQrCode])

    const handleGoBack = () => {
        router.back();
    }

    return (
        <>
            {/* Create */}
            {
                showCreateQrCode ?
                    <div className="top-0 left-0 absolute flex justify-center items-center backdrop-brightness-50 w-full h-full">
                        {/* <CreateQRCode onClick={() => setShowCreateQrCode(false)} /> */}
                    </div> :
                    null
            }
            <div className="flex flex-col justify-start gap-20 w-full h-full text-secondary">
                {/* Header */}
                <div className="flex flex-col gap-8">
                    <button
                        className="flex flex-row justify-start items-center w-full pointer"
                        onClick={handleGoBack}
                    >
                        <ArrowLeft size={20} strokeWidth={3} color="white" />
                        <div className="ml-1 font-semibold text-lg md:text-xl xl:text-2xl">Back</div>
                    </button>
                    <h1 className="font-bold text-4xl text-center md:text-5xl uppercase leading-normal">QR CODE GENERATOR</h1>
                </div>
                {/* Qr-Code */}
                <div className="flex flex-col justify-start items-center gap-16 w-full">
                    <div className="flex flex-row justify-between items-end w-full">
                        <p className="w-full font-semibold text-3xl text-left">Recent</p>
                        <button 
                            className="flex flex-row justify-center items-center gap-1 sm:hidden bg-neutral-800 px-4 py-1 rounded-lg"
                            >
                            <Plus size={16} strokeWidth={3} color="white" />
                            <p className="ml-1 font-semibold text-base">New</p>
                        </button>
                    </div>
                    <div className="gap-6 sm:gap-14 grid grid-cols-[repeat(auto-fit,_minmax(320px,1fr))] sm:grid-cols-[repeat(auto-fit,_minmax(400px,1fr))] auto-rows-[minmax(120px,_auto)] w-full">
                        <div className="justify-items-center hidden sm:grid sm:col-span-1 w-full">
                            <button
                                className="flex justify-center items-center border-4 border-neutral-800 border-dashed rounded-3xl w-96 h-[450px]"
                                onClick={() => setShowCreateQrCode(true)}
                            >
                                <div className="flex justify-center items-center border-4 border-neutral-800 border-dashed rounded-full w-44 aspect-square">
                                    <Plus size={60} strokeWidth={4} color="#262626" />
                                </div>
                            </button>
                        </div>
                        {
                            mockData.map((data, idx) => (
                                <div key={idx} className="justify-items-center grid col-span-1 w-full h-full">
                                    <QRCodeItem
                                        name={data.name}
                                        urlString={data.urlString}
                                        qrSrc={data.qrSrc}
                                        editAt={data.editAt}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    );
}