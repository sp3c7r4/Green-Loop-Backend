import BaseRepositorySQL from "./BaseRepositorySQL"
import { Auction } from "./../models/relationships"

export default class AuctionRepository extends BaseRepositorySQL {
  constructor() {
    super(Auction)
  }
}