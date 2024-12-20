class User {
  constructor(
    id,
    username,
    email,
    password,
    avatarUrl,
    role,
    totalMatch = 0,
    totalWin = 0,
    totalLose = 0,
    totalDraw = 0,
    winStreak = 0,
    loseStreak = 0,
    lastMatch = 0,
    point = 0
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.avatar_url = avatarUrl;
    this.role = role;
    this.total_match = totalMatch;
    this.total_win = totalWin;
    this.total_lose = totalLose;
    this.total_draw = totalDraw;
    this.win_streak = winStreak;
    this.lose_streak = loseStreak;
    this.last_match = lastMatch;
    this.point = point;
  }
}

module.exports = User;
