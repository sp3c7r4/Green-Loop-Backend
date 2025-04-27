import type { Auction, AuctionResponseDTO } from "../types/auction";

export default function(model: Auction): Partial<AuctionResponseDTO> {
  return {
    id: model.id,
    price: model.price,
    productId: model.productId,
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
    user: model.user
  }
}