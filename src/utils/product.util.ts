import ProductRepository from "../repositories/product.repository"
import type { Product } from "../types/product"

export async function productIdCheck(id: string): Promise<Product> {
  return await ProductRepository.readOneById(id)
}