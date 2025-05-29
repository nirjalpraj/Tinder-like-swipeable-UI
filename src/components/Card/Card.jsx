import { useState, useRef, useEffect } from "react";
import "./Card.css";
import { useCallback } from "react";

const Card = ({
  user,
  index,
  isTopCard,
  onSwipeLeft,
  onSwipeRight,
  disabled = false,
  swipeThreshold = 100,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const MAX_ROTATION = 15; // Maximum rotation in degrees
  const OPACITY_FACTOR = 200; // Distance for opacity calculation

  const getRotation = useCallback(() => {
    if (!cardRef.current) return 0;
    const cardWidth = cardRef.current.offsetWidth;
    return (dragOffset.x / cardWidth) * MAX_ROTATION;
  }, [dragOffset.x]);

  const getOpacity = useCallback(() => {
    if (!isTopCard) return 1 - index * 0.1;
    return Math.max(0.7, 1 - Math.abs(dragOffset.x) / OPACITY_FACTOR);
  }, [dragOffset.x, isTopCard, index]);

  const handleSwipeEnd = useCallback(() => {
    if (Math.abs(dragOffset.x) > swipeThreshold) {
      if (dragOffset.x > 0) {
        onSwipeRight();
      } else {
        onSwipeLeft();
      }
    } else {
      // Snap back to center if threshold not met
      setDragOffset({ x: 0, y: 0 });
    }
  }, [dragOffset.x, swipeThreshold, onSwipeLeft, onSwipeRight]);

  const handleMouseDown = useCallback(
    (event) => {
      if (!isTopCard || disabled) return;

      event.preventDefault();
      setIsDragging(true);
      setDragStart({ x: event.clientX, y: event.clientY });

      // Add cursor style
      document.body.style.cursor = "grabbing";
    },
    [isTopCard, disabled]
  );

  const handleTouchStart = useCallback(
    (event) => {
      if (!isTopCard || disabled) return;

      const touch = event.touches[0];
      setIsDragging(true);
      setDragStart({ x: touch.clientX, y: touch.clientY });
    },
    [isTopCard, disabled]
  );

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (event) => {
      if (!isDragging || disabled) return;

      const deltaX = event.clientX - dragStart.x;
      const deltaY = event.clientY - dragStart.y;

      setDragOffset({ x: deltaX, y: deltaY });
    };

    const handleMouseUp = () => {
      if (!isDragging || disabled) return;

      setIsDragging(false);
      handleSwipeEnd();

      // Reset cursor
      document.body.style.cursor = "";
    };

    const handleTouchMove = (event) => {
      if (!isDragging || disabled) return;

      event.preventDefault(); // Prevent scrolling
      const touch = event.touches[0];
      const deltaX = touch.clientX - dragStart.x;
      const deltaY = touch.clientY - dragStart.y;

      setDragOffset({ x: deltaX, y: deltaY });
    };

    const handleTouchEnd = () => {
      if (!isDragging || disabled) return;

      setIsDragging(false);
      handleSwipeEnd();
    };

    // Add global event listeners
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);

    // Cleanup function
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      document.body.style.cursor = "";
    };
  }, [isDragging, dragStart, disabled, handleSwipeEnd]);

  const rotation = getRotation();
  const opacity = getOpacity();

  const cardStyle = {
    transform: `
      translateX(${dragOffset.x}px) 
      translateY(${dragOffset.y * 0.1}px) 
      rotate(${rotation}deg) 
      scale(${1 - index * 0.05})
    `,
    opacity,
    zIndex: 10 - index,
  };

  return (
    <div
      ref={cardRef}
      className={`card  ${isDragging ? "card--dragging" : ""} ${
        isTopCard ? "card--top" : ""
      }`}
      style={cardStyle}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      role="img"
      aria-label={user.name}
      tabIndex={isTopCard ? 0 : -1}
    >
      <img
        src={user.image || "/placeholder.svg"}
        alt={`${user.name}'s photo`}
        draggable={false}
        loading={index === 0 ? "eager" : "lazy"}
      />
      <h3>{user.name}</h3>
    </div>
  );
};

export default Card;
