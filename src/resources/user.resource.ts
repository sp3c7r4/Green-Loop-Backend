import type { User, UserResponseDTO } from "../types/user";

export default function(model: User): UserResponseDTO {
  return {
    id: model.id,
    firstname: model.firstname,
    lastname: model.lastname,
    email: model.email,
    mobile: model.mobile,
    type: model.type,
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
  }
}