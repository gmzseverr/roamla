// options.js
export const SelectTravelersList = [
  {
    id: 1,
    title: "Just Me",
    desc: "Perfect for solo adventures and self-discovery.",
    icon: "🧳",
    people: "1 Person",
  },
  {
    id: 2,
    title: "Couple",
    desc: "Ideal for two travelers exploring together.",
    icon: "💑",
    people: "2 People",
  },
  {
    id: 3,
    title: "Family",
    desc: "Great for groups of 3 to 5, full of fun and memories.",
    icon: "👨‍👩‍👧‍👦",
    people: "3 to 5 People",
  },
];

export const budgetOptions = [
  {
    id: 1,
    label: "Low",
    description: "Budget-friendly options for thrifty travelers",
    value: "low",
  },
  {
    id: 2,
    label: "Medium",
    description: "Balanced budget for a comfortable trip",
    value: "medium",
  },
  {
    id: 3,
    label: "High",
    description: "For those who want to splurge and enjoy luxury",
    value: "high",
  },
];

export const AI_PROMPT = `Generate Travel Plan for Location: {location}, for {totalDays} days, for {travelers} traveler(s) with a {budget} budget.
Provide a list of hotel options. For each hotel, include: HotelName, Hotel Address, Price (e.g., "$$"), Hotel Image URL, Geo Coordinates (latitude, longitude), Rating (out of 5), and a brief Description.
Also, suggest a daily itinerary. For each day, list places to visit. For each place, include: placeName, placeDetails, placeImageUrl, Geo Coordinates (latitude, longitude), ticket Pricing (if applicable, e.g., "$10" or "Free"), travel time between locations (e.g., "15 mins drive"), and the best time to visit (e.g., "Morning").
Your response MUST be a valid JSON object. Do NOT include any markdown code block fences (like \`\`\`json) or any additional explanatory text, notes, or disclaimers outside the JSON object.
The JSON object MUST have two main keys: "hotelOptions" (an array of hotel objects) and "itinerary" (an array of daily itinerary objects).`;

export function getPrompt(location, totalDays, travelers, budget) {
  return AI_PROMPT.replace("{location}", location)
    .replace("{totalDays}", totalDays)
    .replace("{travelers}", travelers)
    .replace("{budget}", budget);
}

export function parseGeminiJsonResponse(responseText) {
  let jsonStr = responseText.trim(); // Baştaki ve sondaki tüm boşlukları temizle

  // Regex'i daha esnek ve güçlü hale getiriyoruz:
  // ^``` : Satırın başında "```" ile başla
  // (\w*)?: Opsiyonel olarak bir dil adı (örn: json, javascript)
  // \s*\n? : Opsiyonel boşluklar ve yeni satır karakteri
  // ([\s\S]*?) : JSON içeriğini tembelce yakala.
  //             `[\s\S]` boşluklar dahil tüm karakterleri eşleştirmek için kullanılır,
  //             böylece JSON içindeki yeni satırları da sorunsuz eşleştirebiliriz.
  // \n?\s*```$ : Opsiyonel yeni satır, boşluklar ve satır sonunda "```" ile bitir.
  // `s` bayrağı: Dotall modu, `.` karakterinin yeni satır karakterlerini de eşleştirmesini sağlar.
  const fenceRegex = /^```(\w*)?\s*\n?([\s\S]*?)\n?\s*```$/s;

  const match = jsonStr.match(fenceRegex);

  if (match && match[2]) {
    // Gerçek JSON içeriği ikinci yakalama grubunda (`match[2]`) yer alır.
    jsonStr = match[2].trim(); // Yakalanan JSON içeriğini al ve tekrar trimle
  } else {
    // Eğer regex bir kod bloğu eşleşmezse, AI doğrudan JSON döndürmüş olabilir.
    // Bu durumda `jsonStr` olduğu gibi kalır.
    console.warn(
      "AI response might not be wrapped in a markdown code block. Attempting direct JSON parse."
    );
    // Ek bilgi için, eğer bu uyarıyı sıkça alırsanız, AI prompt'unuzu kontrol edin.
  }

  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error(
      "Failed to parse JSON response:",
      e,
      "\n--- Raw response (after fence removal attempt) ---\n",
      jsonStr, // Regex sonrası kalan string'i göster
      "\n--- Original raw response ---\n",
      responseText
    );
    throw new Error(
      "The AI returned an unexpected response format. Please try again, or simplify your request."
    );
  }
}
