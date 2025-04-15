import type { Address, AddressResponseDTO } from "../types/address"

export default function(model: Address): Partial<AddressResponseDTO> {
  return {
    id: model.id,
    address: model.address,
    state: model.state,
    country: model.country,
    lga: model.lga,
    userId: model.userId,
  }
}