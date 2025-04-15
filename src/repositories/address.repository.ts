import BaseRepositorySQL from "./BaseRepositorySQL"
import { Address } from "./../models/relationships"

export default class AddressRepository extends BaseRepositorySQL {
  constructor() {
    super(Address)
  }
}