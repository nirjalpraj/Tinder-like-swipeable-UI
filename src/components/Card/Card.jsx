import React, { useState, useRef, useEffect } from "react";
import "./Card.css";
import { users } from "../../utils/constants";

const Card = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseDown = (e) => {
    //  if (!isTop) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    // onDragStart && onDragStart();
  };

  const handleTouchStart = (e) => {
    // if (!isTop) return;
    setIsDragging(true);
    const touch = e.touches[0];
    setDragStart({ x: touch.clientX, y: touch.clientY });
    // onDragStart && onDragStart();
  };

  const handleMouseMove = (e) => {
    if (
      !isDragging
      // ||
      // !isTop
    )
      return;
    const offset = {
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    };
    setDragOffset(offset);
  };

  /**
   * Handle touch move event
   */
  const handleTouchMove = (e) => {
    if (
      !isDragging
      // | !isTop
    )
      return;
    e.preventDefault();
    const touch = e.touches[0];
    const offset = {
      x: touch.clientX - dragStart.x,
      y: touch.clientY - dragStart.y,
    };
    setDragOffset(offset);
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e) => handleMouseMove(e);
    const handleGlobalTouchMove = (e) => handleTouchMove(e);
    const handleGlobalMouseUp = () => {};
    const handleGlobalTouchEnd = () => {};

    if (isDragging) {
      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("touchmove", handleGlobalTouchMove, {
        passive: false,
      });
      document.addEventListener("mouseup", handleGlobalMouseUp);
      document.addEventListener("touchend", handleGlobalTouchEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("touchmove", handleGlobalTouchMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
      document.removeEventListener("touchend", handleGlobalTouchEnd);
    };
  }, [isDragging, dragOffset.x, dragOffset.y]);

  const rotation = dragOffset.x * 0.1;
  const opacity = Math.max(0.7, 1 - Math.abs(dragOffset.x) / 200);

  return (
    <div
      ref={cardRef}
      className={`card ${isDragging ? "dragging" : ""} `}
      style={{
        transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${rotation}deg)`,
        opacity,
        zIndex: 10,
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      <img src={users[0].image} alt="Placeholder" />
      <h1>Jane Doe</h1>
    </div>
  );
};

export default Card;
