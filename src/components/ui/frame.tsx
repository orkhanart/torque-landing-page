// Todo: delete this file

import React from 'react';
import Image from 'next/image';

interface FrameProps {
  children: React.ReactNode;
  gray?: boolean;
  upperRightCorner?: boolean;
  lowerLeftCorner?: boolean;
  upperLeftCorner?: boolean;
  lowerRightCorner?: boolean;

  className?: string; // Added className prop
}

const Frame = ({ children, gray = false, upperRightCorner = true, lowerLeftCorner = true, upperLeftCorner = false, lowerRightCorner = false, className = '' }: FrameProps) => {
  const borderStyle = gray
    ? {
        border: '2px solid',
        borderImageSource: 'linear-gradient(180deg, rgba(108, 108, 108, 0.29) 0%, rgba(210, 210, 210, 0) 120.32%)',
        borderImageSlice: '1'
      }
    : {
        border: '2px solid',
        borderImageSource: 'linear-gradient(180deg, #1F616B 0%, rgba(18, 33, 34, 0) 100%)',
        borderImageSlice: '1',
        background: 'linear-gradient(129.8deg, rgba(5, 243, 255, 0) 25.59%, rgba(5, 243, 255, 0.08) 126.28%)'
      };

  return (
    <div className={`relative p-4 rounded-lg h-full w-full ${className}`} style={borderStyle}>
      {upperRightCorner && (
        <Image
          src={gray ? "/upper-cross-gray.svg" : "/upper-cross.svg"}
          alt="Frame"
          width={16}
          height={16}
          className="absolute -top-[3px] -right-[3px] z-10"
        />
      )}
      {lowerLeftCorner && (
        <Image
          src={gray ? "/lower-cross-gray.svg" : "/lower-cross.svg"}
          alt="Frame"
          width={16}
          height={16}
          className="absolute -bottom-[3px] -left-[3px] z-10"
        />
      )}
      {upperLeftCorner && (
        <Image
          src={gray ? "/upper-cross-gray.svg" : "/upper-cross.svg"}
          alt="Frame"
          width={16}
          height={16}
          className="absolute -top-[3px] -left-[3px] z-10 -rotate-90"
        />
      )}
      {lowerRightCorner && (
        <Image
          src={gray ? "/lower-cross-gray.svg" : "/lower-cross.svg"}
          alt="Frame"
          width={16}
          height={16}
          className="absolute -bottom-[3px] -right-[3px] z-10 -rotate-90"
        />
      )}

      {children}
    </div>
  );
}

export default Frame;