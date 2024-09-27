"use client";


import Card from "../components/CardComponent";

import CircleCardComponent from "../components/CircleCardComponent";
import PreStoryComponent from "../components/PreStoryComponent";
import React, { useState, useEffect,useRef } from 'react';
import useSound from "use-sound";
export default function LandingPage() {
  const initialCards = [
    {
      id: 1,
      title: "Kitten",
      description:
        "This adorable kitten character is known for its playful and curious nature, always exploring and discovering new things.",
      image: "../kitten.png",
      animatedgifs: "../cat.gif",
      audioSrc:"../sounds/meow.mp3"
    }
    ,{
      id: 0,
      title: "Peppa Pig",
      description:
        "Peppa Pig is a lovable but slightly bossy little pig who lives with her younger brother George, Mummy Pig, and Daddy Pig.",
      image: "../peppapig.png",
      animatedgifs: "https://media1.giphy.com/media/4BRUJWurdU5ii9xrCu/source.gif",
      
      audioSrc:"../sounds/peppapig.mp3"
    },
    
    {
      id: 2,
      title: "Unicorn",
      description:
        "Unicorns are mythical creatures, often depicted as a horse with a single, spiraling horn on its forehead, symbolizing purity and grace.",
      image: "../unicorn.png",
      animatedgifs: "https://media.tenor.com/BSnqQDHP3-IAAAAi/magic-unicorn.gif",
      audioSrc:"../sounds/unicorn.mp3"
      
    },
 
  ];

  const actionCards =[
    {
      "id": 1,
      "title": "Jumping",
      "description":
        "Get ready to jump into action! Unicorns are mythical creatures, often depicted as a horse with a single, spiraling horn on its forehead, symbolizing purity and grace.",
      "image":  "../actionImages/49.png",
      audioSrc:"../sounds/clicksound.mp3"
      
    },
    {
      "id": 2,
      "title": "Walking",
      "description":
        "Get ready to jump into action! Unicorns are mythical creatures, often depicted as a horse with a single, spiraling horn on its forehead, symbolizing purity and grace.",
      "image":  "../actionImages/50.png",
      audioSrc:"../sounds/clicksound.mp3"
    },
    {
      "id": 3,
      "title": "Dancing",
      "description":
        "Get ready to jump into action! Unicorns are mythical creatures, often depicted as a horse with a single, spiraling horn on its forehead, symbolizing purity and grace.",
      "image":  "../actionImages/51.png",
      audioSrc:"../sounds/clicksound.mp3"
    },
    {
      "id": 4,
      "title": "Laughing",
      "description":
        "Get ready to jump into action! Unicorns are mythical creatures, often depicted as a horse with a single, spiraling horn on its forehead, symbolizing purity and grace.",
      "image":  "../actionImages/52.png",
      audioSrc:"../sounds/clicksound.mp3"
    },
    {
      "id": 5,
      "title": "Running",
      "description":
        "Get ready to jump into action! Unicorns are mythical creatures, often depicted as a horse with a single, spiraling horn on its forehead, symbolizing purity and grace.",
      "image":  "../actionImages/53.png",
      audioSrc:"../sounds/clicksound.mp3"
    },
    {
      "id": 6,
      "title": "Swimming",
      "description":
        "Get ready to jump into action! Unicorns are mythical creatures, often depicted as a horse with a single, spiraling horn on its forehead, symbolizing purity and grace.",
      "image":  "../actionImages/54.png",
      audioSrc:"../sounds/clicksound.mp3"
    },
    {
      "id": 7,
      "title": "Singing",
      "description":
        "Get ready to jump into action! Unicorns are mythical creatures, often depicted as a horse with a single, spiraling horn on its forehead, symbolizing purity and grace.",
      "image":  "../actionImages/55.png",
      audioSrc:"../sounds/clicksound.mp3"
    },
    {
      "id": 8,
      "title": "Playing",
      "description":
        "Get ready to jump into action! Unicorns are mythical creatures, often depicted as a horse with a single, spiraling horn on its forehead, symbolizing purity and grace.",
      "image":  "../actionImages/56.png",
      audioSrc:"../sounds/clicksound.mp3"
    },
    {
      "id": 9,
      "title": "Climbing",
      "description":
        "Get ready to jump into action! Unicorns are mythical creatures, often depicted as a horse with a single, spiraling horn on its forehead, symbolizing purity and grace.",
      "image":  "../actionImages/57.png",
      audioSrc:"../sounds/clicksound.mp3"
    },
    {
      "id": 10,
      "title": "Skipping",
      "description":
        "Get ready to jump into action! Unicorns are mythical creatures, often depicted as a horse with a single, spiraling horn on its forehead, symbolizing purity and grace.",
      "image":  "../actionImages/58.png",
      audioSrc:"../sounds/clicksound.mp3"
    }
  ]
  
  const ActionCards = [
    {
      id: 6,
      title: "Playground",
      description:
        "The bustling metropolis of New York City is known for its towering skyscrapers, vibrant culture, and iconic landmarks.",
      image: "../placeImage/59.png",
      audioSrc:"../sounds/playground.mp3"
    },
    {
      id: 7,
      title: "Zoo",
      description:
        "The romantic city of Paris, known for its rich history, stunning architecture, and world-famous landmarks like the Eiffel Tower.",
      image: "../placeImage/60.png",
      audioSrc:"../sounds/zoo.mp3"
    },
    {
      id: 8,
      title: "Library",
      description:
        "Tokyo, Japan's bustling capital, is a mix of ultramodern and traditional, with skyscrapers, shopping, and historic temples.",
      image: "../placeImage/61.png",
      audioSrc:"../sounds/library.mp3"
    },
  ];
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedCard, setSelectedCard] = useState(false);
  const [showActionCards, setShowActionCards] = useState(false);
  const [showPlaceCards, setShowPlaceCards] = useState(false);
  const [initalCardDetails, setInitalCardDetails] = useState(false);
  const [actionCardDetails, setActionCardDetails] = useState(false);
  const [placeCardDetails, setPlaceCardDetails] = useState(false);
  const [canPlayAudio, setCanPlayAudio] = useState(false); // Track if the user has interacted
  const [showInitialScreen, setShowInitialScreen] = useState(true);

  const [play, { stop }] = useSound('../sounds/clicksound.mp3')


  const playAudio = () => {
    play()
    setIsPlaying(true);
    setCanPlayAudio(true);
  };

  const pauseAudio = () => {
    stop
    setIsPlaying(false);
  };

  const handleStartCreation = () => {
    setShowInitialScreen(false);
    playAudio();
  };

  const handleCardClick = (card) => {
    setSelectedCard(true);
    setShowActionCards(false);
    setInitalCardDetails(card);
  };

  const handleShowActionCards = (card) => {
    setShowActionCards(true);
    setSelectedCard(false);
    setActionCardDetails(card);
  };

  const handlePlaceCards = (card) => {
    setPlaceCardDetails(card);
    setShowPlaceCards(true);
  };
  return (
    <div
      className="flex flex-col justify-center items-center min-h-screen bg-cover bg-center custom-cursor"
      style={{ backgroundImage: "url('backgroundimageiwithkids.png')" }}
    >

      {showInitialScreen ? (
        <div className="flex flex-row items-center justify-center ml-80">
  <div className="flex flex-col items-center">
    <h1 className="text-8xl font-bold mb-8 text-white text-center">
      Create your story
    </h1>
    <button
      onClick={handleStartCreation}
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded text-xl mt-4"
    >
      Start Creating
    </button>
  </div>

  <img 
    src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/3b9127105856873.5f86b0cc29ddf.gif"
    alt="Story Creation"
    className="ml-4"
  />
</div>

 
      ) : (
        <>
          {!selectedCard && !showActionCards && (
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-8xl font-bold mb-8 text-white">
                Select a character
              </h1>
              <div className="flex space-x-6">
                {initialCards.map((card) => (
                  <div onClick={() => handleCardClick(card)} key={card.id}>
                    <Card
                      title={card.title}
                      description={card.description}
                      image={card.image}
                      gifImage={card.animatedgifs}
                      audioSrc={card.audioSrc}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedCard && !showActionCards && (
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-8xl font-bold mb-8 text-white">
                Choose an action
              </h1>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '60px' }}>
                {actionCards.map((card) => (
                  <div onClick={() => handleShowActionCards(card)} key={card.id}>
                    <CircleCardComponent
                      title={card.title}
                      description={card.description}
                      image={card.image}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {showActionCards && !showPlaceCards && (
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-8xl font-bold mb-8 text-white">
                Choose a place
              </h1>
              <div className="flex space-x-6">
                {ActionCards.map((card) => (
                  <div onClick={() => handlePlaceCards(card)} key={card.id}>
                    <Card
                      title={card.title}
                      description={card.description}
                      image={card.image}
                      audioSrc={card.audioSrc}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {showPlaceCards && (
            <PreStoryComponent
              initialCard={initalCardDetails}
              actionCard={actionCardDetails}
              placeCard={placeCardDetails}
            />
          )}
        </>
      )}
    </div>
  );
}
