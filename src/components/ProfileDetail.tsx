import { useState } from "react";
import type { PersonEntry } from "../types";

const ProfileDetail = ({ entry }: { entry: PersonEntry }) => {
  const [leadMessage, setLeadMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const existing = localStorage.getItem("leads");
    const leads = existing ? JSON.parse(existing) : [];

    const newLead = {
      personId: entry.id,
      personName: entry.name,
      message: leadMessage,
      submittedAt: new Date().toISOString(),
    };

    localStorage.setItem("leads", JSON.stringify([...leads, newLead]));
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 mt-8 space-y-8">
      {/* Image */}
      {entry.image && (
        <img
          src={entry.image}
          alt={entry.name}
          className="w-full h-64 object-cover rounded-lg"
        />
      )}

      {/* Name & Status */}
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-blue-700">{entry.name}</h1>
        <span
          className={`px-4 py-1 rounded-full text-white text-sm font-semibold ${
            entry.status === "found" ? "bg-green-600" : "bg-yellow-500"
          }`}
        >
          {entry.status === "found" ? "Found" : "Missing"}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-700 text-lg leading-relaxed">{entry.description}</p>

      {/* Contact Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h2 className="text-xl font-semibold text-blue-700 mb-2">
          Contact the Searcher
        </h2>
        <ul className="text-gray-700 space-y-1">
          <li>📧 Email: {entry.contact.email}</li>
          {entry.contact.phone && <li>📞 Phone: {entry.contact.phone}</li>}
          {entry.contact.social && <li>🌐 Social: {entry.contact.social}</li>}
        </ul>
      </div>

      {/* Lead Form */}
      {submitted ? (
        <div className="text-center py-6">
          <h2 className="text-2xl font-bold text-green-700 mb-2">✅ Lead Submitted</h2>
          <p className="text-gray-700">Thank you for sharing your tip. Every lead helps.</p>
        </div>
      ) : (
        <form onSubmit={handleLeadSubmit} className="space-y-4">
          <h2 className="text-xl font-semibold text-blue-700">Submit a Lead or Tip</h2>
          <textarea
            placeholder="If you have any info or recognize this person, share it here..."
            value={leadMessage}
            onChange={(e) => setLeadMessage(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring focus:border-blue-500"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Submit Lead
          </button>
        </form>
      )}
    </div>
  );
};

export default ProfileDetail;
