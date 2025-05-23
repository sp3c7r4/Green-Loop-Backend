import AuctionRepository from "../repositories/auction.repository"
import type { Auction } from "../types/auction"

export async function auctionIdCheck(id: string): Promise<Auction> {
  return await AuctionRepository.readOneById(id)
}

export async function auctionUserIdCheck(id: string): Promise<Auction> {
  return await AuctionRepository.readOneByUserId(id)
}