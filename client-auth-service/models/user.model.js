const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const joi = require("joi");
const joiPasswordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
    minlength: [2, "First name must be at least 2 characters long"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
    minlength: [2, "Last name must be at least 2 characters long"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    trim: true,
    minlength: [3, "Username must be at least 3 characters long"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (value) => {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
      },
    },
    message: (props) => `${props.value} is not a valid email address`,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
    minlength: [8, "Password must be at least 8 characters long"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  console.log(token);
  return token;
};


const User = mongoose.model("user", userSchema);

const validateUser = (user) => {
  const schema = joi.object({
    firstName: joi.string().min(2).max(255).required().label("First Name"),
    lastName: joi.string().min(2).max(255).required().label("Last Name"),
    username: joi.string().min(3).max(255).required(),
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

module.exports = { User, validateUser };
