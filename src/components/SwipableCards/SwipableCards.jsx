"use client";

import { useState, useCallback } from "react";
import "./SwipableCards.css";
import Card from "../Card/Card";

const SwipeableCards = ({
  users,
  onSwipeLeft,
  onSwipeRight,
  onComplete,
  maxVisibleCards = 3,
  swipeThreshold = 100,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSwipeLeft = useCallback(
    (user) => {
      if (isAnimating) return;

      setIsAnimating(true);

      onSwipeLeft?.(user);

      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setIsAnimating(false);

        if (currentIndex + 1 >= users.length) {
          onComplete?.();
        }
      }, 300);
    },
    [currentIndex, users.length, onSwipeLeft, onComplete, isAnimating]
  );

  const handleSwipeRight = useCallback(
    (user) => {
      if (isAnimating) return;

      setIsAnimating(true);

      onSwipeRight?.(user);

      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setIsAnimating(false);
        if (currentIndex + 1 >= users.length) {
          onComplete?.();
        }
      }, 300);
    },
    [currentIndex, users.length, onSwipeRight, onComplete, isAnimating]
  );

  return (
    <div
      className={`swipeable-cards`}
      //   onKeyDown={handleKeyDown}
      tabIndex={0}
      role="application"
      aria-label="Swipeable cards interface"
    >
      <div className="swipeable-cards__stack">
        {users
          .slice(currentIndex, currentIndex + maxVisibleCards)
          .map((user, index) => (
            <Card
              key={user.id}
              user={user}
              index={index}
              isTopCard={index === 0}
              onSwipeLeft={() => handleSwipeLeft(user)}
              onSwipeRight={() => handleSwipeRight(user)}
              disabled={isAnimating}
              swipeThreshold={swipeThreshold}
            />
          ))}
      </div>
    </div>
  );
};

export default SwipeableCards;
