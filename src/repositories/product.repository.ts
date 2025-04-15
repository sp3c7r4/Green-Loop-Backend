import BaseRepositorySQL from "./BaseRepositorySQL"
import { Product } from "./../models/relationships"

export default class ProductRepository extends BaseRepositorySQL {
  constructor() {
    super(Product)
  }
}