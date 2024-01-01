import React, { useState, useEffect, useRef } from "react";

const LazyImage = ({ src, alt, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute("data-src");
          if (src) {
            img.setAttribute("src", src);
            setIsLoaded(true);
          }
          observer.disconnect();
        }
      });
    });

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (observer && observer.disconnect) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <img
      ref={imgRef}
      data-src={src || ""}
      alt={alt}
      style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 0.3s" }}
      className={className || ""}
    />
  );
};

export default LazyImage;
