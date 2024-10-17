const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const loginUser = async (email, password) => {
  const filter = {
    email: email,
    deletedAt: null,
  };
  const user = await User.findOne(filter);
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });

  return { token, user };
};

const registerUser = async (email, password, name) => {
  const filter = {
    email: email,
  };
  let user = await User.findOne(filter);
  
  if (user) {
    if (!user.deletedAt) {
      throw new Error("Email already in use");
    }
    user.deletedAt = null;
    user.name = name;
    user.password = password;
    await user.save();
    return user;
  }

  try {
    user = new User({ email: email, password, name });
    await user.save();
  } catch (error) {
    throw error;
  }

  return user;
};


module.exports = {
  loginUser,
  registerUser,
  resetPassword,
};
