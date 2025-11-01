import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import SearchForm from './components/SearchForm';
import SearchDirectory from './components/SearchDirectory';
import ProfileDetailWrapper from './components/ProfileDetailWrapper';
import ReviewForm from './components/ReviewForm';
import SuccessStories from './components/SuccessStories';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/submit" element={<SearchForm />} />
            <Route path="/directory" element={<SearchDirectory />} />
            <Route path="/profile/:id" element={<ProfileDetailWrapper />} />
            <Route path="/submit-review" element={<ReviewForm />} />
            <Route path="/stories" element={<SuccessStories />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
