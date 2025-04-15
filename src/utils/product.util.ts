import ProductRepository from "../repositories/product.repository"
import type { Product } from "../types/product"

const productRepositoryInstance = new ProductRepository()

export async function productIdCheck(id: string): Promise<Product> {
  return await productRepositoryInstance.readOneById(id)
}