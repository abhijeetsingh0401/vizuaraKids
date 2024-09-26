"use client";

import { useState } from "react";
import Card from "../components/CardComponent";
import StoryComponent from "../components/StoryComponent";
import CircleCardComponent from "../components/CircleCardComponent";
import PreStoryComponent from "../components/PreStoryComponent";

export default function LandingPage() {
  const initialCards = [
    {
      id: 1,
      title: "Kitten Character",
      description:
        "This adorable kitten character is known for its playful and curious nature, always exploring and discovering new things.",
      image: "../kitten.png",
      animatedgifs: "https://media1.giphy.com/media/4BRUJWurdU5ii9xrCu/source.gif"
    }
    ,{
      id: 0,
      title: "PeppaPig Character",
      description:
        "Peppa Pig is a lovable but slightly bossy little pig who lives with her younger brother George, Mummy Pig, and Daddy Pig.",
      image: "../peppapig.png",
      animatedgifs: "https://media1.giphy.com/media/4BRUJWurdU5ii9xrCu/source.gif"
    },
    
    {
      id: 2,
      title: "Unicorn Character",
      description:
        "Unicorns are mythical creatures, often depicted as a horse with a single, spiraling horn on its forehead, symbolizing purity and grace.",
      image: "../unicorn.png",
      animatedgifs: "https://media1.giphy.com/media/4BRUJWurdU5ii9xrCu/source.gif"
    },
 
  ];

  const actionCards =[
    {
      "id": 1,
      "title": "Jumping",
      "description":
        "Get ready to jump into action! Unicorns are mythical creatures, often depicted as a horse with a single, spiraling horn on its forehead, symbolizing purity and grace.",
      "image":  "../actionImages/49.png"
    },
    {
      "id": 2,
      "title": "Walking",
      "description":
        "Get ready to jump into action! Unicorns are mythical creatures, often depicted as a horse with a single, spiraling horn on its forehead, symbolizing purity and grace.",
      "image":  "../actionImages/50.png"
    },
    {
      "id": 3,
      "title": "Dancing",
      "description":
        "Get ready to jump into action! Unicorns are mythical creatures, often depicted as a horse with a single, spiraling horn on its forehead, symbolizing purity and grace.",
      "image":  "../actionImages/51.png"
    },
    {
      "id": 4,
      "title": "Laughing",
      "description":
        "Get ready to jump into action! Unicorns are mythical creatures, often depicted as a horse with a single, spiraling horn on its forehead, symbolizing purity and grace.",
      "image":  "../actionImages/52.png"
    },
    {
      "id": 5,
      "title": "Running",
      "description":
        "Get ready to jump into action! Unicorns are mythical creatures, often depicted as a horse with a single, spiraling horn on its forehead, symbolizing purity and grace.",
      "image":  "../actionImages/53.png"
    },
    {
      "id": 6,
      "title": "Swimming",
      "description":
        "Get ready to jump into action! Unicorns are mythical creatures, often depicted as a horse with a single, spiraling horn on its forehead, symbolizing purity and grace.",
      "image":  "../actionImages/54.png"
    },
    {
      "id": 7,
      "title": "Singing",
      "description":
        "Get ready to jump into action! Unicorns are mythical creatures, often depicted as a horse with a single, spiraling horn on its forehead, symbolizing purity and grace.",
      "image":  "../actionImages/55.png"
    },
    {
      "id": 8,
      "title": "Playing",
      "description":
        "Get ready to jump into action! Unicorns are mythical creatures, often depicted as a horse with a single, spiraling horn on its forehead, symbolizing purity and grace.",
      "image":  "../actionImages/56.png"
    },
    {
      "id": 9,
      "title": "Climbing",
      "description":
        "Get ready to jump into action! Unicorns are mythical creatures, often depicted as a horse with a single, spiraling horn on its forehead, symbolizing purity and grace.",
      "image":  "../actionImages/57.png"
    },
    {
      "id": 10,
      "title": "Skipping",
      "description":
        "Get ready to jump into action! Unicorns are mythical creatures, often depicted as a horse with a single, spiraling horn on its forehead, symbolizing purity and grace.",
      "image":  "../actionImages/58.png"
    }
  ]
  
  const ActionCards = [
    {
      id: 6,
      title: "Playground",
      description:
        "The bustling metropolis of New York City is known for its towering skyscrapers, vibrant culture, and iconic landmarks.",
      image: "../placeImage/59.png",
    },
    {
      id: 7,
      title: "Zoo",
      description:
        "The romantic city of Paris, known for its rich history, stunning architecture, and world-famous landmarks like the Eiffel Tower.",
      image: "../placeImage/60.png",
    },
    {
      id: 8,
      title: "Library",
      description:
        "Tokyo, Japan's bustling capital, is a mix of ultramodern and traditional, with skyscrapers, shopping, and historic temples.",
      image: "../placeImage/61.png",
    },
  ];

  const [selectedCard, setSelectedCard] = useState(false);
  const [showActionCards, setShowActionCards] = useState(false);
  const [showPlaceCards, setShowPlaceCards] = useState(false);
  const [initalCardDetails, setInitalCardDetails] = useState(false);
  const [actionCardDetails, setActionCardDetails] = useState(false);
  const [placeCardDetails, setPlaceCardDetails] = useState(false);

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
      className="flex justify-center items-center h-screen bg-cover bg-center custom-cursor"
      style={{ backgroundImage: "url('backgroundimage.png')"  }} // Replace with your image path
    >
      <div className="flex space-x-6">
        
        {/* Conditional rendering for initial, action, or place cards */}
        {!selectedCard && !showActionCards && (
  <div className="flex flex-col justify-center items-center">
    {/* Heading above the cards */}
    <h1 className="text-6xl font-bold mb-8 text-white">
      Select a character
    </h1>

    {/* Cards */}
    <div className="flex space-x-6">
      {initialCards.map((card) => (
        <div onClick={() => handleCardClick(card)} key={card.id}>
          <Card
            title={card.title}
            description={card.description}
            image={card.image}
            gifImage={card.animatedgifs}
          />
        </div>
      ))}
    </div>
  </div>
)}


{selectedCard && !showActionCards && (
  <div className="flex flex-col justify-center items-center">
    {/* Heading */}
    <h1 className="text-6xl font-bold mb-8 text-white">
      Choose an action
    </h1>

    {/* Cards Grid */}
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
    {/* Heading above the action cards */}
    <h1 className="text-4xl font-bold mb-8 text-white">
      Choose a place
    </h1>

    {/* Action Cards */}
    <div className="flex space-x-6">
      {ActionCards.map((card) => (
        <div onClick={() => handlePlaceCards(card)} key={card.id}>
          <Card
            title={card.title}
            description={card.description}
            image={card.image}
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

      </div>
    </div>
  );
}
