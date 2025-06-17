import { useState } from "react";

import "./App.css";
import Header from "./Header";
import Hero from "./Hero";
import Plan from "./Plan";

function App() {
  const [showPlanPage, setShowPlanPage] = useState(false);

  const handleStartPlanning = () => {
    setShowPlanPage(true);
  };

  return (
    <>
      <Header />
      {!showPlanPage ? (
        <Hero onStartPlanning={handleStartPlanning} />
      ) : (
        <Plan />
      )}
    </>
  );
}

export default App;
