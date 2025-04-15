import UserRepository from "../repositories/user.repository"
import HttpStatus from "../utils/http"
import Response, { BAD_REQUEST } from "../utils/response"
import _ from 'lodash'
import { userEmailCheck, userMobileCheck } from "../utils/user.util"
import type { CreateUserDTO, User } from "../types/user"
import AddressRepository from "../repositories/address.repository"
import userResource from "../resources/user.resource"
import addressResource from "../resources/address.resource"
import bcrypt from "bcryptjs"
import JWT from "../utils/jwtClass"
import type { Address } from "../types/address"

const userRepositoryInstance = new UserRepository()
const addressRepositoryInstance =  new AddressRepository()
const registerFields = ['firstname','lastname','email','mobile','type', 'password', 'address', 'state', 'lga', 'country'];
const registerData = ['firstname','lastname','email','mobile','type', 'password', ];
const addressData = ['address', 'state', 'lga', 'country'];

export const registerUser = async (data: CreateUserDTO) => {
  /** Checks if the fields are all complete  */
  if (!_.every(registerFields, field => _.has(data, field) && !_.isUndefined(_.get(data, field)))) {
    return new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, "All fields are required", {});
  }

  if (await userEmailCheck(data.email)) {
    return BAD_REQUEST("Email already Exists");
  }
  if (await userMobileCheck(data.mobile)) {
    return BAD_REQUEST("Mobile number already Exists");
  }
  const registerInfo = _.pick(data, registerData)
  const addressInfo = _.pick(data, addressData) as Record<string, string>;
  
  const register: User = await userRepositoryInstance.create(registerInfo);
  addressInfo['userId'] = register.id;
  const address: Partial<Address> = await addressRepositoryInstance.create(addressInfo)

  const tokenData = {
    user: userResource(register),
    user_type: 'user'
  }
  const token = await JWT.signToken(tokenData)
  const response = { ...userResource(register), ...addressResource(address), token  }
  return new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, "success", response)
}

export const loginUser = async (email: string, password: string) =>  {
  const emailCheck = await userEmailCheck(email)
  if (!emailCheck) {
    return BAD_REQUEST("Email doesn't exxist")
  }
  const decryptPassword = await bcrypt.compare(password, emailCheck.password)
  if(!decryptPassword) {
    return BAD_REQUEST("Incorrect Password")
  }
  const tokenData = {
    user: userResource(emailCheck),
    user_type: 'user'
  }
  const token = await JWT.signToken(tokenData)
  const response = {
    user: userResource(emailCheck),
    token
  }
  return new Response(HttpStatus.OK.code, HttpStatus.OK.status, "success", response)
}