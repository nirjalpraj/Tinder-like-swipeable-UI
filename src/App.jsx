import "./App.css";
import { users } from "./utils/constants";
import { useState } from "react";
import SwipeableCards from "./components/SwipableCards/SwipableCards";

const App = () => {
  const [swipeHistory, setSwipeHistory] = useState([]);
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

  const handleComplete = () => {
    alert(
      `Demo completed! You swiped through ${
        users.length
      } cards. You have swiped left ${
        swipeHistory.filter((entry) => entry.direction === "left").length
      } times and right ${
        swipeHistory.filter((entry) => entry.direction === "right").length
      } times.`
    );
  };

  return (
    <div className="main">
      <SwipeableCards
        users={users}
        onSwipeLeft={handleSwipeLeft}
        onSwipeRight={handleSwipeRight}
        onComplete={handleComplete}
        maxVisibleCards={maxVisibleCards}
        swipeThreshold={swipeThreshold}
      />
    </div>
  );
};

export default App;
