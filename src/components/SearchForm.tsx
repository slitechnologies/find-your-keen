import { useState, useEffect } from "react";

interface SearchFormData {
  name: string;
  image?: File;
  description: string;
  contactEmail: string;
  contactPhone?: string;
  socialHandles?: string;
}

const SearchForm = () => {
  const [formData, setFormData] = useState<SearchFormData>({
    name: '',
    description: '',
    contactEmail: ''
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  // ✅ Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem('draftSearch', JSON.stringify(formData));
  }, [formData]);

  // ✅ Load saved draft if available
  useEffect(() => {
    const saved = localStorage.getItem('draftSearch');
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (field: keyof SearchFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const newErrors: string[] = [];
    if (!formData.name.trim()) newErrors.push("Name is required.");
    if (!formData.description.trim()) newErrors.push("Description is required.");
    if (!formData.contactEmail.trim()) newErrors.push("Email is required.");
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    // ✅ Save to localStorage (or Netlify CMS later)
    const existing = localStorage.getItem('searches');
    const searches = existing ? JSON.parse(existing) : [];
    const newEntry = {
      ...formData,
      id: `${Date.now()}-${formData.name.toLowerCase().replace(/\s+/g, '-')}`,
      status: 'missing',
      submittedAt: new Date().toISOString()
    };
    localStorage.setItem('searches', JSON.stringify([...searches, newEntry]));
    localStorage.removeItem('draftSearch');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto text-center py-12">
        <h2 className="text-3xl font-bold text-green-700 mb-4">✅ Search Submitted</h2>
        <p className="text-gray-700 mb-6">Thank you for submitting your search. You can view it in the directory once approved.</p>
        <a href="/directory" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Go to Directory</a>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Submit a Search</h2>

      {/* ✅ Validation Messages */}
      {errors.length > 0 && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
          <ul className="list-disc list-inside">
            {errors.map((err, i) => <li key={i}>{err}</li>)}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name of Missing Person</label>
          <input
            type="text"
            value={formData.name}
            onChange={e => handleChange('name', e.target.value)}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={formData.description}
            onChange={e => handleChange('description', e.target.value)}
            required
            rows={4}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Describe the person, last known location, clothing, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-3 w-32 h-32 object-cover rounded border"
            />
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
            <input
              type="email"
              value={formData.contactEmail}
              onChange={e => handleChange('contactEmail', e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone (optional)</label>
            <input
              type="text"
              value={formData.contactPhone || ''}
              onChange={e => handleChange('contactPhone', e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Social Media Handles (optional)</label>
          <input
            type="text"
            value={formData.socialHandles || ''}
            onChange={e => handleChange('socialHandles', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
