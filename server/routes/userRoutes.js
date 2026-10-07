const express = require("express");

const {
  getUsers,
  getUser,
  createUser
} = require("../controllers/userController");

const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.get("/", asyncHandler(getUsers));

router.get("/:id", asyncHandler(getUser));

router.post("/", asyncHandler(createUser));

module.exports = router;