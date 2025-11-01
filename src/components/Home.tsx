import { Link } from 'react-router-dom';

const Home = () => (
  <div className="bg-gradient-to-b from-blue-50 to-white py-16 px-6 text-center">
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="text-5xl font-extrabold text-blue-700 tracking-tight">Find Your Keen</h1>
      <p className="text-lg text-gray-700 leading-relaxed">
        A humanitarian platform to reconnect families across Zimbabwe and beyond. Submit a missing person case, browse active searches, and share leads that bring loved ones home.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
        <Link
          to="/directory"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          🔍 Browse Directory
        </Link>
        <Link
          to="/submit"
          className="bg-gray-100 text-blue-700 px-6 py-3 rounded-lg border hover:bg-gray-200 transition"
        >
          ✍️ Submit a Search
        </Link>
      </div>

      <div className="mt-10 text-sm text-gray-500">
        Built with ❤️ by Sharp Turn Technologies. Every search matters.
      </div>
    </div>
  </div>
);

export default Home;
