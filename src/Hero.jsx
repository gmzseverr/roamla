import React from "react";
import { Link } from "react-router";

function Hero({ onStartPlanning }) {
  return (
    <div className="flex flex-col items-center gap-4 text-center px-4 py-8 md:py-20 bg-gray-100 dark:bg-gray-900 min-h-screen justify-center">
      <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl text-gray-800 dark:text-gray-200 leading-tight">
        Plan Your Next Trip with <span className="text-fuchsia-600">AI</span>
      </h1>
      <p className="max-w-xl text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-6">
        Get AI-powered travel suggestions, budget-friendly stays, and
        personalized itineraries in seconds.
      </p>
      <Link to={"/plan"}>
        <button
          onClick={onStartPlanning}
          className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-semibold
           py-3 px-8 rounded-full cursor-pointer text-lg
           transition-colors duration-300 ease-in-out shadow-lg
           focus:outline-none focus:ring-4 focus:ring-fuchsia-300 dark:focus:ring-fuchsia-800"
        >
          Start Planning
        </button>
      </Link>
    </div>
  );
}

export default Hero;
