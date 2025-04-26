import type { Product, ProductResponseDTO } from "../types/product";

export default function(model: Product): Partial<ProductResponseDTO> {
  return {
    id: model.id,
    name: model.name,
    about: model.about,
    image_url: model.image_url,
    brand: model.brand,
    issue: model.issue,
    address: model.address,
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
  }
}