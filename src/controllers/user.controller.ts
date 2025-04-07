import UserRepository from "../repositories/user.repository"
import HttpStatus from "../utils/http"
import Response from "../utils/response"

const UserRepositoryInstance = new UserRepository()

export const registerUser = async (data: object) => {
  const register = await UserRepositoryInstance.create(data)
  return new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, "Done", register)
}