const express = require("express");

const router = express.Router();

// import middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// import controllers
const {
  create,
  read,
  listAll,
  remove,
  update,
} = require("../controllers/product");

// routes
router.post("/product", authCheck, adminCheck, create);
router.get("/products/:count", listAll); // products/100
router.delete("/product/:slug", authCheck, adminCheck, remove);
router.get("/product/:slug", read);
router.put("/product/:slug", authCheck, adminCheck, update);

module.exports = router;
