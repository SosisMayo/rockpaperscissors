const loginUseCase = require("../../domain/usecases/auth/login");
const registerUseCase = require("../../domain/usecases/auth/register");

const login = async (req, res) => {
  try {
    console.log(req.body);
    const { user, accessToken, refreshToken } = await loginUseCase.login(
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        user: user,
        access_token: accessToken,
        refresh_token: refreshToken,
      },
    });
  } catch (error) {
    if (error.message === "User not found") {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (error.message === "Invalid Credentials") {
      return res.status(200).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const register = async (req, res) => {
  try {
    const { user, accessToken, refreshToken } = await registerUseCase.register(
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
  } catch (error) {
    if (error.message === "Username already in use") {
      return res.status(400).json({
        success: false,
        message: "Username already in use",
      });
    }
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  login,
  register,
};
