const createUserUseCase = require("../../domain/usecases/user/createUser");
const getAllUsersUseCase = require("../../domain/usecases/user/getAllUsers");
const getUserByIdUseCase = require("../../domain/usecases/user/getUserById");
const updateUserUseCase = require("../../domain/usecases/user/updateUserById");
const deleteUserUseCase = require("../../domain/usecases/user/deleteUserById");

const createUser = async (req, res) => {
  try {
    const { user, accessToken, refreshToken } = await createUserUseCase.create(
      req.body
    );
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        user: user,
        access_token: accessToken,
        refresh_token: refreshToken,
      },
    });
  } catch (err) {
    if (err.message === "Username already in use") {
      return res.status(400).json({
        success: false,
        message: "Username already in use",
      });
    }
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersUseCase.getAllUsers();
    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: {
        users: users,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await getUserByIdUseCase.getUserById(req.params.id, req.user);
    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: {
        user: user,
      },
    });
  } catch (err) {
    if (err.message === "User not found") {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(500).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await updateUserUseCase.updateUserById(
      req.params.id,
      req.body
    );
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: {
        user: user,
      },
    });
  } catch (err) {
    if (err.message === "User not found") {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (err.message === "Username already in use") {
      return res.status(400).json({
        success: false,
        message: "Username already in use",
      });
    }
    return res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await deleteUserUseCase.deleteUserById(req.params.id);
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    if (err.message === "User not found") {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
