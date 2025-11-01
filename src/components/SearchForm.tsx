import { useState } from "react";

interface SearchFormData {
  name: string;
  image?: File;
  description: string;
  contactEmail: string;
  contactPhone?: string;
  socialHandles?: string;
}

const SearchForm = () => {
  const [formData, setFormData] = useState<SearchFormData>({ name: '', description: '', contactEmail: '' });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Save to JSON or Netlify CMS
    console.log('Submitting:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" placeholder="Name of person you're looking for" required />
      <textarea placeholder="Describe the person, last known location, etc." required />
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {imagePreview && <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover" />}
      <input type="email" placeholder="Your email" required />
      <input type="text" placeholder="Your phone (optional)" />
      <input type="text" placeholder="Your social media handles (optional)" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit Search</button>
    </form>
  );
};

export default SearchForm;
