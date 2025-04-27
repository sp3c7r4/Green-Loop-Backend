import _ from "lodash";
import HttpStatus from "../utils/http";
import Response, { BAD_REQUEST, OK } from "../utils/response";
import type { CreateProductDTO } from "../types/product";
import ProductRepository from "../repositories/product.repository";
import { productIdCheck } from "../utils/product.util";
import productResource from "../resources/product.resource";
import auctionResource from "../resources/auction.resource";

const productFields = ['name','image_url', 'about', 'brand', 'issue', 'address', 'condition', 'userId']
const updateProductFields = ['name','image_url', 'about', 'brand', 'issue', 'address', 'condition']

export const createProduct = async (data: CreateProductDTO) => {
  
  if (!_.every(productFields, field => _.has(data, field) && !_.isUndefined(_.get(data, field)))) {
    return new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, "All fields are required", {});
  }

  const createProduct = await ProductRepository.create(data);
  
  return new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, "success", createProduct)
}

export const updateProduct = async (data: CreateProductDTO) => {
  
  const cleanData = _.pick(data, updateProductFields);
  const filteredData = _.omitBy(cleanData, _.isUndefined);

  const updateProduct = await ProductRepository.updateModel(data.updateId, filteredData);
  return new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, "success", updateProduct)
}

export const readProductById = async (productId: string) => {
  const readProduct = await ProductRepository.readOneById(productId);
  if(!readProduct) return BAD_REQUEST("Product Id doesn't exist")

  return new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, "success", readProduct)
}

export const readAllProductsById = async (productId: string) => {
  const readProduct = await ProductRepository.readAllById(productId);
  
  if(readProduct.length === 0) return BAD_REQUEST("Empty product list")

  return OK("success", readProduct.map((product: any) => productResource(product)))
}

export const readAllProducts = async () => {
  const readProduct = await ProductRepository.readAll();
  if(readProduct.length === 0) return BAD_REQUEST("Empty product list")

  return new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, "success", readProduct.map((product: any) => productResource(product)))
}

export const deleteProductById = async (productId: string) => {
  const productCheck = await productIdCheck(productId);
  if(!productCheck) return BAD_REQUEST("Product Id doesn't exist")

  const deleteProduct = await ProductRepository.deleteModel(productId);
  return new Response(HttpStatus.OK.code, HttpStatus.OK.status, "success", deleteProduct)
}

export const getUsersForProductAuction = async (productId: string) => {
  const readProduct = await ProductRepository.readAllUsersByProductId(productId);
  
  if(readProduct?.length === 0) return BAD_REQUEST("Empty product list")
  return OK("success", readProduct?.auctions.map((product: any) => auctionResource(product)))
}