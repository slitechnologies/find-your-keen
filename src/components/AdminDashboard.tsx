import { useEffect, useState } from "react";

interface PersonEntry {
  id: string;
  name: string;
  status: "missing" | "found";
  submittedAt: string;
}

interface Lead {
  message: string;
  contact?: string;
  submittedAt: string;
}

interface Review {
  name?: string;
  message: string;
  rating?: number;
  submittedAt: string;
}

const AdminDashboard = () => {
  const [entries, setEntries] = useState<PersonEntry[]>([]);
  const [leads, setLeads] = useState<Record<string, Lead[]>>({});
  const [reviews, setReviews] = useState<Review[]>([]);
  const [leadFilter, setLeadFilter] = useState("");

  useEffect(() => {
    const storedEntries = localStorage.getItem("searches");
    const storedReviews = localStorage.getItem("reviews");
    const allLeads: Record<string, Lead[]> = {};

    if (storedEntries) {
      const parsedEntries = JSON.parse(storedEntries);
      const typedEntries: PersonEntry[] = parsedEntries.map((entry: any) => ({
        ...entry,
        status: entry.status === "found" ? "found" : "missing",
      }));
      setEntries(typedEntries);

      typedEntries.forEach((entry) => {
        const leadsForPerson = localStorage.getItem(`leads-${entry.id}`);
        if (leadsForPerson) {
          allLeads[entry.id] = JSON.parse(leadsForPerson);
        }
      });

      setLeads(allLeads);
    }

    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }
  }, []);

  const toggleStatus = (id: string) => {
    const updated: PersonEntry[] = entries.map(e =>
      e.id === id
        ? {
          ...e,
          status: e.status === 'missing' ? 'found' as 'found' : 'missing' as 'missing',
        }
        : e
    );
    setEntries(updated);
    localStorage.setItem('searches', JSON.stringify(updated));
  };


  const deleteEntry = (id: string) => {
    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
    localStorage.setItem("searches", JSON.stringify(updated));
  };

  const exportLeadsToCSV = () => {
    const rows = [["Person ID", "Message", "Contact", "Submitted At"]];
    Object.entries(leads).forEach(([id, personLeads]) => {
      personLeads.forEach((lead) => {
        rows.push([
          id,
          lead.message,
          lead.contact || "N/A",
          new Date(lead.submittedAt).toLocaleString(),
        ]);
      });
    });

    const csvContent =
      "data:text/csv;charset=utf-8," +
      rows.map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "leads.csv";
    link.click();
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 space-y-10">
      <h1 className="text-4xl font-extrabold text-blue-700 text-center">
        🛠️ Admin Dashboard
      </h1>

      {/* Search Entries */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Search Entries
        </h2>
        <table className="w-full text-sm text-left border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <thead className="bg-blue-50 text-blue-700 uppercase font-semibold tracking-wide">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Submitted</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {entries.map(entry => (
              <tr key={entry.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-3 font-medium text-gray-800">{entry.name}</td>
                <td className="px-4 py-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${entry.status === 'found' ? 'bg-green-600' : 'bg-yellow-500'
                    }`}>
                    {entry.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {new Date(entry.submittedAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </td>
                <td className="px-4 py-3 space-x-2">
                  <button
                    onClick={() => toggleStatus(entry.id)}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Toggle
                  </button>
                  <button
                    onClick={() => deleteEntry(entry.id)}
                    className="text-red-600 hover:underline font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Leads */}
      <section>
        <div className="flex justify-between items-center mt-10 mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Leads</h2>
          <button
            onClick={exportLeadsToCSV}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            📤 Export CSV
          </button>
        </div>

        <input
          type="text"
          placeholder="Filter leads by keyword..."
          value={leadFilter}
          onChange={(e) => setLeadFilter(e.target.value)}
          className="w-full sm:w-96 mb-6 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
        />

        {Object.entries(leads).map(([id, personLeads]) => {
          const filteredLeads = personLeads.filter((lead) =>
            lead.message.toLowerCase().includes(leadFilter.toLowerCase())
          );
          return (
            <div key={id} className="mb-6 bg-white border rounded-lg shadow p-4">
              <h3 className="font-bold text-blue-700 mb-2">
                Leads for ID: {id}
              </h3>
              {filteredLeads.length === 0 ? (
                <p className="text-sm text-gray-500">No matching leads.</p>
              ) : (
                filteredLeads.map((lead, idx) => (
                  <div key={idx} className="border-t pt-3 mt-3">
                    <p className="text-gray-800">{lead.message}</p>
                    {lead.contact && (
                      <p className="text-sm text-blue-600 mt-1">
                        Contact: {lead.contact}
                      </p>
                    )}
                    <p className="text-xs text-gray-500">
                      Submitted on{" "}
                      {new Date(lead.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          );
        })}
      </section>

      {/* Reviews */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reviews</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="bg-white border rounded-lg shadow-sm p-4 space-y-2"
            >
              <p className="font-semibold text-blue-700">
                {review.name || "Anonymous"}
              </p>
              <p className="text-gray-700">{review.message}</p>
              {review.rating && (
                <p className="text-yellow-500 text-lg">
                  {"⭐".repeat(review.rating)}
                </p>
              )}
              <p className="text-xs text-gray-500">
                Submitted on{" "}
                {new Date(review.submittedAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
