import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick'; // Importing the carousel
import { OpenAI } from 'openai';
import axios from 'axios';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function PreStoryComponent({ initialCard, actionCard, placeCard }) {
  const [story, setStory] = useState('');
  const [storyParts, setStoryParts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [currentPart, setCurrentPart] = useState(0);
  const[title,setTitle]=useState('')
  const [loadingAudio, setLoadingAudio] = useState(false); // New loading state
  const [imageGenerationStatus, setImageGenerationStatus] = useState([]);
  const json=[{
    "Character": "PeppaPig Character",
    "Action": {
      "Type": "Jumping",
      "Place": "Playground",
      "Story": "One sunny day, Peppa Pig and her friends rushed to the Jumping Playground, their laughter echoing in the air. As they bounced on the colorful trampolines, they took turns flipping and soaring high, trying to touch the fluffy clouds. George cheered loudly as Peppa performed her best jump yet, soaring above the others. Suddenly, they discovered a hidden slide that spiraled down into a ball pit, sparking even more giggles. At the end of the day, they all agreed that the Jumping Playground was the best place for fun and friendship!",
      "Title":"Peppa Pig's Jumping Playground Adventure",
      "image":"../story/1.jpg"
    }
  }]
  

  const fetchStory = async (initialCard, actionCard, placeCard) => {
    // Iterate over each character in the json array
    for (const item of json) {
      if (item.Character === initialCard.title) {
        if (item.Action.Type === actionCard.title) {
          if (item.Action.Place === placeCard.title) {
            setStory(item.Action.Story)
            setImageUrls(item.Action.image)
            setTitle(item.Action.Title)
            generateAndSaveAudio(item.Action.Story)
          }
        }
      }
    }
    console.log('No Item Found')
    return null; // Return null if no match is found
  };
  const audioRef = useRef(null);
  const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true });



  const generateAndSaveAudio = async (text) => {
    setLoadingAudio(true);
    try {
      
      const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: "alloy",
        input: text,
      });

      const buffer = await mp3.arrayBuffer();
      const blob = new Blob([buffer], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      setLoadingAudio(false)
    } catch (err) {
      console.error('Error generating audio:', err);
      setError('Error generating audio. Please try again.');
      setLoadingAudio(false)
    }
  };


  

  const playAudio = () => {
    if (audioUrl && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentPart(0);
  };

  const handleAudioTimeUpdate = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const totalDuration = audioRef.current.duration;
      const partDuration = totalDuration / storyParts.length;
      const newCurrentPart = Math.floor(currentTime / partDuration);
      if (newCurrentPart !== currentPart) {
        setCurrentPart(newCurrentPart);
      }
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index) => setCurrentPart(index),
  };

  useEffect(() => {
    fetchStory(initialCard, actionCard, placeCard);
  }, [initialCard, actionCard, placeCard]);
  return (
    <div className="max-w-2xl mx-auto bg-[#69187A] p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        {title}
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4">
        {imageUrls.length > 0 && (
          <img src={imageUrls} alt="Story Illustration" className="w-full rounded-lg shadow-md" />
        )}
      </div>
      {audioUrl ? (
        <div className="mb-4">
          <audio
            ref={audioRef}
            src={audioUrl}
            onEnded={handleAudioEnded}
            onTimeUpdate={handleAudioTimeUpdate}
          />
          <button 
            onClick={isPlaying ? pauseAudio : playAudio}
            className="bg-[#D63DF5] hover:bg-[#DF20F5] text-white font-bold py-2 px-4 rounded"
          >
            {isPlaying ? 'Pause' : 'Play'} Audio
          </button>
        </div>
      ) : (
        loadingAudio && <p className="text-white">Loading audio, please wait...</p> // Loading text
      )}
    </div>
  );
}