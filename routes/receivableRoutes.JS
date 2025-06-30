const express = require("express");
const router = express.Router();
const {
  getReceivables,
  addReceivable,
  updateReceivable,
  deleteReceivable,
} = require("../controllers/receivableController");

router.get("/", getReceivables);
router.post("/", addReceivable);
router.put("/:id", updateReceivable);
router.delete("/:id", deleteReceivable);

module.exports = router;
