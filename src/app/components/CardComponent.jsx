"use client";
import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';
const CardComponent = ({ title, image, gifImage, audioSrc }) => {
  const [tilt, setTilt] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const [play, { stop }] = useSound(audioSrc);
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const centerX = rect.width / 2;
    const newTilt = ((x - centerX) / centerX) * 10; // Max tilt of 10 degrees
    setTilt(newTilt);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
   play()
  };

  const handleMouseLeave = () => {
    setTilt(0);
    setIsHovered(false);
stop()
  };



  return (
    <div
      className="max-w-xl bg-[#F0FF4F] border border-[#B7C400] font-extra rounded-lg shadow-lg transition-all duration-300 ease-out transform hover:scale-105"
      style={{
        transform: `perspective(1000px) rotateY(${tilt}deg)`,
        transformStyle: 'preserve-3d',
        height: '700px',
        cursor: 'url(cursorstar.png), auto !important'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        className="rounded-t-lg w-full h-[600px] object-cover transition-opacity duration-300"
        src={isHovered && gifImage ? gifImage : image}
        alt={title}
        style={{ transform: 'translateZ(20px)' }}
      />
      <div
        className="flex items-center justify-center h-[100px] p-6"
        style={{ transform: 'translateZ(30px)' }}
      >
        <h5 className="text-3xl font-bold tracking-tight text-black">{title}</h5>
      </div>
    </div>
  );
};

export default CardComponent;
