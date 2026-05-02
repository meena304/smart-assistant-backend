const express = require("express");
const { getSharedContent } = require("../controllers/ShareController");

const router = express.Router();

router.get("/:id", getSharedContent);

module.exports = router;
