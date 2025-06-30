const express = require("express");
const router = express.Router();
const {
  getPayables,
  addPayable,
  updatePayable,
  deletePayable,
} = require("../controllers/payableController");

router.get("/", getPayables);
router.post("/", addPayable);
router.put("/:id", updatePayable);
router.delete("/:id", deletePayable);

module.exports = router;
