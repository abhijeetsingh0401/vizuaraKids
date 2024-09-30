"use client"

import React, { useState, useRef, useEffect } from 'react';

import { Box, Typography } from '@mui/material';

import { motion, AnimatePresence } from 'framer-motion';

import styled from 'styled-components';



const badges = [
  { id: 1, name: 'Ethics', image: '/badges/ethics.png', color: '#97375d' },
  { id: 2, name: 'Intelligence', image: '/badges/intelligence.png', color: '#5271ff' },
  { id: 3, name: 'SDG Goals', image: '/badges/sdg.png', color: '#00bf63' },
  { id: 4, name: 'Life Skills', image: '/badges/lifeskills.png', color: '#cb6ce6' },
  { id: 5, name: 'Creativity', image: '/badges/creativity.png', color: '#5ce1e6' },
];

const BadgeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const BadgeImage = styled(motion.img)`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  cursor: pointer;
  filter: ${({ active }) => (active ? 'none' : 'grayscale(100%)')};
`;

const BadgeModal = ({ badge, position }) => (
  <Box
    sx={{
      bgcolor: 'background.paper',
      borderRadius: '10px',
      borderColor: badge.color,
      borderWidth: '10px',
      borderStyle: 'solid',
      width: '300px',
      height: '150px',
      position: 'absolute',
      top: position.top,
      left: position.left,
      p: 2,
      zIndex: 1000,
    }}
  >
    <Typography variant="h6" sx={{ fontWeight: 'bold', color: badge.color }}>
      {badge.name}
    </Typography>
    <Typography variant="body1" sx={{ fontFamily: '"Comic Sans MS", cursive, sans-serif',color:'black' }}>
      Information about {badge.name} related to the current project.
    </Typography>
  </Box>
);

const BadgeDisplay = ({ activeBadges }) => {
  const [hoveredBadgeId, setHoveredBadgeId] = useState(null);
  const [badgePosition, setBadgePosition] = useState({ top: 0, left: 0 });
  const timeoutRef = useRef(null);
  const badgeRefs = useRef({}); // Use a ref to store each badge element

  const handleMouseEnter = (badgeId, event) => {
    if (activeBadges.includes(badgeId)) {
      clearTimeout(timeoutRef.current);

      const rect = badgeRefs.current[badgeId]?.getBoundingClientRect();
      if (rect) {
        setBadgePosition({
          top: rect.top + window.scrollY + 60, // Adjust the modal position slightly below the badge
          left: rect.left + window.scrollX + 60, // Adjust the modal position to the right of the badge
        });
      }

      setHoveredBadgeId(badgeId);
    }
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredBadgeId(null);
    }, 50); // Small delay to prevent flickering
  };

  return (
    <BadgeContainer>
      {badges.map((badge) => (
        <div
          key={badge.id}
          ref={(el) => (badgeRefs.current[badge.id] = el)} // Store the ref for each badge
          onMouseEnter={(event) => handleMouseEnter(badge.id, event)}
          onMouseLeave={handleMouseLeave}
        >
          <BadgeImage
            src={badge.image}
            alt={badge.name}
            active={activeBadges.includes(badge.id)}
            animate={{ scale: hoveredBadgeId === badge.id ? 1.2 : 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </div>
      ))}

      <AnimatePresence>
        {hoveredBadgeId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <BadgeModal badge={badges.find(b => b.id === hoveredBadgeId)} position={badgePosition} />
          </motion.div>
        )}
      </AnimatePresence>
    </BadgeContainer>
  );
};

export default BadgeDisplay;
