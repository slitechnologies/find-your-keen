import { useEffect, useState } from "react";

interface Lead {
  message: string;
  contact?: string;
  submittedAt: string;
}

const LeadViewer = ({ personId }: { personId: string }) => {
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(`leads-${personId}`);
    if (stored) setLeads(JSON.parse(stored));
  }, [personId]);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        🕵️ Leads Submitted
      </h2>

      {leads.length === 0 ? (
        <p className="text-center text-gray-500">
          No leads yet — check back soon.
        </p>
      ) : (
        <div className="space-y-6">
          {leads.map((lead, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-lg shadow-sm p-6"
            >
              <div className="flex justify-between items-start">
                <p className="text-gray-800 text-base leading-relaxed">
                  {lead.message}
                </p>
                <span className="text-xs text-gray-500">
                  {new Date(lead.submittedAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>

              {lead.contact && (
                <p className="mt-3 text-sm text-blue-600">
                  📞 Contact: {lead.contact}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeadViewer;
