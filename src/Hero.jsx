import React from "react";
import { Link } from "react-router";

function Hero() {
  return (
    <div className="text-[#8C1AF6] flex flex-col items-center gap-2 ">
      <h1 className="font-bold text-4xl">Plan Your Next Trip with AI</h1>
      <p className="">
        Get AI-powered travel suggestions, budget-friendly stays, and
        personalized itineraries in seconds.
      </p>
      <Link to={"/plan"}>
        <button className="bg-[#8C1AF6] font-semibold text-white w-fit py-2 px-4 rounded-3xl cursor-pointer">
          Start Planning
        </button>
      </Link>
    </div>
  );
}

export default Hero;
