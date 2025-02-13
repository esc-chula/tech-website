/* eslint-disable react/no-array-index-key -- Index key is required for this component */
'use client';

import React, { useState } from 'react';

import { cn } from '~/lib/utils';

interface HackathonTitleHoverProps {
  className?: string;
  dotSize?: number;
  colorMap?: Record<string, { text: string; color: string }>;
  lines?: string[];
}

interface DotPosition {
  line: number;
  row: number;
  col: number;
}

const ASCII_MAP: Record<string, string> = {
  A: `
  O   
 O O  
O   O 
O   O 
OOOOO 
O   O 
O   O `,
  C: `
 OOO  
O   O 
O     
O     
O     
O   O 
 OOO  `,
  H: `
 O   O 
 O   O 
 O   O 
 OOOOO 
 O   O 
 O   O 
 O   O `,
  I: `
OOO 
 O  
 O  
 O  
 O  
 O  
OOO `,
  K: `
O   O 
O  O  
O O   
OO    
O O   
O  O  
O   O `,
  N: `
O   O 
O   O 
OO  O 
O O O 
O  OO 
O   O 
O   O `,
  O: `
 OOO  
O   O 
O   O 
O   O 
O   O 
O   O 
 OOO  `,
  T: `
OOOOO
  O  
  O  
  O  
  O  
  O  
  O  `,
};

const HackathonTitleHover: React.FC<HackathonTitleHoverProps> = ({
  className = '',
  dotSize = 8,
  colorMap = {
    HACKATHON: { text: 'O', color: 'bg-red-500 hover:bg-red-600' },
  },
  lines = ['HACKATHON'],
}) => {
  const [hoveredDot, setHoveredDot] = useState<DotPosition | null>(null);

  const createTextMatrix = (
    text: string,
  ): {
    char: string;
    originalChar: string;
  }[][] => {
    const matrix: { char: string; originalChar: string }[][] = Array(7)
      .fill(0)
      .map(() => []);

    for (const char of text.toUpperCase()) {
      const charPattern = ASCII_MAP[char] ?? ASCII_MAP[' '];

      if (!charPattern) continue;

      const charLines = charPattern
        .split('\n')
        .filter((line) => line.length > 0);

      charLines.forEach((line, rowIndex) => {
        line.split('').forEach((c) => {
          matrix[rowIndex]?.push({ char: c, originalChar: char });
        });
      });
    }

    return matrix;
  };

  const getCharacterColor = (
    lineText: string,
    dotChar: string,
    originalChar: string,
  ): string => {
    if (dotChar !== 'O') return 'transparent';

    for (const [text, config] of Object.entries(colorMap)) {
      if (lineText === text && originalChar === config.text) {
        return config.color;
      }
    }
    return 'bg-white';
  };

  const calculateDistance = (pos1: DotPosition, pos2: DotPosition): number => {
    if (pos1.line !== pos2.line) return Infinity;

    return Math.sqrt(
      Math.pow(pos1.row - pos2.row, 2) + Math.pow(pos1.col - pos2.col, 2),
    );
  };

  const getPeerEffect = (
    lineIndex: number,
    rowIndex: number,
    colIndex: number,
    dotChar: string,
  ): string => {
    if (dotChar !== 'O') return '';

    if (hoveredDot) {
      const distance = calculateDistance(
        { line: lineIndex, row: rowIndex, col: colIndex },
        { line: hoveredDot.line, row: hoveredDot.row, col: hoveredDot.col },
      );

      if (distance <= 4) {
        return 'bg-hackathon-primary';
      }
    }
    return '';
  };

  return (
    <div className={cn('flex flex-col items-center', className)}>
      {lines.map((line, lineIndex) => {
        return (
          <div
            key={lineIndex}
            style={{
              marginBottom: `${dotSize * 2}px`,
            }}
          >
            {createTextMatrix(line).map((row, rowIndex) => (
              <div key={`${lineIndex}-${rowIndex}`} className="flex">
                {row.map((dot, colIndex) => (
                  <div
                    key={`${lineIndex}-${rowIndex}-${colIndex}`}
                    className="relative"
                    style={{
                      width: `${dotSize}px`,
                      height: `${dotSize}px`,
                    }}
                  >
                    {/* Actual visible dot */}
                    <div
                      className={cn(
                        '',
                        dot.char === 'O' && [
                          'rounded-full transition-color duration-50',
                          getCharacterColor(line, dot.char, dot.originalChar),
                          getPeerEffect(
                            lineIndex,
                            rowIndex,
                            colIndex,
                            dot.char,
                          ),
                        ],
                      )}
                      style={{
                        width: `${dotSize}px`,
                        height: `${dotSize}px`,
                        transitionDelay: hoveredDot
                          ? `${
                              calculateDistance(
                                {
                                  line: lineIndex,
                                  row: rowIndex,
                                  col: colIndex,
                                },
                                hoveredDot,
                              ) * 20
                            }ms`
                          : '0ms',
                      }}
                    />
                    {/* Invisible larger hover area */}

                    <div
                      className="absolute"
                      style={{
                        width: `${dotSize * 3}px`,
                        height: `${dotSize * 3}px`,
                        top: `-${(dotSize * 3) / 4}px`,
                        left: `-${(dotSize * 3) / 4}px`,
                      }}
                      onMouseLeave={() => setHoveredDot(null)}
                      onMouseEnter={() =>
                        setHoveredDot({
                          line: lineIndex,
                          row: rowIndex,
                          col: colIndex,
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default HackathonTitleHover;
