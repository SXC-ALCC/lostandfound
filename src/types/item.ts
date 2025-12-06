export type ItemStatus = "lost" | "found";

export type ItemCategory = 
  | "id-card" 
  | "bag" 
  | "electronics" 
  | "books" 
  | "stationery" 
  | "other";

export interface Item {
  id: string;
  status: ItemStatus;
  name: string;
  category: ItemCategory;
  description: string;
  location: string;
  date: string;
  posterName: string;
  section: string;
  email: string;
  imageUrl?: string;
  createdAt: string;
  approved?: boolean;
}
