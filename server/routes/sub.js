const express = require("express");

const router = express.Router();

// import middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// import controllers
const { create, read, update, remove, list } = require("../controllers/sub");

// routes
router.post("/sub", authCheck, adminCheck, create);
router.get("/sub/:slug", read);
router.put("/sub/:slug", authCheck, adminCheck, update);
router.delete("/sub/:slug", authCheck, adminCheck, remove);
router.get("/subs", list);

module.exports = router;
