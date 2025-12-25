import React, { useEffect, useRef, useState } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHidden, setIsHidden] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    // Use requestAnimationFrame for smooth performance without blocking the main thread
    let rafId: number;
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          if (cursorRef.current && ringRef.current) {
             // Move the dot immediately
             cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
             
             // Move the ring (could add a slight delay here for "magnetic" feel if desired, but keeping it synced for performance)
             ringRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
          }
          rafId = 0;
        });
      }
    };

    const handleMouseEnter = () => setIsHidden(false);
    const handleMouseLeave = () => setIsHidden(true);

    const handleElementHover = () => setIsPointer(true);
    const handleElementLeave = () => setIsPointer(false);

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Add hover listeners to clickable elements
    const addListeners = () => {
        const clickables = document.querySelectorAll('a, button, input, textarea, [role="button"], .cursor-pointer');
        clickables.forEach((el) => {
        el.addEventListener('mouseenter', handleElementHover);
        el.addEventListener('mouseleave', handleElementLeave);
        });
    };

    addListeners();

    // Re-add listeners if DOM changes (simple observer)
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Don't render on mobile/touch devices
  if (typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return null;
  }

  return (
    <>
      <style>{`
        body { cursor: none; }
        a, button, input, textarea { cursor: none; }
      `}</style>
      
      {/* Main Cursor Dot */}
      <div
        ref={cursorRef}
        className={`fixed pointer-events-none z-[9999] w-2 h-2 bg-indigo-500 rounded-full transition-opacity duration-300 will-change-transform ${isHidden ? 'opacity-0' : 'opacity-100'} ${isPointer ? 'scale-0' : 'scale-100'}`}
        style={{ left: 0, top: 0 }}
      />
        
      {/* Outer Ring */}
      <div 
        ref={ringRef}
        className={`fixed pointer-events-none z-[9999] border border-indigo-500/50 rounded-full transition-all duration-300 ease-out will-change-transform ${isHidden ? 'opacity-0' : 'opacity-100'}
          ${isPointer ? 'w-12 h-12 bg-indigo-500/10 border-indigo-400' : 'w-8 h-8'}`}
        style={{ left: 0, top: 0 }}
      />
    </>
  );
};

export default CustomCursor;