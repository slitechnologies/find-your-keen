import { useState } from "react";

interface ReviewData {
  name?: string;
  message: string;
  rating?: number;
  submittedAt?: string;
}

const ReviewForm = () => {
  const [formData, setFormData] = useState<ReviewData>({ message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newReview: ReviewData = {
      ...formData,
      submittedAt: new Date().toISOString(),
    };

    const existing = localStorage.getItem("reviews");
    const reviews = existing ? JSON.parse(existing) : [];
    localStorage.setItem("reviews", JSON.stringify([...reviews, newReview]));

    setSubmitted(true);
  };

  return (
    <div className="max-w-xl mx-auto mt-8 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Share Your Experience</h2>

      {submitted ? (
        <div className="text-center text-green-700 font-semibold">
          ✅ Thank you for your review! 🙏
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your name (optional)"
            value={formData.name || ""}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-500"
          />

          <textarea
            placeholder="How did Find Your Keen help you?"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            required
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-500"
          />

          <select
            value={formData.rating?.toString() || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                rating: parseInt(e.target.value),
              })
            }
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring focus:border-blue-500"
          >
            <option value="">Rate the experience (optional)</option>
            <option value="5">⭐⭐⭐⭐⭐</option>
            <option value="4">⭐⭐⭐⭐</option>
            <option value="3">⭐⭐⭐</option>
            <option value="2">⭐⭐</option>
            <option value="1">⭐</option>
          </select>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
              Submit Review
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ReviewForm;
