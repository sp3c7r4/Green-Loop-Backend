import type { Address, AddressResponseDTO } from "./address";
import type { Auction, AuctionResponseDTO } from "./auction";
import type { Product, ProductResponseDTO } from "./product";

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  products: Partial<Product>[],
  auctions: Partial<Auction[]>
  type: string;
  password: string; 
  createdAt: Date; 
  updatedAt: Date;
  address: Address;
}
export interface CreateUserDTO {
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
  type: string;
  password: string;
  address: string;
  state: string;
  lga: string;
}

export interface UserResponseDTO {
  id: string; 
  firstname: string;
  lastname: string;
  mobile: string;
  type: string;
  email: string;
  createdAt: Date; 
  updatedAt: Date; 
  address: Partial<AddressResponseDTO>;
  products: Partial<ProductResponseDTO>[]; // Default to an empty array
  auctions: AuctionResponseDTO[];
}