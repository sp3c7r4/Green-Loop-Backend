import BaseRepositorySQL from "./BaseRepositorySQL"
import { Auction } from "./../models/relationships"

class Repository extends BaseRepositorySQL {
  constructor() {
    super(Auction)
  }
}

const AuctionRepository = new Repository()
export default AuctionRepository;