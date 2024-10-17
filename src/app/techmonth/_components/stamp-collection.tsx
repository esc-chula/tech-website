"use client";

import Image from "next/image";

export const StampCollection = (): JSX.Element => {
  return (
    <div className="grid size-max grid-cols-4 grid-rows-3 [&>div]:size-16 [&>div]:border-4 [&>div]:border-techmonth-white [&>div]:p-2 md:[&>div]:size-32 md:[&>div]:border-8 md:[&>div]:p-2 lg:[&>div]:size-36">
      <div className="col-start-1 row-start-1">
        <Image
          src="/techmonth/stamp_mock.svg"
          alt=""
          width={120}
          height={120}
        />
      </div>
      <div className="col-start-2 row-start-1 -translate-x-1 md:-translate-x-2"></div>
      <div className="col-start-2 row-start-2 -translate-x-1 -translate-y-1 md:-translate-x-2 md:-translate-y-2"></div>
      <div className="col-start-3 row-start-2 -translate-x-2 -translate-y-1 md:-translate-x-4 md:-translate-y-2"></div>
      <div className="col-start-3 row-start-3 -translate-x-2 -translate-y-2 md:-translate-x-4 md:-translate-y-4"></div>
      <div className="col-start-4 row-start-3 -translate-x-3 -translate-y-2 md:-translate-x-6 md:-translate-y-4"></div>
    </div>
  );
};
