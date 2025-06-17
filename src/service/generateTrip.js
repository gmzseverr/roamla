import { GoogleGenAI } from "@google/genai";

const PROMPT_TEMPLATE = (
  location,
  totalDays,
  travelers,
  budget
) => `Generate a Travel Plan for Location: "${location}", for ${totalDays} days, for ${travelers} traveler(s) with a "${budget}" budget.
Provide the response as a single, valid JSON object. Do not include any text outside the JSON structure.
The JSON object should follow this structure:
{
  "hotels": [
    {
      "HotelName": "string",
      "HotelAddress": "string",
      "Price": "string (e.g., '$100-$200 per night')",
      "HotelImageURL": "string_url (or null if not available)",
      "GeoCoordinates": { "latitude": number, "longitude": number (or null if not available) },
      "Rating": "string (e.g., '4.5/5')",
      "Description": "string"
    }
  ],
  "itinerary": [
    {
      "day": "number (e.g., 1)",
      "activities": [
        {
          "placeName": "string",
          "placeDetails": "string",
          "placeImageURL": "string_url (or null if not available)",
          "GeoCoordinates": { "latitude": number, "longitude": number (or null if not available) },
          "ticketPricing": "string (e.g., '$20' or 'Free')",
          "travelTimeBetweenLocations": "string (e.g., '15 mins by car to next activity, or N/A if first/last activity of day')",
          "bestTimeToVisit": "string (e.g., 'Morning', '9 AM - 11 AM')"
        }
      ]
    }
  ]
}
If multiple hotel options are suitable, provide up to 3. For itinerary, provide a plan for each day specified.
If an image URL or GeoCoordinates are not found or applicable, use null. Ensure all string values are appropriately escaped within the JSON.
`;

export const generateTrip = async ({
  location,
  totalDays,
  travelers,
  budget,
}) => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY is missing in environment variables");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = PROMPT_TEMPLATE(location, totalDays, travelers, budget);

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-04-17",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  let jsonStr = response.text.trim();
  const fenced = jsonStr.match(/^```(?:json)?\s*(.*?)\s*```$/s);
  if (fenced && fenced[1]) {
    jsonStr = fenced[1];
  }

  try {
    const parsed = JSON.parse(jsonStr);
    return parsed;
  } catch (err) {
    console.error("JSON parse error:", err);
    throw new Error(
      "The travel plan could not be parsed. Raw output: " +
        jsonStr.slice(0, 100) +
        "..."
    );
  }
};
