import UserRepository from "../repositories/user.repository"
import HttpStatus from "../utils/http"
import Response, { BAD_REQUEST } from "../utils/response"
import _ from 'lodash'
import { userEmailCheck, userMobileCheck } from "../utils/user.util"
import type { CreateUserDTO } from "../types/user"
import AddressRepository from "../repositories/address.repository"
import userResource from "../resources/user.resource"
import JWT from "../utils/jwtClass"
import { password as bunPs } from "bun"

const registerFields = ['firstname','lastname','email','mobile','type', 'password', 'address', 'state', 'lga', 'country'];
const registerData = ['firstname','lastname','email','mobile','type', 'password' ];
const updateData = ['firstname','lastname','email','mobile', 'password' ];
const addressData = ['address', 'state', 'lga', 'country'];

export const registerUser = async (data: CreateUserDTO) => {
  const missingField = registerFields.find(field => !_.has(data, field) || _.isUndefined(_.get(data, field)));
  if (missingField) {
    return new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, `Field '${missingField}' is required`, {});
  }

  if (await userEmailCheck(data.email)) {
    return BAD_REQUEST("Email already Exists");
  }
  if (await userMobileCheck(data.mobile)) {
    return BAD_REQUEST("Mobile number already Exists");
  }
  const registerInfo = _.pick(data, registerData)
  const addressInfo = _.pick(data, addressData) as Record<string, string>;
  
  const register: any = await UserRepository.create(registerInfo);
  addressInfo['userId'] = register.id;
  await AddressRepository.create(addressInfo)

  const tokenData = {
    user: { id: register.id },
    user_type: 'user'
  }
  const token = await JWT.signToken(tokenData)
  const response = {user: userResource(register), token}
  return new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, "success", response)
}

export const loginUser = async (email: string, password: string) =>  {
  const emailCheck = await userEmailCheck(email)
  if (!emailCheck) return BAD_REQUEST("Email doesn't exxist")
  console.log(emailCheck.email)
  console.time("Checking")
  const decryptPassword = await bunPs.verify(password, emailCheck.password)
  console.timeEnd("Checking")
  if(!decryptPassword) return BAD_REQUEST("Incorrect Password");

  const tokenData = {
    user: { id: emailCheck.id },
    user_type: 'user'
  }
  const token = await JWT.signToken(tokenData)
  const response = {
    user: userResource(emailCheck),
    token
  }
  return new Response(HttpStatus.OK.code, HttpStatus.OK.status, "success", response)
}

export const updateUser = async (id: string, data: Partial<CreateUserDTO>) => {
  const updateInfo = _.pick(data, updateData)
  console.log(updateInfo)
  const update = await UserRepository.updateModel(id, updateInfo)
  return new Response(HttpStatus.OK.code, HttpStatus.OK.status, "success", update)
}