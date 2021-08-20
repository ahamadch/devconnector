const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");

// @route     api/users
// @desc      Register User Route
// @access    Public
router.post("/", [
  check("name", "Name is required.").not().isEmpty(),
  check("email", "Please enter a valid email.").isEmail(),
  check("password", "Please enter a password with minimum 6 characters.").isLength({ min: 6 }),
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({errors: errors.array()});
  }

  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      res.status(400).json({
        errors: [{
          msg: "User already exists"
        }]
      });
    }

    const avatar = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mm"
    });

    user = new User({
      name,
      email,
      password,
      avatar
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Return jsonwebtoken
    res.send("User Registered");
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error...");
  }
});

module.exports = router;