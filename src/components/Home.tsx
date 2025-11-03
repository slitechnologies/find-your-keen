import { Link } from "react-router-dom";

const Home = () => (
  <div className="bg-gradient-to-b from-blue-50 to-white py-16 px-6">
    <div className="max-w-3xl mx-auto text-center space-y-8">
      <h1 className="text-5xl font-extrabold text-blue-700 tracking-tight">
        Find Your Keen
      </h1>

      <p className="text-lg text-gray-700 leading-relaxed">
        <strong>Find Your Keen</strong> is a humanitarian platform built for families, neighbors, and communities across Zimbabwe and beyond — to help reconnect with loved ones who’ve gone missing or been separated.
      </p>

      <p className="text-md text-gray-600">
        Unlike social media, we don’t chase likes or trends. We focus on what matters: <strong>real people, real stories, real reunions</strong>. Whether you’re searching for someone, sharing a lead, or just offering hope — you belong here.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
        <Link
          to="/directory"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          🔍 Browse Active Searches
        </Link>
        <Link
          to="/submit"
          className="bg-gray-100 text-blue-700 px-6 py-3 rounded-lg border hover:bg-gray-200 transition"
        >
          ✍️ Submit a New Case
        </Link>
      </div>

      <div className="mt-10 text-sm text-gray-500">
        Built with ❤️ by Sharp Turn Technologies. Every search matters.
      </div>
    </div>

    {/* 🔥 Healing Highlights Section */}
    <div className="max-w-6xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
      {/* Soccer Scores */}
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-xl font-bold text-blue-700 mb-2">⚽ Today’s Soccer Highlights</h3>
        <p className="text-sm text-gray-700 mb-2">
          Stay updated with live match results and fixtures from Zimbabwe and global leagues.
        </p>
        <a
          href="https://www.soccer24.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-sm"
        >
          View Live Scores →
        </a>
      </div>

      {/* Climate News */}
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-xl font-bold text-green-700 mb-2">🌍 Climate News</h3>
        <p className="text-sm text-gray-700 mb-2">
          Learn how communities are responding to climate change and building resilience.
        </p>
        <a
          href="https://www.cnn.com/climate"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 hover:underline text-sm"
        >
          Explore Climate Stories →
        </a>
      </div>

      {/* Harare Weather */}
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-xl font-bold text-blue-600 mb-2">🌦️ Harare Weather</h3>
        <p className="text-sm text-gray-700 mb-2">
          Mostly cloudy, 27°C. Wind SE at 19 km/h. Humidity 39%. UV Index 9.
        </p>
        <a
          href="https://a.msn.com/54/en-xl/ct-17.8318,31.0457?pageocid=weather-copilot-card"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-sm"
        >
          Full Forecast →
        </a>
      </div>

      {/* Bible Verse of the Day */}
      <div className="bg-white shadow rounded-lg p-4">
        <h3 className="text-xl font-bold text-purple-700 mb-2">📖 Verse of Hope</h3>
        <blockquote className="italic text-gray-700">
          “If my people… humble themselves and pray… I will heal their land.” — 2 Chronicles 7:14
        </blockquote>
        <a
          href="https://dailyverses.net/repentance"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-600 hover:underline text-sm mt-2 block"
        >
          More Verses →
        </a>
      </div>
    </div>
  </div>
);

export default Home;
