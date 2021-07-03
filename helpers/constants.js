const HttpCode = {
  OK: 200,
  CREATER: 201,
  NO_CONTENT: 204,
  BAD_REQYEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
};

const Status = {
  SUCCESS: "success",
  SUCCESS_DELETE: "contact deleted",
  ERROR: "error",
  BAD_REQYEST: "Bad Request",
  FAIL: "fail",
};

const Message = {
  NOT_FOUND: "Not Found",
  BAD_REQYEST: "missing fields",
  EMAIL_USE: "This email address is already use",
  INVALID__DATA: "Invalid credential , Please authorizations",
  TOO_MANY_REQUESTS: "Too Many Requests",
};

const Gender = {
  MALE: "male",
  FEMALE: "female",
  UNCHECKED: "unchecked",
};
const Sub = {
  STARTER: "starter",
  PRO: "pro",
  BISINESS: "business",
};

const createResponse = (statusCode, httpCode, result) => {
  return {
    status: statusCode,
    code: httpCode,
    ...result,
  };
};

const ApiLimiter = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 100 requests per windowMs
  handler: (req, res, next) => {
    return res.status(HttpCode.TOO_MANY_REQUESTS).json(
      createResponse(Status.ERROR, httpCode.TOO_MANY_REQUESTS, {
        message: Message.TOO_MANY_REQUESTS,
      })
    );
  },
};
module.exports = {
  HttpCode,
  Status,
  Message,
  Gender,
  Sub,
  createResponse,
  ApiLimiter,
};
