export interface Product {
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

export interface CreateProductDTO {
  name: string;
  image_url: string; 
  about: string;
  brand: string;
  issue: string;
  address: string;
}

export interface ProductResponseDTO {
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