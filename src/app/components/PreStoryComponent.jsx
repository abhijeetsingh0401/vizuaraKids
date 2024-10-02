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
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const json=[{
    "Character": "Peppa Pig",
    "Action": {
      "Type": "Jumping",
      "Place": "Playground",
      "Story": "One sunny day, Peppa Pig and her friends hurried to the Bouncy Playground, their happy giggles filling the air. They bounced on the colorful trampolines, taking turns jumping and flying high, trying to reach the fluffy clouds. George clapped and cheered as Peppa made her biggest jump, going higher than everyone else. Then, they found a secret slide that went down into a big ball pit, making them laugh even more. By the end of the day, they all agreed that the Bouncy Playground was the best place for fun and friends!",
      "Title":"Peppa Pig's Jumping Playground Adventure",
      "image":"../story/1.jpg"
    }
  },
  {
    "Character": "Kitten",
    "Action": {
      "Type": "Jumping",
      "Place": "Playground",
      "Story": "A playful kitten named Whiskers jumped into the sunny playground, eyes big with wonder. She jumped after a flying butterfly, following it across the soft grass. With a little hop, she landed on the swing, moving back and forth. Her tiny paws climbed up the slide, laughing as she slid down. At the end of the day, Whiskers curled up under a tree, tired but happy from her fun adventure.",
      "Title":"Whiskers' Playground Adventure",
      "image":"../story/3.jpg"
    }
  },
  {
    "Character": "Unicorn",
    "Action": {
      "Type": "Jumping",
      "Place": "Playground",
      "Story": "A magical unicorn named Sparkle ran into the bright playground, her shiny mane glowing in the sunlight. She danced after rainbows, leaving sparkles everywhere she went. With a happy jump, she landed on the merry-go-round, spinning with joy. Her hooves tapped as she climbed up a rainbow slide, sliding down with a giggle full of magic. Finally, Sparkle lay under a glowing tree, her heart happy after her magical playtime.",
      "Title":"Sparkle's Magical Playground Adventure",
      "image":"../story/2.jpg"
    }
  },
  {
    "Character": "Kitten",
    "Action": {
      "Type": "Swimming",
      "Place": "Playground",
      "Story": "One sunny day, a curious kitten named Whiskers wandered to a playground near a small pond. She saw ducks swimming and decided to join them, even though she'd never been in water before. With a little splash, Whiskers jumped in, paddling her tiny paws nervously. Soon, she was happily swimming alongside the ducks, feeling proud and brave. After her swim, she dried off in the sun and spent the rest of the day playing on the swings",
      "Title":"Whiskers' Brave Adventure at the Playground Pond",
      "image":"../story/10.jpg"
    }
  },
  {
    "Character": "Unicorn",
    "Action": {
      "Type": "Swimming",
      "Place": "Playground",
      "Story": "One day, a magical unicorn named Sparkle found a hidden playground with a beautiful, sparkling pool. Excited, she decided to dip her hooves into the water and began to swim gracefully. As she swam, her mane glowed with rainbow colors, making the water shimmer. The children at the playground cheered and laughed, amazed by the magical sight. After her swim, Sparkle played on the slides, leaving behind a trail of glitter wherever she went.",
      "Title":"Sparkle's Magical Swim at the Playground",
      "image":"../story/12.jpg"
    }
  },

  {
    "Character": "Peppa Pig",
    "Action": {
      "Type": "Swimming",
      "Place": "Playground",
      "Story": "Peppa Pig and her friends went to the playground on a sunny day and discovered a small pool nearby. Excited, Peppa put on her floaties and jumped into the water, splashing everywhere. George and the others joined in, making big splashes and having fun. After swimming, Peppa and her friends played on the swings and slides, laughing all day long. They went home happy and tired after their exciting playground adventure.",
      "Title":"Peppa Pig's Splashy Playground Adventure",
      "image":"../story/11.jpg"
    }
  },
  {
    "Character": "Kitten",
    "Action": {
      "Type": "Jumping",
      "Place": "Zoo",
      "Story": "One day, a playful kitten named Fluffy visited the zoo with her friends. She was so excited that she jumped around everywhere, bouncing from one animal to another. Fluffy loved watching the big lions, tall giraffes, and funny monkeys. She even tried to jump as high as the kangaroos! At the end of the day, Fluffy was tired but happy, ready to go home after her fun zoo adventure.",
      "Title":"Fluffy's Fun Day at the Zoo",
      "image":"../story/7.jpg"
    }
  },
  {
    "Character": "Unicorn",
    "Action": {
      "Type": "Jumping",
      "Place": "Zoo",
      "Story": "One sunny day, a magical unicorn named Twinkle visited the zoo with her friends. She jumped with joy as she saw all the amazing animals like elephants and zebras. Twinkle tried to leap as high as the giraffes, giggling as she landed softly. The other animals watched in awe as she danced and twirled around. At the end of the day, Twinkle felt happy and magical after her fun day at the zoo.",
      "Title":"Twinkle's Magical Day at the Zoo",
      "image":"../story/8.jpg"
    }
  },
  {
    "Character": "Peppa Pig",
    "Action": {
      "Type": "Jumping",
      "Place": "Zoo",
      "Story": "Peppa Pig and her family went to the zoo on a bright sunny day. Peppa jumped up and down with excitement as she saw the big animals. She loved watching the playful monkeys swinging and the funny penguins waddling around. Peppa even tried to jump like the kangaroos, giggling as she bounced. At the end of the day, Peppa was tired but happy, ready to go home after her fun day at the zoo.",
      "Title":"Twinkle's Magical Day at the Zoo",
      "image":"../story/9.jpg"
    }
  },

  {
    "Character": "Peppa Pig",
    "Action": {
      "Type": "Jumping",
      "Place": "Library",
      "Story": "One sunny day, Peppa Pig was feeling extra bouncy. She jumped and hopped all the way to the library with her friends!      Inside, Peppa found tall bookshelves filled with exciting stories.     She giggled as she picked out a book about kangaroos that could jump high too.      Peppa jumped home, ready to read her new book with joy!",      
      "Title":"Peppa Pig's Bouncy Trip to the Library",
      "image":"../story/14.jpg"
    }
    
  },
  {
    "Character": "Kitten",
    "Action": {
      "Type": "Jumping",
      "Place": "Library",
      "Story": "Kitten loved to leap and pounce around the house.      One day, she jumped from her bed and decided to visit the library.      Inside, Kitten found books full of wonderful tales of brave cats and curious kittens.      She purred with excitement and carried her favorite book to a cozy corner.      With a big stretch, Kitten curled up and read happily all afternoon.",
      "Title":"Kitten's Jump to the Library Adventure",
      "image":"../story/15.jpg"
    }
  },


  {
    "Character": "Unicorn",
    "Action": {
      "Type": "Jumping",
      "Place": "Library",
      "Story": "In a faraway land, a glittering unicorn loved to jump over rainbows.      One day, she leaped across the clouds and landed at the enchanted library.      Inside, there were magical books that sparkled with every page turn!      Unicorn found a special book about flying through the stars and read with delight.      With a gleam in her eye, she jumped back home, full of new magical stories",
      "Title":"Unicorn's Magical Leap to the Library",
      "image":"../story/13.jpg"
    }
  },
  {
    "Character": "Peppa Pig",
    "Action": {
      "Type": "Swimming",
      "Place": "Zoo",
      "Story": "Peppa Pig was excited for a big day at the zoo!      Before going, she decided to take a quick swim in the pool to cool off.      After splashing around, Peppa put on her hat and headed to see the animals.      At the zoo, she laughed as she watched the penguins swim and dive just like her.      Peppa had the best day ever, swimming and seeing all her favorite animals!",      
      "Title":"Peppa Pig's Splashy Day at the Zoo",
      "image":"../story/17.jpg"
    }
    
  },
  {
    "Character": "Kitten",
    "Action": {
      "Type": "Swimming",
      "Place": "Zoo",
      "Story": "Kitten loved to play in the water and swim like a little fish.      One sunny day, she swam across a small pond and found herself near the zoo.      She padded her paws dry and went inside to see the animals.      Kitten was amazed by the dolphins, who swam gracefully just like her!      She happily splashed in a puddle on her way back, dreaming of her next zoo visit.",
      "Title":"Kitten's Swim to the Zoo Adventure",
      "image":"../story/18.jpg"
    }
  },


  {
    "Character": "Unicorn",
    "Action": {
      "Type": "Swimming",
      "Place": "Zoo",
      "Story": "Unicorn loved swimming in magical lakes that shimmered like rainbows.      One day, after a glittering swim, she decided to visit the zoo to see more animals.      At the zoo, Unicorn marveled at the colorful fish swimming in a big pond.      She imagined herself swimming with them in an ocean of magic!      After her zoo trip, Unicorn swam home under the moon, dreaming of her next adventure.",
      "Title":" Unicorn's Sparkling Swim to the Zoo",
      "image":"../story/16.jpg"
    }
  },





  {
    "Character": "Peppa Pig",
    "Action": {
      "Type": "Swimming",
      "Place": "Library",
      "Story": "One sunny day, Peppa Pig was feeling extra bouncy. She jumped and hopped all the way to the library with her friends!      Inside, Peppa found tall bookshelves filled with exciting stories.     She giggled as she picked out a book about kangaroos that could jump high too.      Peppa jumped home, ready to read her new book with joy!",      
      "Title":"Peppa Pig's Bouncy Trip to the Library",
      "image":"../story/19.jpg"
    }
    
  },
  {
    "Character": "Kitten",
    "Action": {
      "Type": "Swimming",
      "Place": "Library",
      "Story": "Kitten loved to leap and pounce around the house.      One day, she jumped from her bed and decided to visit the library.      Inside, Kitten found books full of wonderful tales of brave cats and curious kittens.      She purred with excitement and carried her favorite book to a cozy corner.      With a big stretch, Kitten curled up and read happily all afternoon.",
      "Title":"Kitten's Jump to the Library Adventure",
      "image":"../story/20.jpg"
    }
  },


  {
    "Character": "Unicorn",
    "Action": {
      "Type": "Swimming",
      "Place": "Library",
      "Story": "In a faraway land, a glittering unicorn loved to jump over rainbows.      One day, she leaped across the clouds and landed at the enchanted library.      Inside, there were magical books that sparkled with every page turn!      Unicorn found a special book about flying through the stars and read with delight.      With a gleam in her eye, she jumped back home, full of new magical stories",
      "Title":"Unicorn's Magical Leap to the Library",
      "image":"../story/21.jpg"
    }
  },

]
  

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
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
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
          <div className="flex space-x-4"> {/* Flex container to align buttons horizontally */}
            <button
              onClick={isPlaying ? pauseAudio : playAudio}
              className="bg-[#D63DF5] hover:bg-[#DF20F5] text-white font-bold py-2 px-4 rounded"
            >
              {isPlaying ? 'Pause' : 'Play'} Audio
            </button>
            <button 
              onClick={togglePopup}
              className="bg-[rgb(34_197_94/var(--tw-bg-opacity))] hover:bg-[rgb(31_181_88/var(--tw-bg-opacity))] text-white font-bold py-2 px-4 rounded"
            >
              Conclusion
            </button>
          </div>
        </div>
      ) : (
        loadingAudio && <p className="text-white">Loading audio, please wait...</p>
      )}
  
      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Conclusion</h3>
            <p className="text-gray-800">Storytelling with AI empowers kids to creatively bring their ideas to life while learning how technology can be a fun and imaginative tool</p>
            <button
              onClick={togglePopup}
              className="mt-4 bg-[#D63DF5] hover:bg-[#DF20F5] text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
  
}