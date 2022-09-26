const express = require("express");
const router = express.Router();
const CostsController = require("../controllers/cost");
const auth = require("../middleware/auth");

router.get("/all", auth, CostsController.costs_get_all);

router.post("/add", auth, CostsController.costs_create_cost);

router.get("/:costId", auth, CostsController.costs_get_cost);

router.patch("/:costId", auth, CostsController.costs_update_cost);

module.exports = router;
