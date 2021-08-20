const express = require("express");
const router = express.Router();

// @route     api/posts
// @desc      Register Posts
// @access    Public
router.post("/", (req, res) => {
  console.log(req.body);
  res.send("Posts Route");
});

module.exports = router;