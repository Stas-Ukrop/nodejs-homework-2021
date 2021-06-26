const express = require("express");
const router = express.Router();
const ctr = require("../../../controllers/user");
const guard = require("../../../helpers/guard");
const {
  validationCreateUser,
  validationUpdateUser,
  validationUpdateSubscription,
} = require("./validation");

router.post("/signup", validationCreateUser, ctr.register);
router.post("/login", validationUpdateUser, ctr.login);
router.post("/logout", guard, ctr.logout);
router.get("/current", guard, ctr.current);
router.patch(
  "/subscription",
  guard,
  validationUpdateSubscription,
  ctr.updateSubscription
);

module.exports = router;