// src/TravelPlanResult.jsx
import React from "react";
import { Button } from "./components/ui/button"; // Buton bileşeninizin yolu doğru olduğundan emin olun
import ItineraryDay from "./ItineraryDay";
import HotelCard from "./HotelCard";

// Yeni oluşturduğumuz componentleri import ediyoruz
// Doğru yolu belirttiğinizden emin olun

export default function TravelPlanResult({ travelPlan, setShowResult }) {
  // onBack yerine setShowResult kullanıldı
  if (!travelPlan) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900">
        No travel plan available. Please go back and create a new one.
      </div>
    );
  }

  return (
    // Ana kapsayıcı, genel arka plan rengi ve ortalama
    <div className="min-h-screen flex items-start justify-center py-10 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-3xl w-full p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 text-gray-800 dark:text-gray-200 leading-tight">
          Your Dream Travel Plan! <span className="text-fuchsia-600">✈️</span>
        </h1>

        {/* Otel Seçenekleri */}
        <section className="mb-8 p-4 sm:p-6 rounded-lg border border-fuchsia-100 dark:border-fuchsia-900 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-fuchsia-700 dark:text-fuchsia-300 border-b pb-2 border-fuchsia-300 dark:border-fuchsia-800 flex items-center gap-2">
            Hotel Options <span className="text-3xl">🏨</span>
          </h2>
          {travelPlan.hotelOptions && travelPlan.hotelOptions.length > 0 ? (
            <div className="flex overflow-x-auto gap-2 py-2">
              {travelPlan.hotelOptions.map((hotel, index) => (
                <div
                  key={index}
                  className="min-w-[280px] sm:min-w-[320px] flex-shrink-0"
                >
                  <HotelCard hotel={hotel} />
                </div>
              ))}
              {travelPlan.hotelOptions.length > 3 && (
                <div className="flex-shrink-0 w-4">
                  {/* Sağa doğru kaydırmayı görsel olarak belirtmek için bir alan bırakılabilir */}
                </div>
              )}
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center italic hidden">
                *Hotel prices are estimates and may vary. Image URLs are
                placeholders and may not represent the actual hotel.
              </p>
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center">
              No hotel options found for your criteria.
            </p>
          )}
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-left italic">
            *Hotel prices are estimates and may vary. Image URLs are
            placeholders and may not represent the actual hotel.
          </p>
        </section>

        {/* Güzergah (Itinerary) */}
        <section className="mb-8 p-4 sm:p-6 rounded-lg border border-fuchsia-100 dark:border-fuchsia-900 shadow-sm">
          <h2 className="text-2xl font-bold mb-4 text-fuchsia-700 dark:text-fuchsia-300 border-b pb-2 border-fuchsia-300 dark:border-fuchsia-800 flex items-center gap-2">
            Itinerary <span className="text-3xl">🗓️</span>
          </h2>
          {travelPlan.itinerary && travelPlan.itinerary.length > 0 ? (
            travelPlan.itinerary.map((day, dayIndex) => (
              <ItineraryDay key={dayIndex} day={day} dayIndex={dayIndex} />
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center">
              No itinerary found for your trip.
            </p>
          )}
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-4 text-center italic">
            *Itinerary details like travel times and best times to visit are
            estimates. Always confirm local opening hours and transport options.
          </p>
        </section>

        <div className="text-center mt-10">
          <Button
            onClick={() => setShowResult(false)} // Geri dönme fonksiyonu güncellendi
            className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-4 focus:ring-fuchsia-300 dark:focus:ring-fuchsia-800"
          >
            ✨ Create New Plan
          </Button>
        </div>
      </div>
    </div>
  );
}
