import type { PersonEntry } from "../types";

export const notifySearcher = (entry: PersonEntry) => {
  if (entry.contact?.email) {
    alert(`🔔 ${entry.name} has been marked as found.\nYou may want to contact the searcher at ${entry.contact.email}`);
  } else {
    alert(`🔔 ${entry.name} has been marked as found.\nNo contact email available.`);
  }

  // Future: send email, push notification, or webhook
};

