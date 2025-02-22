const router = require("express").Router();
const { User } = require("../models/user.model");
const joi = require("joi");
const bcrypt = require("bcryptjs");
const joiPasswordComplexity = require("joi-password-complexity");

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      return res.status(401).send({ message: "Invalid email or password" });
    }

    const token = user.generateAuthToken();



    res.status(200).send({ data: token, message: "Logged in successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

const validate = (user) => {
  const schema = joi.object({
    email: joi.string().min(6).max(255).required().email().label("Email"),
    password: joiPasswordComplexity({
      min: 8,
      max: 255,
      lowerCase: 1,
      upperCase: 1,
      numeric: 1,
      symbol: 1,
      requirementCount: 2,
    }),
  });

  return schema.validate(user);
};

module.exports = router;
