import type { User, UserResponseDTO } from "../types/user";

export default function(model: User): UserResponseDTO {
  return {
    id: model.id,
    firstname: model.firstname,
    lastname: model.lastname,
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
    email: model.email,
  }
}