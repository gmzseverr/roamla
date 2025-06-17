export function Accordion({ day, index }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border border-gray-300 rounded-lg shadow-sm">
      <button
        className="w-full text-left px-4 py-3 bg-gray-100 hover:bg-gray-200 font-medium rounded-t-lg flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          Day {index + 1}: {day.title || "Itinerary"}
        </span>
        <span className="text-xl">{isOpen ? "−" : "+"}</span>
      </button>

      {isOpen && (
        <div className="px-4 py-3 bg-white rounded-b-lg">
          <p className="text-sm whitespace-pre-wrap">{day.description}</p>
        </div>
      )}
    </div>
  );
}
