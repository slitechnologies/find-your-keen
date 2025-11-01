
// components/Footer.tsx
const Footer = () => (
  <footer className="bg-blue-50 border-t border-blue-200 py-6 mt-12">
    <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-700 space-y-4 md:space-y-0">
      
      <div className="text-center md:text-left">
        <p className="font-semibold text-blue-700">Find Your Keen</p>
        <p>Reconnecting families across Zimbabwe and beyond.</p>
      </div>

      <div className="flex space-x-4 items-center">
        <a href="mailto:support@findyourkeen.org" className="hover:text-blue-600">📧 Contact</a>
        <a href="/stories" className="hover:text-blue-600">📖 Stories</a>
        <a href="/admin" className="hover:text-blue-600">🛠 Admin</a>
      </div>

      <div className="text-center md:text-right text-gray-500">
        &copy; {new Date().getFullYear()} Sharp Turn Technologies. Built with ❤️ in Zimbabwe.
      </div>
    </div>
  </footer>
);

export default Footer;

