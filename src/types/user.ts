import type { Address, AddressResponseDTO } from "./address";

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  mobile: string;
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
}