import { useState } from "react";

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
    <img src={imageData.src} onError={handleFallback} alt={imageData.alt} />
  );
}
