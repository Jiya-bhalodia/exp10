const User = require("../models/User");
const AppError = require("../utils/AppError");
const { successResponse } = require("../utils/apiResponse");

const getUsers = async (req, res) => {
  const users = await User.find();

  return successResponse(
    res,
    200,
    "Users retrieved successfully",
    users
  );
};

const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw new AppError(
      "User not found",
      404,
      "USER_NOT_FOUND"
    );
  }

  return successResponse(
    res,
    200,
    "User retrieved successfully",
    user
  );
};

const createUser = async (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    throw new AppError(
      "Name, email and age are required",
      400,
      "INVALID_USER_DATA"
    );
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError(
      "Email already registered",
      409,
      "EMAIL_ALREADY_EXISTS"
    );
  }

  const user = await User.create({
    name,
    email,
    age
  });

  return successResponse(
    res,
    201,
    "User created successfully",
    user
  );
};

module.exports = {
  getUsers,
  getUser,
  createUser
};