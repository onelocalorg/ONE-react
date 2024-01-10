import { useEffect, useState } from "react";

const useImageLoader = (img) => {
  const [imgsLoaded, setImgsLoaded] = useState(false);

  useEffect(() => {
    const loadImage = (image) => {
      return new Promise((resolve, reject) => {
        const loadImg = new Image();
        loadImg.src = image;
        loadImg.onload = () => {
          setImgsLoaded(true);
          resolve(image);
        };

        loadImg.onerror = (err) => reject(err);
      });
    };

    loadImage(img);
  }, [img]);

  return imgsLoaded;
};

export default useImageLoader;
