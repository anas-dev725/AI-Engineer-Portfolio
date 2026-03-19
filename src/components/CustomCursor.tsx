import React, { useEffect, useState } from 'react';

const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === 'A' || (e.target as HTMLElement).tagName === 'BUTTON') {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] transition-transform duration-150 ease-out hidden md:block ${
        isHovering ? 'scale-150' : 'scale-100'
      }`}
      style={{
        transform: `translate(${position.x - 16}px, ${position.y - 16}px)`,
      }}
    >
      <div className="w-full h-full rounded-full border-2 border-indigo-500/50 bg-indigo-500/10 backdrop-blur-[1px]"></div>
    </div>
  );
};

export default CustomCursor;
