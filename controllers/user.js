const User = require("../repositories/user");
const {
  Status,
  HttpCode,
  Message,
  createResponse,
} = require("../helpers/constants");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;

const register = async (req, res, next) => {
  try {
    const user = await User.findByEmail(req.body.email);
    if (user) {
      return res.status(HttpCode.CONFLICT).json(
        createResponse(Status.ERROR, HttpCode.CONFLICT, {
          message: Message.EMAIL_USE,
        })
      );
    }
    const { id, name, email, subscription } = await User.create(req.body);
    res.status(HttpCode.CREATER).json(
      createResponse(Status.SUCCESS, HttpCode.CREATER, {
        data: { id, name, email, subscription },
      })
    );
  } catch (e) {
    next(e);
  }
};
const login = async (req, res, next) => {
  try {
    const user = await User.findByEmail(req.body.email);
    const isValidPass = await user?.isValidPassword(req.body.password);
    if (!user || !isValidPass) {
      return res.status(HttpCode.UNAUTHORIZED).json(
        createResponse(Status.ERROR, HttpCode.UNAUTHORIZED, {
          message: Message.INVALID__DATA,
        })
      );
    }
    const { id, subscription } = user;
    const payload = { id, subscription };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });
    await User.updateToket(id, token);
    res.status(HttpCode.OK).json(
      createResponse(Status.SUCCESS, HttpCode.OK, {
        data: { id, token, subscription },
      })
    );
  } catch (e) {
    next(e);
  }
};
const logout = async (req, res, next) => {
  try {
    const id = req.user.id;
    await User.updateToket(id, null);
    res.status(HttpCode.NO_CONTENT).json({});
  } catch (e) {
    next(e);
  }
};

const current = async (req, res, next) => {
  try {
    const token = await req.user.token;
    const user = await User.findByToken(token);
    if (user) {
      res
        .status(HttpCode.OK)
        .json(createResponse(Status.SUCCESS, HttpCode.SUCCESS, { data: user }));
    }

    res
      .status(HttpCode.UNAUTHORIZED)
      .json(Status.UNAUTHORIZED, HttpCode.UNAUTHORIZED, {
        message: Message.UNAUTHORIZED,
      });
  } catch (e) {
    next(e);
  }
};

const updateSubscription = async (req, res, next) => {
  try {
    const id = req.user._id;
    const newResult = await User.changeSubscription(id, req.body);
    if (newResult) {
      res
        .status(HttpCode.OK)
        .json(
          createResponse(Status.SUCCESS, HttpCode.OK, { data: { newResult } })
        );
    }
    res.status(HttpCode.BAD_REQYEST).json(
      createResponse(Status.BAD_REQYEST, HttpCode.BAD_REQYEST, {
        message: Message.BAD_REQYEST,
      })
    );
  } catch (e) {
    next(e);
  }
};
module.exports = {
  register,
  login,
  logout,
  current,
  updateSubscription,
};