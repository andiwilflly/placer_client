import { Document } from 'mongoose';

export interface IPlace {
  foursquareId: string;
  name: string;
  address: string;
  country: string;
  city: string;
  lat: number;
  lng: number;
  distance: number;
  isOpen: boolean;
  openHours: string;
  photos: Array<string>;

  phone?: string;
  url?: string;
  fbUrl?: string;
  foursquareUrl?: string;
}

export interface IExploreParams {
  lat: string;
  lng: string;

  limit?: number;
  time?: string;
  day?: string;
  offset?: number;
  radius?: number;
  openNow?: number;
  categoryId?: Array<string>;
}

export interface IScanParams {
  lat: string;
  lng: string;
  userId: string;
}

export interface IPlaceDoc extends IPlace, Document {}
