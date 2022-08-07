const express = require("express");
const router = express.Router();
const CostsController = require("../controllers/cost");

router.get("/all", CostsController.costs_get_all);

router.post("/add", CostsController.costs_create_cost);

router.get("/:costId", CostsController.costs_get_cost);

router.patch("/:costId", CostsController.costs_update_cost);

module.exports = router;
