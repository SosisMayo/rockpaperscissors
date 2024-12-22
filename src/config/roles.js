module.exports = {
  roles: {
    user: ["readProfile", "updateProfile", "deleteUser"],
    admin: ["readProfile", "updateProfile", "deleteUser", "manageRoles"],
  },
};
