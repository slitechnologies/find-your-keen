export interface PersonEntry {
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
