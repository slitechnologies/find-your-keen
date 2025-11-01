import { useEffect, useState } from "react";

interface ReviewData {
  name?: string;
  message: string;
  rating?: number;
  submittedAt: string;
}

const SuccessStories = () => {
  const [reviews, setReviews] = useState<ReviewData[]>([]);

  useEffect(() => {
    // Load from local JSON or localStorage
    const stored = localStorage.getItem('reviews');
    if (stored) setReviews(JSON.parse(stored));
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-bold text-center">🌟 Wall of Hope</h1>
      <p className="text-center text-gray-600">Real stories from people who found their loved ones through Find Your Keen.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {reviews.map((review, idx) => (
          <div key={idx} className="border p-4 rounded shadow">
            {review.name && <h2 className="text-lg font-semibold">{review.name}</h2>}
            <p className="text-gray-700 mt-2">{review.message}</p>
            {review.rating && (
              <div className="mt-2 text-yellow-500">
                {'⭐'.repeat(review.rating)}
              </div>
            )}
            <p className="text-xs text-gray-500 mt-2">Submitted on {new Date(review.submittedAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <a href="/submit-review" className="bg-blue-600 text-white px-4 py-2 rounded inline-block">Share Your Story</a>
      </div>
    </div>
  );
};

export default SuccessStories;