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
  email: string;
  createdAt: Date; 
  updatedAt: Date; 
}