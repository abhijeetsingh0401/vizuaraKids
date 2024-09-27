"use client";
import React, { useState, useRef, useEffect } from 'react';
import useSound from 'use-sound';

const CircleCardComponent = ({ title, image, gifImage, audioSrc, size = 300 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [play, { stop }] = useSound("https://cdn.pixabay.com/audio/2022/03/10/audio_92b55cff90.mp3")

  const handleMouseEnter = () => {
    setIsHovered(true);
play()
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
stop()
  };


  return (
    <div
      className="bg-[#F0FF4F] border border-[#B7C400] rounded-full shadow-lg transition-all duration-300 ease-out transform hover:scale-105 overflow-hidden"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        cursor: 'url(cursorstar.png), auto !important'
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
