'use client'
import { ArrowLeft, Plus, SquarePen, Trash2, History } from "lucide-react";
import Image from 'next/image';
import qrCode from '../../../public/main/qr_code_PNG6.png'
import { CreateQRCode} from "../_components/qrgen/createQRCode";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function QRCodePage() {
    const router = useRouter();
    const [showCreateQrCode, setShowCreateQrCode] = useState<boolean>(false);

    useEffect(() => {
        if(showCreateQrCode)
            document.body.style.overflow = 'hidden';
        else
            document.body.style.overflow = 'auto';
    }, [showCreateQrCode])
    
    const handleGoBack = () => {
        router.back();
    }

    return (
        <>
        {
            showCreateQrCode ? 
                <div className="absolute w-full h-full left-0 top-0 flex justify-center items-center backdrop-brightness-50">
                    <CreateQRCode onClick={() => setShowCreateQrCode(false)} />    
                </div> :
                null
        }
        <div className="min-h-screen w-full flex flex-col px-20 py-10 text-secondary gap-14">
            <div className="flex flex-col gap-3">
                <button 
                    className="pointer w-full flex flex-row items-center"
                    onClick={handleGoBack}
                    >
                    <ArrowLeft size={20} strokeWidth={3} color="white" />
                    <span className="font-semibold text-xl ml-1">Back</span>
                </button>
                <h1 className="uppercase font-bold text-6xl text-center">QR CODE GENERATOR</h1>
            </div>
            <div className="w-full flex flex-col gap-12">
                <p className="font-semibold text-4xl">Recent</p>
                <div className="flex flex-row gap-8">
                    <button 
                        className="w-80 h-96 flex justify-center items-center border-dashed border-4 border-neutral-800 rounded-3xl"
                        onClick={() => setShowCreateQrCode(true)}
                        >
                        <div className="border-dashed border-4 border-neutral-800 rounded-full p-10">
                            <Plus size={36} strokeWidth={4} color="#262626"/>
                        </div>
                    </button>
                    
                </div>
            </div>
        </div>
        </>
    );
}