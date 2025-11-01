import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';


interface PersonEntry {
    id: string;
    name: string;
    image?: string;
    description: string;
    contact: {
        email: string;
        phone?: string;
        social?: string;
    };
    status: 'missing' | 'found';
    submittedAt: string;
}

const SearchDirectory = () => {
    const [entries, setEntries] = useState<PersonEntry[]>([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        // Load JSON data from local file or Netlify CMS
        fetch('/data/searches.json')
            .then(res => res.json())
            .then(data => setEntries(data.filter((e: PersonEntry) => e.status === 'missing')));
    }, []);

    const filtered = entries.filter(e =>
        e.name.toLowerCase().includes(query.toLowerCase()) ||
        e.description.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="space-y-4">
            <input
                type="text"
                placeholder="Search by name or keyword"
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="border px-3 py-2 rounded w-full"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map(entry => (
                    <div key={entry.id} className="border p-4 rounded shadow">
                        {entry.image && <img src={entry.image} alt={entry.name} className="w-full h-48 object-cover rounded" />}
                        <h2 className="text-xl font-bold mt-2">{entry.name}</h2>
                        <p className="text-sm text-gray-600">{entry.description}</p>
                        <span className="inline-block mt-2 px-2 py-1 bg-yellow-300 text-xs rounded">Missing</span>

                        <Link
                            to={`/profile/${entry.id}`}
                            className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchDirectory;