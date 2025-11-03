import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Header = () => {
  const { pathname } = useLocation();
  const [adminOpen, setAdminOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const [searchQuery, setSearchQuery] = useState('');

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Directory', path: '/directory' },
    { label: 'Stories', path: '/stories' },
  ];

  const adminItems = [
    { label: 'Dashboard', path: '/admin' },
    { label: 'Leads', path: '/admin/leads' },
    { label: 'Reviews', path: '/stories' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
        {/* Logo + Mission */}
        <div className="text-center sm:text-left">
          <Link to="/" className="text-2xl font-bold tracking-tight hover:opacity-90 block">
            🔍 Find Your Keen
          </Link>
          <p className="text-xs text-blue-100 mt-1">
            Reuniting families with love, hope, and technology.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mt-4 sm:mt-0 flex items-center gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search cases, stories, or names..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 rounded text-sm text-blue-900 font-semibold focus:outline-none"
          />
          <button
            type="submit"
            className="bg-white text-blue-700 px-4 py-2 rounded hover:bg-blue-100 transition text-sm font-semibold"
          >
            Search
          </button>
        </form>
      </div>

      {/* Navigation + Admin + Language */}
      <div className="max-w-6xl mx-auto px-4 py-2 flex flex-col sm:flex-row justify-between items-center">
        <nav className="flex flex-wrap gap-4 text-sm font-medium">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`hover:underline ${
                pathname === item.path ? 'underline font-semibold text-white' : 'text-blue-100'
              }`}
            >
              {item.label}
            </Link>
          ))}

          {/* Admin Dropdown */}
          <div className="relative">
            <button
              onClick={() => setAdminOpen(!adminOpen)}
              className="text-blue-100 hover:text-white focus:outline-none"
            >
              🛠️ Admin ▾
            </button>
            {adminOpen && (
              <div className="absolute left-0 mt-2 bg-white text-blue-700 rounded shadow-lg z-10 w-40">
                {adminItems.map(item => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block px-4 py-2 hover:bg-blue-50"
                    onClick={() => setAdminOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Language Switcher */}
        <select
          value={language}
          onChange={e => setLanguage(e.target.value)}
          className="mt-4 sm:mt-0 bg-blue-500 text-white text-sm px-2 py-1 rounded focus:outline-none"
        >
          <option value="en">🌐 English</option>
          <option value="sn">🇿🇼 Shona</option>
          <option value="nd">🇿🇼 Ndebele</option>
          <option value="fr">🇫🇷 Français</option>
          <option value="es">🇪🇸 Español</option>
          <option value="zh">🇨🇳 中文</option>
          <option value="ar">🇸🇦 العربية</option>
          <option value="hi">🇮🇳 हिन्दी</option>
          <option value="pt">🇵🇹 Português</option>
          <option value="ru">🇷🇺 Русский</option>
          <option value="sw">🇰🇪 Kiswahili</option>
          <option value="yo">🇳🇬 Yoruba</option>
          <option value="ig">🇳🇬 Igbo</option>
          <option value="de">🇩🇪 Deutsch</option>
          <option value="ja">🇯🇵 日本語</option>
          <option value="ko">🇰🇷 한국어</option>
          <option value="it">🇮🇹 Italiano</option>
          <option value="tr">🇹🇷 Türkçe</option>
          <option value="am">🇪🇹 አማርኛ</option>
          <option value="zu">🇿🇦 isiZulu</option>
          <option value="xh">🇿🇦 isiXhosa</option>
          {/* Add more as needed */}
        </select>
      </div>
    </header>
  );
};

export default Header;
