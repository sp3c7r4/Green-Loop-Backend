import _ from "lodash";
import HttpStatus from "../utils/http";
import Response, { BAD_REQUEST } from "../utils/response";
import type { CreateProductDTO } from "../types/product";
import ProductRepository from "../repositories/product.repository";

const productFields = ['name','image_url', 'about', 'brand', 'issue', 'address', 'userId']
const updateProductFields = ['name','image_url', 'about', 'brand', 'issue', 'address',]
const productRepositoryInstance = new ProductRepository()

export const createProduct = async (data: CreateProductDTO) => {
  console.log("Datas: ",data)
  if (!_.every(productFields, field => _.has(data, field) && !_.isUndefined(_.get(data, field)))) {
    return new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, "All fields are required", {});
  }

  const createProduct = await productRepositoryInstance.create(data);
  console.log(createProduct)
  return new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, "success", createProduct)
}

export const updateProduct = async (data: CreateProductDTO) => {
  console.log("Datas: ",data)
  const cleanData = _.pick(data, updateProductFields);
  const filteredData = _.omitBy(cleanData, _.isUndefined);

  const updateProduct = await productRepositoryInstance.updateModel(data.updateId, filteredData);
  console.log(updateProduct)
  return new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, "success", updateProduct)
}

export const readProductById = async (productId: string) => {
  if(!productId) {
    BAD_REQUEST("Product Id doesn't exist")
  }

  const readProduct = await productRepositoryInstance.readOneById(productId);
  return new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, "success", readProduct)
}