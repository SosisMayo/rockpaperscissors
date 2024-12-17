module.exports = {
  roles: {
    user: ["readProfile", "updateProfile"],
    moderator: ["readProfile", "updateProfile", "deleteUser"],
    admin: ["readProfile", "updateProfile", "deleteUser", "manageRoles"],
  },
};
