import { useState, useCallback } from "react";
import "./SwipableCards.css";
import Card from "../Card/Card";

const SwipeableCards = ({
  resetSwipeHistory,
  users,
  onSwipeLeft,
  onSwipeRight,
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
      }, 300);
    },
    [currentIndex, users.length, onSwipeLeft, isAnimating]
  );

  const handleSwipeRight = useCallback(
    (user) => {
      if (isAnimating) return;

      setIsAnimating(true);

      onSwipeRight?.(user);

      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setIsAnimating(false);
      }, 300);
    },
    [currentIndex, users.length, onSwipeRight, isAnimating]
  );

  const resetCards = useCallback(() => {
    setCurrentIndex(0);
    resetSwipeHistory();
    setIsAnimating(false);
  }, []);

  if (currentIndex >= users.length) {
    return (
      <div className="completion-screen">
        <div
          className="completion-screen__emoji"
          role="img"
          aria-label="Party emoji"
        >
          🎉
        </div>
        <h2 className="completion-screen__title">All Done!</h2>
        <p className="completion-screen__subtitle">
          You've swiped through all {users.length} cards
        </p>

        {/* Reset button */}
        <button
          onClick={resetCards}
          className="completion-screen__reset-btn"
          aria-label="Start over with all cards"
        >
          Start Over
        </button>
      </div>
    );
  }

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
