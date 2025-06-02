import React, { useEffect, useState } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import { Input } from "./components/ui/input";
import { SelectTravelersList, budgetOptions } from "./constants/options";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

export default function Plan() {
  const { ref } = usePlacesWidget({
    apiKey: GOOGLE_MAPS_API_KEY,
    onPlaceSelected: (place) => {
      console.log("Selected place:", place);
    },
    options: {
      types: ["(cities)"],
    },
  });

  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className="max-w-md mx-auto mt-10 space-y-6">
      <h2 className="text-xl font-semibold">What is your dream destination?</h2>

      <Input
        ref={ref}
        placeholder="Search city"
        className="border border-gray-300 p-3 rounded-md text-base"
      />

      <div>
        <label className="block mb-1 font-medium">
          How long do you want to stay? (days)
        </label>
        <Input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="Enter number of days"
          className="border border-gray-300 p-3 rounded-md text-base"
          min={1}
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">What's your budget?</label>
        <div className="flex gap-6 ">
          {budgetOptions.map(({ id, label, description, value }) => (
            <div key={id} className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => setBudget(value)}
                className={`px-4 py-2 rounded-md border cursor-pointer flex flex-col ${
                  budget === value
                    ? "bg-fuchsia-200  text-white border-bg-fuchsia-200 "
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                } transition-colors`}
              >
                <h2 className="font-bold">{label}</h2>
                <small className="text-gray-500 mt-1 text-xs text-center max-w-[100px]">
                  {description}
                </small>
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Who do you want to go with on your next adventure?
        </label>
        <div className="flex flex-col gap-3">
          {SelectTravelersList.map(({ id, title, desc, icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setCompanions(title)}
              className={`flex items-start cursor-pointer gap-3 p-3 rounded-md border transition-colors ${
                companions === title
                  ? "bg-fuchsia-200 text-white border-green-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              <span className="text-2xl">{icon}</span>
              <div className="text-left">
                <div className="font-semibold">{title}</div>
                <div className="text-sm opacity-70">{desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
