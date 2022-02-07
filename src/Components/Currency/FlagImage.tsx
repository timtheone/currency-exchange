import { useState } from "react";
import Image from "../Image/Image";

export default function FlagImage({
  countryFlag,
  countryName,
}: {
  countryFlag: string;
  countryName: string;
}) {
  const [imageData, setImageData] = useState({
    src: `flags/${countryFlag}.png`,
    alt: `${countryName} flag`,
  });
  const handleFallback = () => {
    setImageData({ src: "flags/default.png", alt: "Generic flag" });
  };
  return (
    <Image
      url={imageData.src}
      alt={imageData.alt}
      width={70}
      height={47}
      onError={handleFallback}
    />
  );
}
