import UserRepository from "../repositories/user.repository";
import type { Address } from "../types/address";
import type { User } from "../types/user";

export async function userEmailCheck(email: string): Promise<User> {
  return await UserRepository.readByEmail(email);
}

export async function userMobileCheck(mobile: string): Promise<Address> {
  return await UserRepository.readByMobile(mobile)
}