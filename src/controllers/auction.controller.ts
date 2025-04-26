import _ from "lodash";
import { BAD_REQUEST, CREATED } from "../utils/response";
import AuctionRepository from "../repositories/auction.repository";
import { productIdCheck } from "../utils/product.util";
import type { CreateAuctionDTO } from "../types/auction";

const auctionFields = ['price','productId','userId']
const updateProductFields = ['name','image_url', 'about', 'brand', 'issue', 'address', 'condition']

export const createAuction = async (data: CreateAuctionDTO) => {
  
  if (!_.every(auctionFields, field => _.has(data, field) && !_.isUndefined(_.get(data, field)))) return BAD_REQUEST("All fields are required");

  const productCheck = await productIdCheck(data.productId);
  if(!productCheck) return BAD_REQUEST("Product Id doesn't exist")

  const createProduct = await AuctionRepository.create(data);
  return CREATED("success", createProduct)
}

// export const updateProduct = async (data: CreateProductDTO) => {
  
//   const cleanData = _.pick(data, updateProductFields);
//   const filteredData = _.omitBy(cleanData, _.isUndefined);

//   const updateProduct = await ProductRepository.updateModel(data.updateId, filteredData);
//   return new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, "success", updateProduct)
// }

// export const readProductById = async (productId: string) => {
//   const readProduct = await ProductRepository.readOneById(productId);
//   if(!readProduct) return BAD_REQUEST("Product Id doesn't exist")

//   return new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, "success", readProduct)
// }

// export const readAllProductsById = async (userId: string) => {
//   const readProduct = await ProductRepository.readAllById(userId);
  
//   if(readProduct.length === 0) return BAD_REQUEST("Empty product list")

//   return new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, "success", readProduct.map((product: any) => productResource(product)))
// }

// export const readAllProducts = async () => {
//   const readProduct = await ProductRepository.readAll();
//   if(readProduct.length === 0) return BAD_REQUEST("Empty product list")

//   return new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, "success", readProduct.map((product: any) => productResource(product)))
// }

// export const deleteProductById = async (productId: string) => {
//   const productCheck = await productIdCheck(productId);
//   if(!productCheck) return BAD_REQUEST("Product Id doesn't exist")

//   const deleteProduct = await ProductRepository.deleteModel(productId);
//   return new Response(HttpStatus.OK.code, HttpStatus.OK.status, "success", deleteProduct)
// }