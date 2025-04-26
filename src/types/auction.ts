export interface Auction {
  id: string;
  price: string;
  productId: string;
  userId: string;
  createdAt: Date; 
  updatedAt: Date;
}

export interface CreateAuctionDTO {
  name: string;
  image_url: string; 
  about: string;
  brand: string;
  issue: string;
  address: string;
}

export interface AuctionResponseDTO {
  id: string;
  name: string;
  image_url: string; 
  about: string;
  brand: string;
  issue: string;
  address: string;
  userId: string; 
  createdAt: Date; 
  updatedAt: Date;
}