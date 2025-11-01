import { useState } from "react";
import type { PersonEntry } from "../types";

const ProfileDetail = ({ entry }: { entry: PersonEntry }) => {
  const [leadMessage, setLeadMessage] = useState('');

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Lead submitted:', leadMessage);
    // Save to localStorage or send to Netlify Forms
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {entry.image && <img src={entry.image} alt={entry.name} className="w-full h-64 object-cover rounded" />}
      <h1 className="text-3xl font-bold">{entry.name}</h1>
      <span className={`inline-block px-3 py-1 rounded text-white ${entry.status === 'found' ? 'bg-green-600' : 'bg-yellow-500'}`}>
        {entry.status === 'found' ? 'Found' : 'Missing'}
      </span>
      <p className="text-gray-700 mt-4">{entry.description}</p>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Contact the searcher</h2>
        <p>Email: {entry.contact.email}</p>
        {entry.contact.phone && <p>Phone: {entry.contact.phone}</p>}
        {entry.contact.social && <p>Social: {entry.contact.social}</p>}
      </div>

      <form onSubmit={handleLeadSubmit} className="mt-6 space-y-4">
        <h2 className="text-xl font-semibold">Submit a lead or tip</h2>
        <textarea
          placeholder="If you have any info or recognize this person, share it here..."
          value={leadMessage}
          onChange={e => setLeadMessage(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit Lead</button>
      </form>
    </div>
  );
};

export default ProfileDetail;