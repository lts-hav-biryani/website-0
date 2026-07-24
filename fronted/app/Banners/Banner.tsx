import Image from "next/image";

const Banner = () => {
  const banner = [
    "https://drive.google.com/uc?export=view&id=1oHEo8jkfEPyHM9U9yWM3iRsuHLAloYLV",
    "https://drive.google.com/uc?export=view&id=1djc9sydRBqKWALOdy4ca3jGDqj6Mn9r8",
    "https://drive.google.com/uc?export=view&id=1siMEN7-OYk9GcYknAKMOg-I4Hi50sMnQ",
    "https://drive.google.com/uc?export=view&id=109ruPi5_gBumcAAvNqACbs3vkjaQ3Bvc"
  ];

  return (
    <div className="flex gap-4 overflow-x-auto px-4 py-4 scrollbar-none">

      {banner.map((link, index) => (
        <div
          key={index}
          className="min-w-[85%] md:min-w-full rounded-2xl overflow-hidden"
        >
          <Image
            src={link}
            alt="Banner"
            width={1200}
            height={400}
            className="w-full h-[180px] md:h-[300px] object-cover rounded-2xl"
          />
        </div>
      ))}

    </div>
  );
};

export default Banner;