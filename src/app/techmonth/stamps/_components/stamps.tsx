"use client";

import React from "react";

export default function Stamps() {
  const numberOfColumns = 7;
  const numberOfRows = 100;

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
