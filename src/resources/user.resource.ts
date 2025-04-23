import type { User, UserResponseDTO } from "../types/user";
import addressResource from "./address.resource";

export default function(model: User): UserResponseDTO {
  return {
    id: model.id,
    firstname: model.firstname,
    lastname: model.lastname,
    email: model.email,
    address: addressResource(model.address),
    mobile: model.mobile,
    type: model.type,
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
  }
}