class User {
  constructor(id, username, email, password, avatarUrl, role) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.avatar_url = avatarUrl;
    this.role = role;
  }
}

module.exports = User;
