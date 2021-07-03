const express = require("express");
const router = express.Router();

const userRouter = require("./user");
const contactsRouter = require("./contacts");

router.use("/users", userRouter);
router.use("/contacts", contactsRouter);

module.exports = router;
