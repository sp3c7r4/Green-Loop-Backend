import BaseRepositorySQL from "./BaseRepositorySQL"
import { Product } from "./../models/relationships"
import logTracker from "../utils/logTracker";
import errorHelper from "../utils/errorHelper";
import CustomError from "../utils/error";
import HttpStatus from "../utils/http";

class Repository extends BaseRepositorySQL {
  constructor() {
    super(Product)
  }

  async readAllById(userId: string): Promise<Product[]> {
    try {
      return await Product.findAll({
        where: {
          userId
        }
      });
    } catch (err) {
      
      logTracker.log(
        'error',
        JSON.stringify(errorHelper.returnErrorLog(err))
      );
      throw new CustomError(
        "Failed to fetch all records. Please try again later.",
        HttpStatus.INTERNAL_SERVER_ERROR.code,
        HttpStatus.INTERNAL_SERVER_ERROR.status
      );
    }
  }
}

const ProductRepository = new Repository()
export default ProductRepository;