"use client";

import { useWindowSize } from "@/hooks/use-window-size";
import { type Event } from "@/types/techmonth";
import React, { useEffect, useState } from "react";
import Stamp from "./stamp";

export default function StampsLadder({
  numberOfRows,
  stampsWithEvent,
}: {
  numberOfRows: number;
  stampsWithEvent: {
    event: Event | undefined;
    id: number;
    studentId: string;
    eventId: string;
  }[];
}) {
  const { width: windowWidth } = useWindowSize();
  const [numberOfColumns, setNumberOfColumns] = useState(0);

  useEffect(() => {
    if (windowWidth < 768) {
      setNumberOfColumns(3);
    } else if (windowWidth < 1024) {
      setNumberOfColumns(5);
    } else if (windowWidth < 1280) {
      setNumberOfColumns(6);
    } else {
      setNumberOfColumns(7);
    }
  }, [windowWidth, numberOfColumns]);

  if (numberOfColumns === 0) return null;

  return (
    <div
      className={`grid`}
      style={{
        gridTemplateColumns: `repeat(${numberOfColumns}, minmax(0, 1fr))`,
      }}
    >
      {Array.from({ length: numberOfRows / 2 + 2 }).map((_, rowIndex) => {
        const stamps = [
          stampsWithEvent[rowIndex * 2],
          stampsWithEvent[rowIndex * 2 + 1],
        ];

        return (
          <React.Fragment key={rowIndex}>
            {Array.from({ length: 1 }).map((_, index) => {
              const isInverse =
                rowIndex % ((numberOfColumns - 2) * 2) >= numberOfColumns - 2;

              const startColumns = isInverse
                ? numberOfColumns - 2 - (rowIndex % (numberOfColumns - 2))
                : rowIndex % (numberOfColumns - 2);

              if (startColumns === 0) return null;

              return (
                <div
                  key={`empty-start-${startColumns}-${index}`}
                  style={{
                    gridColumn: `span ${startColumns} / span ${startColumns}`,
                  }}
                />
              );
            })}

            {stamps.map((stamp, index) => {
              return (
                <div
                  key={`stamp-${rowIndex}-${index}`}
                  className="aspect-square w-full select-none border-4 border-techmonth-white bg-techmonth-white/5 p-2 lg:border-8"
                >
                  {stamp ? <Stamp stamp={stamp} /> : null}
                </div>
              );
            })}

            {Array.from({ length: 1 }).map((_, index) => {
              const isInverse =
                rowIndex % ((numberOfColumns - 2) * 2) >= numberOfColumns - 2;

              const endColumns = isInverse
                ? rowIndex % (numberOfColumns - 2)
                : numberOfColumns - 2 - (rowIndex % (numberOfColumns - 2));

              if (endColumns === 0) return null;

              return (
                <div
                  key={`empty-end-${endColumns}-${index}`}
                  style={{
                    gridColumn: `span ${endColumns} / span ${endColumns}`,
                  }}
                />
              );
            })}
          </React.Fragment>
        );
      })}
    </div>
  );
}
