"use client";
import React, { useState } from 'react';
import useSound from 'use-sound';

const CircleCardComponent = ({ title, image, gifImage, audioSrc }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [play, { stop }] = useSound("https://cdn.pixabay.com/audio/2022/03/10/audio_92b55cff90.mp3");

  const handleMouseEnter = () => {
    setIsHovered(true);
    play();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    stop();
  };

  return (
    <div
      className="bg-[#F0FF4F] border border-[#B7C400] rounded-full shadow-lg transition-all duration-300 ease-out transform hover:scale-105 overflow-hidden w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 lg:w-60 lg:h-60 xl:w-72 xl:h-72"
      style={{
        cursor: 'url(cursorstar.png), auto !important',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        className="w-full h-full object-cover transition-opacity duration-300"
        src={isHovered && gifImage ? gifImage : image}
        alt={title}
      />
      <div
        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300"
      >
        <h5 className="text-xl font-bold tracking-tight text-white text-center px-2">{title}</h5>
      </div>
    </div>
  );
};

export default CircleCardComponent;
