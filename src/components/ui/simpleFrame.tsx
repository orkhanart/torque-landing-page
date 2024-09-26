import React from 'react';

interface SimpleFrameProps {
  children: React.ReactNode;
  className?: string;
  gray?: boolean;
}

const SimpleFrame: React.FC<SimpleFrameProps> = ({ children, className = '', gray = false }) => {
  const borderStyle = gray
    ? '2px solid; border-image-source: linear-gradient(180deg, rgba(161, 255, 255, 0.08) 0%, rgba(161, 255, 255, 0.03) 100%);'
    : '2px solid; border-image-source: linear-gradient(180deg, rgba(161, 255, 255, 0.8) 0%, rgba(161, 255, 255, 0.03) 100%);';

  return (
    <div className={`${className}`} style={{ border: borderStyle }}>
      {children}
    </div>
  );
};

export default SimpleFrame;
