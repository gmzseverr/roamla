import { useState } from "react";

import "./App.css";
import Header from "./Header";
import Hero from "./Hero";
import Plan from "./Plan";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Hero />
      <Plan />
    </>
  );
}

export default App;
