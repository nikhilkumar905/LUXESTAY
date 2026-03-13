import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import './ImageGallery.css';

const CustomLightbox = ({ images, currentIndex, roomName, onClose, onPrev, onNext }) => {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowLeft') onPrev();
      else if (e.key === 'ArrowRight') onNext();
      else if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onPrev, onNext, onClose]);

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose}><X size={28} /></button>
        <button className="lightbox-nav lightbox-prev" onClick={onPrev}><ChevronLeft size={36} /></button>
        <img
          className="lightbox-image"
          src={images[currentIndex]}
          alt={`${roomName} - Image ${currentIndex + 1} of ${images.length}`}
        />
        <button className="lightbox-nav lightbox-next" onClick={onNext}><ChevronRight size={36} /></button>
        <div className="lightbox-caption">{roomName} — {currentIndex + 1} / {images.length}</div>
      </div>
    </div>
  );
};

const ImageGallery = ({ images, roomName }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const openLightbox = (index) => {
    setCurrentImage(index);
    setIsLightboxOpen(true);
  };

  return (
    <>
      <div className="image-gallery">
        <div className="main-image" onClick={() => openLightbox(currentImage)}>
          <img src={images[currentImage]} alt={`${roomName} - Image ${currentImage + 1}`} />
          <button className="zoom-button" title="View Fullscreen">
            <ZoomIn size={24} />
          </button>
          {images.length > 1 && (
            <>
              <button className="gallery-nav prev" onClick={(e) => { e.stopPropagation(); prevImage(); }}>
                <ChevronLeft size={32} />
              </button>
              <button className="gallery-nav next" onClick={(e) => { e.stopPropagation(); nextImage(); }}>
                <ChevronRight size={32} />
              </button>
            </>
          )}
        </div>

        {images.length > 1 && (
          <div className="thumbnail-container">
            {images.map((img, index) => (
              <div
                key={index}
                className={`thumbnail ${index === currentImage ? 'active' : ''}`}
                onClick={() => setCurrentImage(index)}
              >
                <img src={img} alt={`Thumbnail ${index + 1}`} />
              </div>
            ))}
          </div>
        )}
      </div>

      {isLightboxOpen && (
        <CustomLightbox
          images={images}
          currentIndex={currentImage}
          roomName={roomName}
          onClose={() => setIsLightboxOpen(false)}
          onPrev={() => setCurrentImage((currentImage + images.length - 1) % images.length)}
          onNext={() => setCurrentImage((currentImage + 1) % images.length)}
        />
      )}
    </>
  );
};

export default ImageGallery;
