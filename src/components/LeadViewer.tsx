import { useEffect, useState } from "react";

interface Lead {
  message: string;
  contact?: string;
  submittedAt: string;
}

const LeadViewer = ({ personId }: { personId: string }) => {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    // Load leads from localStorage or JSON
    const stored = localStorage.getItem(`leads-${personId}`);
    if (stored) setLeads(JSON.parse(stored));
  }, [personId]);

  return (
    <div className="max-w-3xl mx-auto py-6 space-y-4">
      <h2 className="text-2xl font-bold">Leads Submitted</h2>
      {leads.length === 0 ? (
        <p className="text-gray-600">No leads yet — check back soon.</p>
      ) : (
        <div className="space-y-4">
          {leads.map((lead, idx) => (
            <div key={idx} className="border p-4 rounded shadow">
              <p className="text-gray-800">{lead.message}</p>
              {lead.contact && <p className="text-sm text-blue-600 mt-2">Contact: {lead.contact}</p>}
              <p className="text-xs text-gray-500 mt-1">Submitted on {new Date(lead.submittedAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default  LeadViewer;