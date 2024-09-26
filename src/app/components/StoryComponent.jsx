import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick'; // Importing the carousel
import { OpenAI } from 'openai';
import axios from 'axios';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function StoryComponent({ initialCard, actionCard, placeCard }) {
  const [story, setStory] = useState('');
  const [storyParts, setStoryParts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [currentPart, setCurrentPart] = useState(0);
  const [imageGenerationStatus, setImageGenerationStatus] = useState([]);

  const audioRef = useRef(null);
  const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true });

  const fetchStory = async (initialCard, actionCard, placeCard) => {
    setLoading(true);
    setError('');
    try {
      const prompt = `Create a detailed children's story based on the following details. The story should be divided into three distinct parts, each around 100 words: Character: ${initialCard.title}, Action: ${actionCard.title}, Place: ${placeCard.title}. Separate each part with [PART].`;
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: prompt },
        ],
      });
      const generatedStory = response.choices[0].message.content.trim();
      setStory(generatedStory);
      const parts = generatedStory.split('[PART]').map(part => part.trim());
      setStoryParts(parts);
      await generateAndSaveAudio(generatedStory);
      setImageGenerationStatus(new Array(parts.length).fill('Waiting'));
      for (let i = 0; i < parts.length; i++) {
        await generateImage(parts[i], i);
      }
    } catch (err) {
      console.error(err);
      setError('Error generating story. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const generateAndSaveAudio = async (text) => {
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
    } catch (err) {
      console.error('Error generating audio:', err);
      setError('Error generating audio. Please try again.');
    }
  };

  const generateImage = async (storyText, index) => {
    try {
      setImageGenerationStatus(prevStatus => {
        const newStatus = [...prevStatus];
        newStatus[index] = 'Generating';
        return newStatus;
      });

      const response = await axios.post('https://api.monsterapi.ai/v1/generate/txt2img', {
        prompt: `Illustration for a children's story part: ${storyText}`,
        aspect_ratio: "portrait",
        guidance_scale: 7.5,
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_MONSTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      const processId = response.data.process_id;
      await pollForImage(processId, index);
    } catch (err) {
      console.error('Error generating image:', err);
      setError('Error generating image. Please try again.');
      setImageGenerationStatus(prevStatus => {
        const newStatus = [...prevStatus];
        newStatus[index] = 'Failed';
        return newStatus;
      });
    }
  };

  const pollForImage = async (processId, index) => {
    while (true) {
      try {
        const response = await axios.get(`https://api.monsterapi.ai/v1/status/${processId}`, {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_MONSTER_API_KEY}`,
          },
        });

        if (response.data.status === 'COMPLETED') {
          setImageUrls(prevUrls => {
            const newUrls = [...prevUrls];
            newUrls[index] = response.data.result.output[0];
            return newUrls;
          });
          setImageGenerationStatus(prevStatus => {
            const newStatus = [...prevStatus];
            newStatus[index] = 'COMPLETED';
            return newStatus;
          });
          break;
        } else if (response.data.status === 'failed') {
          throw new Error('Image generation failed');
        }
        
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (err) {
        console.error('Error polling for image:', err);
        setError('Error generating image. Please try again.');
        setImageGenerationStatus(prevStatus => {
          const newStatus = [...prevStatus];
          newStatus[index] = 'Failed';
          return newStatus;
        });
        break;
      }
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
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Story for {initialCard?.title}
      </h2>
      {loading && <p className="text-gray-600 dark:text-gray-400">Loading story and generating images...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {storyParts.length > 0 && (
        <div>
          <div className="mb-4">
            <p className="text-lg text-gray-700 dark:text-gray-400">{storyParts[currentPart]}</p>
          </div>
          {audioUrl && (
            <div className="mb-4">
              <audio
                ref={audioRef}
                src={audioUrl}
                onEnded={handleAudioEnded}
                onTimeUpdate={handleAudioTimeUpdate}
              />
              <button 
                onClick={isPlaying ? pauseAudio : playAudio}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
              >
                {isPlaying ? 'Pause' : 'Play'} Story
              </button>
            </div>
          )}
          <Slider {...sliderSettings}>
            {storyParts.map((part, index) => (
              <div key={index}>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Part {index + 1}</h3>
                {imageGenerationStatus[index] === 'COMPLETED' ? (
                  <img src={imageUrls[index]} alt={`Story Illustration Part ${index + 1}`} className="w-full rounded-lg shadow-md" />
                ) : (
                  <p className="text-gray-600 dark:text-gray-400">
                    {imageGenerationStatus[index] === 'Generating' ? 'Generating image...' : 'Image not available'}
                  </p>
                )}
              </div>
            ))}
          </Slider>
        </div>
      )}
    </div>
  );
}
