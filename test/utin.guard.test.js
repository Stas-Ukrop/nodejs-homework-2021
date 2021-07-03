const guard = require("../helpers/guard");
const { HttpCode, Message, Status } = require("../helpers/constants");
const passport = require("passport");

describe("Unit test guard", () => {
  const user = { token: "1234569" };
  const req = { get: jest.fn((header) => `Bearer ${user.token}`), user };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn((data) => data),
  };
  const next = jest.fn();

  test("user exist", async () => {
    passport.authenticate = jest.fn((strategy, options, cb) => () => {
      cb(null, user);
    });
    guard(req, res, next);
    expect(req.get).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
  });

  test("user not  exist", async () => {
    passport.authenticate = jest.fn((strategy, options, cb) => () => {
      cb(null, false);
    });
    guard(req, res, next);
    expect(req.get).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveReturnedWith({
      status: Status.ERROR,
      code: HttpCode.UNAUTHORIZED,
      message: Message.INVALID__DATA,
    });
  });

  test("user wrong token", async () => {
    passport.authenticate = jest.fn((strategy, options, cb) => () => {
      cb(null, { token: "987654" });
    });
    guard(req, res, next);
    expect(req.get).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalled();
    expect(res.json).toHaveReturnedWith({
      status: Status.ERROR,
      code: HttpCode.UNAUTHORIZED,
      message: Message.INVALID__DATA,
    });
  });
});
