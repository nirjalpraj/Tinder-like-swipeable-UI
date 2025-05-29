# Tinder-like Swipeable UI Component (React + Vanilla JavaScript)

A fully reusable, customizable React component that provides Tinder-like swipe functionality using **pure vanilla JavaScript** for gesture detection and **standard CSS** for styling. No external libraries required for core functionality.

## 📦 Installation & Setup

### Prerequisites

- Node.js 18+
- React 18+

### Quick Start

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install

   # or

   yarn install

   # or

   pnpm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev

   # or

   yarn dev

   # or

   pnpm dev
   \`\`\`

4. **Open your browser**
   - Main demo: \`http://localhost:5173\`

## 🎮 Usage

### Basic Implementation

\`\`\`jsx
import SwipeableCards from '@/components/SwipeableCards'

const users = [
{
id: 1,
name: "John Doe",
image: "/path/to/image.jpg",
age: 25,
location: "New York, NY"
},
// ... more users
]

function App() {
const handleSwipeLeft = (user) => {
console.log('Passed on:', user.name)
// Add your logic here (API calls, analytics, etc.)
}

const handleSwipeRight = (user) => {
console.log('Liked:', user.name)
// Add your logic here (API calls, analytics, etc.)
}

const handleComplete = () => {
console.log('All cards swiped!')
// Handle completion (load more cards, show results, etc.)
}

return (
<SwipeableCards
      users={users}
      onSwipeLeft={handleSwipeLeft}
      onSwipeRight={handleSwipeRight}
      onComplete={handleComplete}
      theme="default"
    />
)
}
\`\`\`

### Advanced Configuration

\`\`\`jsx
<SwipeableCards
resetSwipeHistory={resetSwipeHistory}
users={users}
onSwipeLeft={handleSwipeLeft}
onSwipeRight={handleSwipeRight}
onComplete={handleComplete}
maxVisibleCards={3} // Number of cards in stack (1-5)
swipeThreshold={120} // Pixels to trigger swipe (50-200)
/>
\`\`\`

## 📋 API Reference

### SwipeableCards Props

| Prop             | Type         | Default       | Description                            |
| ---------------- | ------------ | ------------- | -------------------------------------- |
| \`users\`        | \`Array\`    | **Required**  | Array of user objects to display       |
| \`onSwipeLeft\`  | \`Function\` | \`undefined\` | Callback when user swipes left (pass)  |
| \`onSwipeRight\` | \`Function\` | \`undefined\` | Callback when user swipes right (like) |
| \`onComplete\`   | \`Function\` | \`undefined\` | Callback when all cards are swiped     |

| \`maxVisibleCards\` | \`Number\` | \`3\` | Cards visible in stack (1-5) |
| \`swipeThreshold\` | \`Number\` | \`100\` | Pixels to trigger swipe (50-200) |
| \`resetswipehistory\` | \`Function\` | \`undefined\` | function to reset swipe history |

### User Object Structure

\`\`\`javascript
const user = {
id: 1, // Unique identifier (required)
name: "John Doe", // User's display name (required)
image: "/path.jpg", // URL to user's image (required)
}
\`\`\`
