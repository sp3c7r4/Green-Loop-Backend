import BaseRepositorySQL from "./BaseRepositorySQL"
import { Auction, Product, User } from "./../models/relationships"
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

  async readAllUsersByProductId(productId: string): Promise<Product | null> {
    try {
      const productWithUsers = await Product.findOne({
        where: { id: productId },
        include: [
          {
            model: Auction,
            attributes: ['id', 'price', 'userId'],
            include: [
              {
                model: User,
                attributes: ['id', 'firstname', 'email']
              }
            ]
          },
        ],
        order: [[Auction, 'price', 'DESC']],
      });
      return productWithUsers
    } catch (err) {
      logTracker.log(
        'errors',
        JSON.stringify(errorHelper.returnErrorLog(err))
      );
      throw new CustomError(
        "Failed to fetch all recordz. Please try again later.",
        HttpStatus.INTERNAL_SERVER_ERROR.code,
        HttpStatus.INTERNAL_SERVER_ERROR.status
      );
    }
  }
}

const ProductRepository = new Repository();
export default ProductRepository;