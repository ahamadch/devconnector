const express = require("express");
const router = express.Router();

// @route     api/auth
// @desc      Auth Route
// @access    Public
router.get("/", (req, res) => res.send("Auth Route"));

module.exports = router;