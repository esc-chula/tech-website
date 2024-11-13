'use client'
export default function DeleteQRCode() {
  return (
    <div
      className="max-w-[550px] w-full md:w-1/2 flex flex-col mx-5 p-5 gap-10 rounded-3xl z-50"
      style={{ background: 'linear-gradient(146.88deg, #404040 0%, #262626 100%)' }}>
      <p className="text-2xl font-bold text-white">Delete {name} ?</p>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between items-end">
          <p className="font-semibold text-white text-lg">Type {name} to confirm :</p>
          {
            isDeleteError &&
            (
              <p className="text-red-500 italic">Please enter a valid URL. Include http:// or https://</p>
            )
          }

        </div>
        <input
          type="text"
          placeholder={`Type ${name} to confirm`}
          className={cn(`w-full px-3 py-2 rounded-md bg-neutral-300 text-black text-md outline-none border`, { 'border-neutral-600': !isDeleteError, 'border-red-600': isDeleteError })}
          onChange={(e) => setDeleteConfirm(e.target.value)}
        />
      </div>
      <div className="flex flex-row gap-5">
        <button
          className="w-1/2 px-3 py-1 text-center rounded-md text-black font-semibold text-lg bg-neutral-300"
          onClick={resetState}
        >
          Cancel
        </button>
        <button
          className="w-1/2 px-3 py-1 text-center rounded-md text-white font-semibold text-lg bg-red-600"
          onClick={deleteQrCode}
        >
          Delete
        </button>
      </div>
    </div>
  );
}