import { useRef, useState } from "react";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import styles from "./Image.module.css";

type Props = {
  url: string;
  width: number;
  height: number;
  alt: string;
  onError?: () => void;
};

const Image = ({ url, width, height, alt, onError }: Props) => {
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const renderImage = () => {
    setIsInView(true);
  };

  useIntersectionObserver({
    root: null,
    target: imgRef,
    onIntersect: renderImage,
    enabled: !isInView,
  });

  return (
    <div
      className={styles.imageContainer}
      ref={imgRef}
      style={{
        width: width,
        height: height,
      }}
    >
      {isInView && (
        <img className={styles.image} src={url} alt={alt} onError={onError} />
      )}
    </div>
  );
};

export default Image;
