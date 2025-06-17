// src/components/HotelCard.jsx (veya nerede saklamak isterseniz)
import React from "react";

// Varsayılan bir yer tutucu resim URL'si
const DEFAULT_PLACEHOLDER_IMAGE =
  "https://via.placeholder.com/400x250.png?text=Image+Not+Available";

// Image URL'sinin geçerli olup olmadığını kontrol eden yardımcı fonksiyon
// AI'ın "example.com" URL'leri döndürme eğilimini dikkate alır
const isValidImageUrl = (url) => {
  return (
    url &&
    !url.includes("example.com") &&
    (url.startsWith("http://") || url.startsWith("https://"))
  );
};

export default function HotelCard({ hotel }) {
  return (
    <div className="border w-68 border-gray-200 rounded-lg p-4 shadow-md flex flex-col transform hover:scale-105 transition-transform duration-300 bg-white">
      <img
        src={
          isValidImageUrl(hotel.HotelImageURL)
            ? hotel.HotelImageURL
            : DEFAULT_PLACEHOLDER_IMAGE
        }
        alt={hotel.HotelName || "Hotel Image"}
        className="w-full h-40 object-cover rounded-md mb-3 border border-gray-100"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = DEFAULT_PLACEHOLDER_IMAGE;
        }} // Resim yüklenemezse varsayılana dön
      />
      <h3 className="text-xl font-bold text-gray-800 mb-1">
        {hotel.HotelName || "Unknown Hotel"}
      </h3>
      <p className="text-gray-600 text-sm mb-2">
        📍 {hotel["Hotel Address"] || "Address not available"}
      </p>
      <p className="text-gray-700 text-sm mt-2 line-clamp-3 mb-3">
        {hotel.Description || "No description provided."}
      </p>
      <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-100">
        <span className="font-semibold text-lg text-fuchsia-600">
          Price: {hotel.Price || "N/A"}
        </span>
        <span className="text-yellow-500 font-bold flex items-center">
          ⭐ {hotel.Rating || "N/A"} / 5
        </span>
      </div>
      {hotel.GeoCoordinates && (
        <a
          // GeoCoordinates'in obje {latitude, longitude} veya array [lat, lon] olma ihtimaline karşı kontrol
          href={`https://www.google.com/maps/search/?api=1&query=${
            Array.isArray(hotel.GeoCoordinates)
              ? hotel.GeoCoordinates[0]
              : hotel.GeoCoordinates.latitude
          },${
            Array.isArray(hotel.GeoCoordinates)
              ? hotel.GeoCoordinates[1]
              : hotel.GeoCoordinates.longitude
          }`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline text-sm mt-2 text-right"
        >
          View on Map 🗺️
        </a>
      )}
    </div>
  );
}
