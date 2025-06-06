import "./App.css";
import { users } from "./utils/constants";
import { useState } from "react";
import SwipeableCards from "./components/SwipableCards/SwipableCards";
import { useTheme } from "./utils/ThemeContext";

const App = () => {
  const [swipeHistory, setSwipeHistory] = useState([]);
  const { theme, toggleTheme } = useTheme();
  const swipeThreshold = 100;
  const maxVisibleCards = 3;

  const handleSwipeLeft = (user) => {
    const entry = {
      user,
      direction: "left",
      timestamp: new Date(),
    };
    setSwipeHistory((prev) => [...prev, entry]);
    console.log(`Passed on ${user.name}`);
  };

  const handleSwipeRight = (user) => {
    const entry = {
      user,
      direction: "right",
      timestamp: new Date(),
    };
    setSwipeHistory((prev) => [...prev, entry]);
  };

  const resetSwipeHistory = () => {
    setSwipeHistory([]);
  };

  return (
    <div className={`app-container ${theme}`}>
      <button onClick={toggleTheme} className="theme-toggle-button">
        Switch to {theme === "light" ? "Dark" : "Light"} Theme
      </button>
      <div className="swipe-counter">
        <div className="display-button-left">
          Pass:{" "}
          {swipeHistory.filter((entry) => entry.direction === "left").length}
        </div>
        <div className="display-button-right">
          Like:{" "}
          {swipeHistory.filter((entry) => entry.direction === "right").length}
        </div>
      </div>
      <div className="main">
        <SwipeableCards
          resetSwipeHistory={resetSwipeHistory}
          users={users}
          onSwipeLeft={handleSwipeLeft}
          onSwipeRight={handleSwipeRight}
          maxVisibleCards={maxVisibleCards}
          swipeThreshold={swipeThreshold}
        />
      </div>
    </div>
  );
};

export default App;
