// Shared types for components
export type Listing = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  country: string | null;
  language: string | null;
  color: string | null;
};

export type Property = 'color' | 'language';
