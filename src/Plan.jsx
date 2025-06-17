import React, { useEffect, useState } from "react";

import { usePlacesWidget } from "react-google-autocomplete";

import { Input } from "./components/ui/input";

import { Button } from "./components/ui/button";

import { toast } from "sonner";

import { GoogleGenerativeAI } from "@google/generative-ai";

// constants yerine options.js'den import ediyoruz

import {
  SelectTravelersList,
  budgetOptions,
  getPrompt,
  parseGeminiJsonResponse,
} from "./options"; // options.js yolunuza göre güncelleyin

// TravelPlanResult component'ini import etmeyi unutmayın

// Kendi dosyanızın yoluna göre güncelleyin

import TravelPlanResult from "./TravelPlanResult"; // <-- Bu satırı ekledim veya doğruladım

const Maps_API_KEY = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

const GOOGLE_GENAI_API_KEY = import.meta.env.VITE_GOOGLE_GENAI_API_KEY;

// API anahtarının mevcut olduğundan emin olmak için kontrol

if (!GOOGLE_GENAI_API_KEY) {
  console.error("VITE_GOOGLE_GENAI_API_KEY is not set.");

  toast.error(
    "Google Generative AI API Key is missing. Please check your .env file."
  );
}

const genAI = new GoogleGenerativeAI(GOOGLE_GENAI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

export default function Plan() {
  const [isLoading, setIsLoading] = useState(false);

  const [travelPlan, setTravelPlan] = useState(null);

  const [showResult, setShowResult] = useState(false);

  const [formData, setFormData] = useState({
    location: "",

    noOfDays: "",

    budget: "",

    traveler: "",
  });

  const { ref: locationRef } = usePlacesWidget({
    apiKey: Maps_API_KEY,

    onPlaceSelected: (place) => {
      const selectedCity = place?.formatted_address || place?.name || "";

      setFormData((prev) => ({
        ...prev,

        location: selectedCity,
      }));

      console.log("Selected place:", selectedCity);
    },

    options: {
      types: ["(cities)"], // Sadece şehirleri arat
    },
  });

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,

      [name]: value,
    }));
  };

  // FormData güncellemelerini görmek için useEffect

  useEffect(() => {
    console.log("FormData updated:", formData);
  }, [formData]);

  const onGenerateTrip = async () => {
    const { location, noOfDays, budget, traveler } = formData;

    // Alan doğrulama

    if (!location || !noOfDays || !budget || !traveler) {
      return toast.error(
        "Please fill in all the details to generate your trip plan."
      );
    }

    if (parseInt(noOfDays) <= 0) {
      return toast.error("Number of days must be at least 1.");
    }

    const prompt = getPrompt(location, noOfDays, traveler, budget);

    console.log("Generated Prompt:", prompt);

    try {
      setIsLoading(true);

      setTravelPlan(null); // Yeni bir plan oluşturmadan önce eski planı temizle

      const result = await model.generateContent(prompt);

      const response = await result.response;

      const text = response.text();

      console.log("Raw API Response Text:", text);

      const parsedPlan = parseGeminiJsonResponse(text);

      setTravelPlan(parsedPlan);

      setShowResult(true); // Sonuç ekranını aç
    } catch (error) {
      console.error("Error generating travel plan:", error);

      // Hata mesajını daha spesifik hale getirebiliriz

      if (error.message.includes("JSON")) {
        toast.error(
          "Failed to parse AI response. The generated plan might be in an invalid format. Please try again."
        );
      } else if (error.message.includes("quota")) {
        toast.error(
          "API quota exceeded. Please try again later or check your API key."
        );
      } else {
        toast.error(
          "An unexpected error occurred while generating the plan. Please try again."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  // showResult true ise TravelPlanResult bileşenini göster

  // Bu kısım render metodu içinde olmalı

  if (showResult && travelPlan) {
    return (
      <TravelPlanResult travelPlan={travelPlan} setShowResult={setShowResult} />
    );
  }

  // Form ekranı

  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-800 dark:text-gray-200">
          Plan Your Dream Trip
        </h2>

        {/* Destination Input */}

        <div className="mb-4">
          <label
            htmlFor="location"
            className="block text-gray-700 text-sm font-semibold mb-2"
          >
            What is your dream destination?
          </label>

          <Input
            id="location"
            ref={locationRef}
            placeholder="e.g., Paris, Tokyo, Istanbul"
            className="border border-gray-300 p-3 rounded-md w-full focus:ring-fuchsia-500 focus:border-fuchsia-500 text-base"
          />
        </div>

        {/* Stay Duration */}

        <div className="mb-4">
          <label
            htmlFor="noOfDays"
            className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2"
          >
            How long do you want to stay? (days)
          </label>

          <Input
            id="noOfDays"
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
            placeholder="e.g., 3, 7, 10"
            className="border border-gray-300 dark:border-gray-600 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 text-base bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            min={1}
            value={formData.noOfDays}
          />
        </div>

        {/* Budget Selection */}
        <div className="mb-8">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-3">
            What's your budget?
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {budgetOptions.map(({ id, label, description, value }) => (
              <button
                key={id}
                type="button"
                onClick={() => handleInputChange("budget", value)}
                className={`p-4 rounded-lg border-2 cursor-pointer flex flex-col items-center text-center transition-all duration-200 ease-in-out shadow-sm
                  ${
                    formData.budget === value
                      ? "bg-fuchsia-100 dark:bg-fuchsia-900 border-fuchsia-500 text-fuchsia-800 dark:text-fuchsia-200 font-semibold"
                      : "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-fuchsia-300 dark:hover:border-fuchsia-700"
                  }`}
              >
                <h3 className="font-bold text-lg mb-1">{label}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs">
                  {description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Traveler Selection */}

        <div className="mb-8">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-3">
            Who do you want to go with on your next adventure?
          </label>
          <div className="grid grid-cols-1 gap-4">
            {SelectTravelersList.map(({ id, title, desc, icon, people }) => (
              <button
                key={id}
                type="button"
                onClick={() => handleInputChange("traveler", people)}
                className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all duration-200 ease-in-out shadow-sm
                  ${
                    formData.traveler === people
                      ? "bg-fuchsia-100 dark:bg-fuchsia-900 border-fuchsia-500 text-fuchsia-800 dark:text-fuchsia-200 font-semibold"
                      : "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 hover:border-fuchsia-300 dark:hover:border-fuchsia-700"
                  }`}
              >
                <span className="text-3xl">{icon}</span>
                <div className="text-left">
                  <h3 className="font-semibold text-lg">{title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {desc}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Generate Trip Button */}

        <Button
          onClick={onGenerateTrip}
          disabled={isLoading}
          className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-3 px-4 rounded-md transition-colors duration-200 flex items-center justify-center text-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-fuchsia-300 dark:focus:ring-fuchsia-800"
        >
          {isLoading ? (
            <>
              {/* Yükleme göstergesi */}
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Generating Your Trip...
            </>
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>
    </div>
  );
}
