const createUserUseCase = require("../../domain/usecases/user/createUser");
const getAllUsersUseCase = require("../../domain/usecases/user/getAllUsers");

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

module.exports = { createUser, getAllUsers };
