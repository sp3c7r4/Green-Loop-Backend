import HttpStatus from './http.js';
import schoolLogger from './logTracker.js';
import errorHelper from './errorHelper.js';
import Response from './response.js';
import * as jwt from 'jsonwebtoken'

class JWT {
  static signToken(data: Partial<{ user: object; user_type: string }>) {
    try {
      const token = jwt.sign(
        {
          user: data.user,
          user_type: data.user_type,
        },
        process.env.SECRET,
        {
          expiresIn: '30m',
        }
      );
      return token;
    } catch (err) {
      schoolLogger.log(
        'error',
        JSON.stringify(errorHelper.returnErrorLog(err))
      );
      const message = 'Something went wrong';
      const status_code = HttpStatus.INTERNAL_SERVER_ERROR.code;
      const http_status = HttpStatus.INTERNAL_SERVER_ERROR.status;
      return new Response(status_code, http_status, message, {});
    }
  }

  static verifyToken(token: string) {
    return jwt.verify(token, process.env.SECRET, (err: Error, data: any) => {
      if (err) return 'Invalid Token';
      return data;
    });
  }

  static ifExpired(exp: any) {
    const unixTimestamp = Math.floor(Date.now() / 1000);
    return unixTimestamp > exp;
  }
}

export default JWT;
