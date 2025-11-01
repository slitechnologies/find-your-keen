import  { useEffect, useState } from 'react';

interface PersonEntry {
  id: string;
  name: string;
  status: 'missing' | 'found';
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

  useEffect(() => {
    const storedEntries = localStorage.getItem('searches');
    const storedReviews = localStorage.getItem('reviews');
    const allLeads: Record<string, Lead[]> = {};

    if (storedEntries) {
      const parsedEntries = JSON.parse(storedEntries) as {
        status: string;
        id: string;
        name: string;
        submittedAt: string;
      }[];

      const typedEntries: PersonEntry[] = parsedEntries.map(entry => ({
        ...entry,
        status: entry.status === 'found' ? 'found' : 'missing', // enforce union type
      }));

      setEntries(typedEntries);

      // Load leads per person
      typedEntries.forEach(entry => {
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
    const updated = entries.filter(e => e.id !== id);
    setEntries(updated);
    localStorage.setItem('searches', JSON.stringify(updated));
  };

  return (
    <div className="max-w-5xl mx-auto py-8 space-y-6">
      <h1 className="text-3xl font-bold">🛠️ Admin Dashboard</h1>

      <section>
        <h2 className="text-xl font-semibold">Search Entries</h2>
        <table className="w-full border mt-4">
          <thead>
            <tr className="bg-gray-100">
              <th>Name</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.map(entry => (
              <tr key={entry.id} className="border-t">
                <td>{entry.name}</td>
                <td>{entry.status}</td>
                <td>{new Date(entry.submittedAt).toLocaleDateString()}</td>
                <td className="space-x-2">
                  <button onClick={() => toggleStatus(entry.id)} className="text-blue-600">Toggle</button>
                  <button onClick={() => deleteEntry(entry.id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="text-xl font-semibold mt-8">Leads</h2>
        {Object.entries(leads).map(([id, personLeads]) => (
          <div key={id} className="mt-4 border p-4 rounded">
            <h3 className="font-bold">Leads for ID: {id}</h3>
            {personLeads.map((lead, idx) => (
              <p key={idx} className="text-sm mt-2">• {lead.message} ({lead.contact || 'No contact'})</p>
            ))}
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-xl font-semibold mt-8">Reviews</h2>
        <div className="space-y-4 mt-4">
          {reviews.map((review, idx) => (
            <div key={idx} className="border p-4 rounded">
              <p className="font-semibold">{review.name || 'Anonymous'}</p>
              <p>{review.message}</p>
              {review.rating && <p className="text-yellow-500">{'⭐'.repeat(review.rating)}</p>}
              <p className="text-xs text-gray-500">Submitted on {new Date(review.submittedAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
