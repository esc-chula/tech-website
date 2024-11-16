'use client'
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
export default function DeleteQRCode({
  name,
  onDelete,
  onCancel
}:{
  name:string;
  onDelete: () => void;
  onCancel: () => void;
}) {
  const [isDeleteError, setIsDeleteError] = useState(false);
  const [deleteTextConfirm, setDeleteTextConfirm] = useState('');

  const handleDelete = () => {
    if (deleteTextConfirm === name) {
      onDelete();
    } else {
      setIsDeleteError(true);
    }
  };

  useEffect(() => {
    setIsDeleteError(false);
  },[deleteTextConfirm])

  return (
    <div
      className="z-50 flex flex-col gap-6 md:gap-10 mx-5 p-5 rounded-3xl w-full md:w-1/2 max-w-[400px] lg:max-w-[550px]"
      style={{ background: 'linear-gradient(146.88deg, #404040 0%, #262626 100%)' }}>
      <p className="w-full font-bold text-base text-center text-white md:text-xl lg:text-2xl">Delete {name} ?</p>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between items-end">
          <div className="font-semibold text-sm text-white md:text-base lg:text-lg grow">Type {name} to confirm :</div>
          {isDeleteError && (
            <div className="w-fit text-red-500 text-xs md:text-sm">Please Try Again</div>
          )}
        </div>
        <input
          type="text"
          placeholder={`Type ${name} to confirm`}
          className={cn(
            `w-full px-3 py-2 rounded-md bg-neutral-300 text-black text-sm md:text-base outline-none border`,
            { 'border-neutral-600': !isDeleteError, 'border-red-600': isDeleteError }
          )}
          onChange={(e) => setDeleteTextConfirm(e.target.value)}
        />
      </div>
      <div className="flex flex-row gap-5">
        <button
          className="bg-neutral-300 px-3 py-2 rounded-md w-1/2 font-semibold text-black text-center text-sm md:text-base lg:text-lg"
          onClick={(e)=>{
            e.preventDefault();
            onCancel();
          }}
        >
          Cancel
        </button>
        <button
          className="bg-red-600 px-3 py-2 rounded-md w-1/2 font-semibold text-center text-sm text-white md:text-base lg:text-lg"
          onClick={(e) => {
            e.preventDefault();
            handleDelete();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}