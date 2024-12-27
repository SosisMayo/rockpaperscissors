require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || "your_jwt_secret",
  DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgresql://localhost:5432/your_database_name",
  REFRESH_TOKEN_LIFETIME: process.env.REFRESH_TOKEN_LIFETIME || "10d",
  ACCESS_TOKEN_LIFETIME: process.env.ACCESS_TOKEN_LIFETIME || "8h",
};
