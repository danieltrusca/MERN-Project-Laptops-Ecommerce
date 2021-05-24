const express = require("express");

const router = express.Router();

// import middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// import controllers
const {
  create,
  read,
  update,
  remove,
  list,
} = require("../controllers/category");

// routes
router.post("/category", authCheck, adminCheck, create);
router.get("/category/:slug", read);
router.put("/category/:slug", authCheck, adminCheck, update);
router.delete("/category/:slug", authCheck, adminCheck, remove);
router.get("/categories", list);
module.exports = router;
