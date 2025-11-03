import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface PersonEntry {
  id: string;
  name: string;
  image?: string;
  description: string;
  contact: {
    email: string;
    phone?: string;
    social?: string;
  };
  status: "missing" | "found";
  submittedAt: string;
}

const SearchDirectory = () => {
  const [entries, setEntries] = useState<PersonEntry[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/data/searches.json")
      .then((res) => res.json())
      .then((data) =>
        setEntries(data.filter((e: PersonEntry) => e.status === "missing"))
      );
  }, []);

  const filtered = entries.filter(
    (e) =>
      e.name.toLowerCase().includes(query.toLowerCase()) ||
      e.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        Search Directory
      </h2>

      {/* 🔍 Search Field */}
      <div className="mb-8 text-center">
        <input
          type="text"
          placeholder="Search by name or description..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full sm:w-96 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>

      {/* 🧾 Results */}
      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">No matches found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((entry) => (
            <div
              key={entry.id}
              className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
            >
              {entry.image && (
                <img
                  src={entry.image}
                  alt={entry.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-blue-700">
                    {entry.name}
                  </h3>
                  <p className="text-sm text-gray-700 mt-2">
                    {entry.description}
                  </p>
                </div>
                <div className="mt-4">
                  <span className="inline-block px-3 py-1 rounded text-white text-xs bg-yellow-500">
                    Missing
                  </span>
                  <Link
                    to={`/profile/${entry.id}`}
                    className="mt-3 block bg-blue-600 text-white text-center px-4 py-2 rounded hover:bg-blue-700 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchDirectory;
