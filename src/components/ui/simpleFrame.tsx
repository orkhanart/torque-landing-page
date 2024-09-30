import React from 'react';

interface SimpleFrameProps {
  children: React.ReactNode;
  className?: string;
  color?: 'gray' | 'blue' | 'red';
}

const SimpleFrame: React.FC<SimpleFrameProps> = ({ children, className = '', color = 'blue' }) => {
  let borderStyle;
  switch (color) {
    case 'gray':
      borderStyle = '2px solid; border-image-source: linear-gradient(180deg, rgba(161, 255, 255, 0.08) 0%, rgba(161, 255, 255, 0.03) 100%);';
      break;
    case 'red':
      borderStyle = '2px solid; border-image-source: linear-gradient(180deg, #F1A3A1 -15.62%, rgba(139, 94, 93, 0) 110.42%);';
      break;
    default:
      borderStyle = '2px solid; border-image-source: linear-gradient(180deg, rgba(161, 255, 255, 0.8) 0%, rgba(161, 255, 255, 0.03) 100%);';
  }

  return (
    <div className={`${className}`} style={{ border: borderStyle }}>
      {children}
    </div>
  );
};

export default SimpleFrame;
