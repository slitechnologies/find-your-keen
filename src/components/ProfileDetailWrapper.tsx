import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileDetail from "./ProfileDetail";
import type { PersonEntry } from "../types";

const ProfileDetailWrapper = () => {
  const { id } = useParams();
  const [entry, setEntry] = useState<PersonEntry | null>(null);

  useEffect(() => {
    fetch("/data/searches.json")
      .then(res => res.json())
      .then((data: PersonEntry[]) => {
        const match = data.find(e => e.id === id);
        setEntry(match || null);
      })
      .catch(err => {
        console.error("Failed to load searches.json", err);
      });
  }, [id]);

  return entry ? <ProfileDetail entry={entry} /> : <p>Profile not found.</p>;
};

export default ProfileDetailWrapper;
