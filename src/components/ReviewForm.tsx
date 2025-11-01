import { useState } from "react";

// components/ReviewForm.tsx
interface ReviewData {
  name?: string;
  message: string;
  rating?: number;
}

const ReviewForm = () => {
  const [formData, setFormData] = useState<ReviewData>({ message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Review submitted:', formData);
    // Save to localStorage or send to Netlify Forms
    setSubmitted(true);
  };

  return (
    <div className="max-w-xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Share Your Experience</h2>
      {submitted ? (
        <p className="text-green-600 font-semibold">Thank you for your review! 🙏</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your name (optional)"
            value={formData.name || ''}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />
          <textarea
            placeholder="How did Find Your Keen help you?"
            value={formData.message}
            onChange={e => setFormData({ ...formData, message: e.target.value })}
            required
            className="w-full border px-3 py-2 rounded"
          />
          <select
            value={formData.rating?.toString() || ''}
            onChange={e => setFormData({ ...formData, rating: parseInt(e.target.value) })}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Rate the experience (optional)</option>
            <option value="5">⭐⭐⭐⭐⭐</option>
            <option value="4">⭐⭐⭐⭐</option>
            <option value="3">⭐⭐⭐</option>
            <option value="2">⭐⭐</option>
            <option value="1">⭐</option>
          </select>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit Review</button>
        </form>
      )}
    </div>
  );
};

export default ReviewForm;