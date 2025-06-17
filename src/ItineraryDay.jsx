import React from "react";

// Varsayılan bir yer tutucu resim URL'si
const DEFAULT_PLACE_IMAGE =
  "https://via.placeholder.com/150x150.png?text=Place+Image"; // Boyutu biraz büyütüldü

// Image URL'sinin geçerli olup olmadığını kontrol eden yardımcı fonksiyon
const isValidImageUrl = (url) => {
  return (
    url &&
    !url.includes("example.com") && // example.com veya placeholder.com içermediğinden emin olun
    !url.includes("placeholder.com") && // Placeholder resimlerini de geçersiz sayabiliriz
    (url.startsWith("http://") || url.startsWith("https://"))
  );
};

export default function ItineraryDay({ day, dayIndex }) {
  return (
    <div className="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
      <h3 className="text-xl sm:text-2xl font-bold text-fuchsia-700 dark:text-fuchsia-300 mb-4 flex items-center gap-2">
        Day {dayIndex + 1}: {day.day || "Explore"}
      </h3>
      <div className="space-y-6">
        {" "}
        {/* Boşluk biraz artırıldı */}
        {day.places && day.places.length > 0 ? (
          day.places.map((place, placeIndex) => (
            <div
              key={placeIndex}
              className="flex flex-col sm:flex-row items-start gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 shadow-sm" // Her yer için ayrı kart stili
            >
              <img
                src={
                  isValidImageUrl(place.placeImageUrl)
                    ? place.placeImageUrl
                    : DEFAULT_PLACE_IMAGE
                }
                alt={place.placeName || "Place Image"}
                className="w-full h-40 sm:w-32 sm:h-32 object-cover rounded-lg flex-shrink-0 border border-gray-200 dark:border-gray-600" // Boyutlar ve yuvarlaklık güncellendi
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = DEFAULT_PLACE_IMAGE;
                }} // Resim yüklenemezse varsayılana dön
              />
              <div className="flex-1">
                {" "}
                {/* Metin içeriğinin kalan alanı kaplamasını sağlar */}
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">
                  {place.placeName || "Unknown Place"}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                  {place.placeDetails || "No details provided."}
                </p>
                {place.ticketPricing && (
                  <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-1 mb-1">
                    <span className="text-fuchsia-600 dark:text-fuchsia-400">
                      💰
                    </span>{" "}
                    Ticket Price: {place.ticketPricing}
                  </p>
                )}
                {place.travelTimeBetweenLocations && (
                  <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-1 mb-1">
                    <span className="text-fuchsia-600 dark:text-fuchsia-400">
                      ⏰
                    </span>{" "}
                    Travel Time: {place.travelTimeBetweenLocations}
                  </p>
                )}
                {place.bestTime && (
                  <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-1 mb-2">
                    <span className="text-fuchsia-600 dark:text-fuchsia-400">
                      ☀️
                    </span>{" "}
                    Best Time to Visit: {place.bestTime}
                  </p>
                )}
                {place.GeoCoordinates && (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${
                      Array.isArray(place.GeoCoordinates)
                        ? `${place.GeoCoordinates[0]},${place.GeoCoordinates[1]}`
                        : `${place.GeoCoordinates.latitude},${place.GeoCoordinates.longitude}`
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fuchsia-600 hover:text-fuchsia-700 dark:text-fuchsia-400 dark:hover:text-fuchsia-300 hover:underline text-sm font-medium mt-2 inline-flex items-center gap-1"
                  >
                    View on Map <span className="text-lg">🗺️</span>
                  </a>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            No places planned for this day. Enjoy some free time!
          </p>
        )}
      </div>
    </div>
  );
}
