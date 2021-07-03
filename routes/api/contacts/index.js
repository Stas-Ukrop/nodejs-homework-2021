const express = require("express");
const router = express.Router();
const guard = require("../../../helpers/guard");
const {
  getAll,
  getById,
  create,
  update,
  remove,
} = require("../../../controllers/contacts");
const {
  validationCreateContact,
  validationUpdateContact,
  validationUpdateStatusContact,
} = require("./validation");

router.use((req, res, next) => {
  console.log(req.url);
  next();
});
router
  .get("/", guard, getAll)
  .post("/", guard, validationCreateContact, create);
router
  .get("/:id", guard, getById)
  .delete("/:id", guard, remove)
  .put("/:id", guard, validationUpdateContact, update);

router.patch("/:id/favorite", guard, validationUpdateStatusContact, update);

module.exports = router;
