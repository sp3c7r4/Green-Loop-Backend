import type { User, UserResponseDTO } from "../types/user";
import addressResource from "./address.resource";
import auctionResource from "./auction.resource";
import productResource from "./product.resource";

export default function(model: User): UserResponseDTO {
  return {
    id: model.id,
    firstname: model.firstname,
    lastname: model.lastname,
    email: model.email,
    mobile: model.mobile,
    type: model.type,
    createdAt: model.createdAt,
    updatedAt: model.updatedAt,
    address: addressResource(model.address),
    products: model.products ? model.products.map((product) => productResource(product)) : [], // Handle undefined products
    auctions: model.auctions ? model.auctions.map((auction) => auctionResource(auction)) : [], // Handle undefined auctions
}}