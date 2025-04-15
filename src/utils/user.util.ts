import UserRepository from "../repositories/user.repository";
import type { Address } from "../types/address";
import type { User } from "../types/user";

const userRepositoryInstance = new UserRepository()

export async function userEmailCheck(email: string): Promise<User> {
  return await userRepositoryInstance.readByEmail(email);
}

export async function userMobileCheck(mobile: string): Promise<Address> {
  return await userRepositoryInstance.readByMobile(mobile)
}