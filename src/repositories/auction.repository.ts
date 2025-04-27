import BaseRepositorySQL from "./BaseRepositorySQL"
import { Auction } from "./../models/relationships"
import logTracker from "../utils/logTracker";
import errorHelper from "../utils/errorHelper";
import HttpStatus from "../utils/http";
import CustomError from "../utils/error";

class Repository extends BaseRepositorySQL {
  constructor() {
    super(Auction)
  }

  async readOneByUserId(userId: string) {
    try {
      const findOne = await this.model.findOne({
        where: {
          userId,
        },
      });
      return findOne;
    } catch (err) {
      logTracker.log(
        'error',
        JSON.stringify(errorHelper.returnErrorLog(err))
      );
      throw new CustomError(
        "Failed to fetch the record. Please try again later.",
        HttpStatus.INTERNAL_SERVER_ERROR.code,
        HttpStatus.INTERNAL_SERVER_ERROR.status
      );
    }
  }

}

const AuctionRepository = new Repository()
export default AuctionRepository;