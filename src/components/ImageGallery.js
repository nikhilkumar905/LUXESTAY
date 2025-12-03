import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import './ImageGallery.css';

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
        <Lightbox
          mainSrc={images[currentImage]}
          nextSrc={images[(currentImage + 1) % images.length]}
          prevSrc={images[(currentImage + images.length - 1) % images.length]}
          onCloseRequest={() => setIsLightboxOpen(false)}
          onMovePrevRequest={() => setCurrentImage((currentImage + images.length - 1) % images.length)}
          onMoveNextRequest={() => setCurrentImage((currentImage + 1) % images.length)}
          imageTitle={`${roomName} - Image ${currentImage + 1} of ${images.length}`}
        />
      )}
    </>
  );
};

export default ImageGallery;
