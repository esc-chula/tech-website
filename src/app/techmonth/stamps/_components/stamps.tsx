"use client";

import { useWindowSize } from "@/hooks/useWindowSize";
import React, { useEffect, useState } from "react";

export default function Stamps() {
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

  const numberOfRows = 20;

  if (numberOfColumns === 0) return null;

  return (
    <div
      className={`grid`}
      style={{
        gridTemplateColumns: `repeat(${numberOfColumns}, minmax(0, 1fr))`,
      }}
    >
      {Array.from({ length: numberOfRows }).map((_, rowIndex) => {
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

            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={`stamp-${rowIndex}-${index}`}
                className="aspect-square w-full border-8 border-techmonth-white bg-techmonth-white/5"
              />
            ))}

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