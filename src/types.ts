export interface Caterer {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  pricePerPerson: number;
  specialty: string;
  area: string;
  image: string;
  verified: boolean;
  packages?: MenuPackage[];
}

export interface MenuPackage {
  id: string;
  name: string;
  description: string;
  pricePerPerson: number;
  minGuests: number;
  items: string[];
  image: string;
}

export enum EventType {
  DAWAT = "Dawat",
  MEHNDI = "Mehndi",
  BIRTHDAY = "Birthday",
  BBQ = "BBQ",
  CORPORATE = "Corporate",
  RAMADAN = "Ramadan",
}
