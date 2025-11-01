import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const { pathname } = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Directory', path: '/directory' },
    { label: 'Stories', path: '/stories' },
    { label: 'Admin', path: '/admin' },
  ];

  return (
    <header className="bg-blue-600 text-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tight hover:opacity-90">
          🔍 Find Your Keen
        </Link>
        <nav className="space-x-4 text-sm font-medium">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`hover:underline ${
                pathname === item.path ? 'underline font-semibold' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
