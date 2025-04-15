import BaseRepositorySQL from "./BaseRepositorySQL"
import { User } from "./../models/relationships"
import errorHelper from "../utils/errorHelper";
import logTracker from "../utils/logTracker";
import HttpStatus from "../utils/http";
import CustomError from "../utils/error";

export default class UserRepository extends BaseRepositorySQL {
  constructor() {
    super(User)
  }

  async readByMobile(mobile: string): Promise<object> {
    try {
      const findOne = User.findOne({
        where: {
          mobile,
        },
      });
      return findOne;
    } catch (err) {
      logTracker.log( 'info', JSON.stringify(errorHelper.returnErrorLog(err)) );
      throw new CustomError(
        'Failed to read the record by Mail. Please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR.code,
        HttpStatus.INTERNAL_SERVER_ERROR.status
      );
    }
  } 
}