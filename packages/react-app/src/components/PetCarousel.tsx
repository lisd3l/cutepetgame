import React, { useMemo } from "react";

const PetCarousel: React.FC = () => {
  const pets = useMemo<{ url: string; key: string; name: string; address: string }[]>(() => {
    const images = require.context("../assets/imgs/pets", true, /\.png$/);
    return images.keys().map((key: string) => {
      const serial = key.split("/")[1].slice(0, -4);
      return {
        key: serial,
        url: images(key).default,
        name: `MetaCaptain #${serial}`,
        address: "0x9B4a",
      };
    });
  }, []);
  return (
    <div className="grid grid-cols-5 gap-5 2xl:grid-cols-4 pet-carousel md:grid-cols-2 md:grid-rows-2 xs:grid-cols-1 xs:grid-rows-4">
      {pets.map(pet => (
        <div className="pet-slide" key={pet.key}>
          <div className="pet-container">
            <div className="pet-thumb" style={{ backgroundImage: `url(${pet.url})` }}></div>
            <div className="mt-2 leading-5 text-md">{pet.name}</div>
            <div className="mt-2 text-xs leading-4">From {pet.address}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PetCarousel;
