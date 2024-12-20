class User {
  constructor(
    id,
    fullName,
    username,
    email,
    password,
    accountNumber,
    balance,
    phoneNumber,
    avatarUrl,
    role
  ) {
    this.id = id;
    this.full_name = fullName;
    this.username = username;
    this.email = email;
    this.password = password;
    this.account_number = accountNumber;
    this.balance = balance;
    this.phone_number = phoneNumber;
    this.avatar_url = avatarUrl;
    this.role = role;
  }
}

module.exports = User;
