export interface Address {
  id: string;
  address: string;
  state: string;
  lga: string; 
  country: string;
  userId: string; 
  createdAt: Date; 
  updatedAt: Date;
}

export interface CreateAddressDTO {
  address: string;
  state: string;
  country: string;
  mobile: string;
  type: string;
  userId: string;
  lga: string;
}

export interface AddressResponseDTO {
  id: string; 
  address: string;
  state: string;
  country: string;
  lga: string;
  userId: string;
}