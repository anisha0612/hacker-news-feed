import React from "react";
import Stories from "./components/Stories/Stories.jsx";
import { StoryProvider } from "./components/StoryContext.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className='App'>
      <StoryProvider>
        <Stories />
      </StoryProvider>
    </div>
  );
}

export default App;
