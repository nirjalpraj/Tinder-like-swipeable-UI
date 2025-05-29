import React, { useState, useRef, useEffect } from "react";
import "./Card.css";
import { users } from "../../utils/constants";

const Card = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragStart]);

  return (
    <div
      ref={cardRef}
      className={`card ${isDragging ? "dragging" : ""}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        position: "relative",
      }}
      onMouseDown={handleMouseDown}
    >
      <img src={users[0].image} alt="Placeholder" />
      <h1>Jane Doe</h1>
    </div>
  );
};

export default Card;
