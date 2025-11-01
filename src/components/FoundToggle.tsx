import { useState } from "react";

interface PersonEntry {
  id: string;
  name: string;
  status: 'missing' | 'found';
}

const FoundToggle = ({ entry, onStatusChange }: { entry: PersonEntry; onStatusChange: (newStatus: 'missing' | 'found') => void }) => {
  const [confirming, setConfirming] = useState(false);

  const handleToggle = () => {
    setConfirming(true);
  };

  const confirmToggle = () => {
    const newStatus = entry.status === 'missing' ? 'found' : 'missing';
    onStatusChange(newStatus);
    setConfirming(false);
    if (newStatus === 'found') {
      window.location.href = '/submit-review'; // Redirect to review form
    }
  };

  return (
    <div className="mt-6">
      <button
        onClick={handleToggle}
        className={`px-4 py-2 rounded text-white ${entry.status === 'missing' ? 'bg-green-600' : 'bg-yellow-500'}`}
      >
        {entry.status === 'missing' ? 'Mark as Found' : 'Undo Found'}
      </button>

      {confirming && (
        <div className="mt-4 border p-4 rounded bg-gray-100">
          <p>Are you sure you want to mark <strong>{entry.name}</strong> as {entry.status === 'missing' ? 'found' : 'missing'}?</p>
          <div className="mt-2 space-x-2">
            <button onClick={confirmToggle} className="bg-blue-600 text-white px-3 py-1 rounded">Yes</button>
            <button onClick={() => setConfirming(false)} className="bg-gray-400 text-white px-3 py-1 rounded">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoundToggle;