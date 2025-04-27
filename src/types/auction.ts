import type { User } from "./user";

export interface Auction {
  id: string;
  price: string;
  productId: string;
  userId: string;
  createdAt: Date; 
  updatedAt: Date;
  user?: User
}

export interface CreateAuctionDTO {
  price: string;
  productId: string;
}

export interface AuctionResponseDTO {
  id: string;
  price: string;
  productId: string;
  createdAt: Date; 
  updatedAt: Date;
  user?: User
}