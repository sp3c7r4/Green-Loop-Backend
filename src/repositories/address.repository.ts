import BaseRepositorySQL from "./BaseRepositorySQL"
import { Address } from "./../models/relationships"

class Repository extends BaseRepositorySQL {
  constructor() {
    super(Address)
  }
}

const AddressRepository = new Repository()
export default AddressRepository;