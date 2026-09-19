const express = require("express");
const { allUserController } = require("../controllers/adminController");
const router = express.Router();

router.post("/delete/vendor");
router.get("/all-user", allUserController);

module.exports = router;
