import React, { useState, useEffect } from 'react';

export default function ImageModal({ imgSrc, imgAlt }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // stop user from scrolling when modal is open
    document.body.style.overflow = isOpen ?  'hidden' : 'auto';

    // cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      <img 
        src={imgSrc} 
        alt={imgAlt} 
        className='projectImg' 
        onClick={() => setIsOpen(true)}
      />
      
      { isOpen && (
        <div className='imgModal' onClick={() => setIsOpen(false)}>
          <img src={imgSrc} alt={imgAlt} className='modalImg'/>
        </div>
      )}
    </>
  );
}