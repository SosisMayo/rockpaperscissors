class Statistic {
  constructor(id, user_id, win, lose, draw, win_streak, point) {
    this.id = id;
    this.user_id = user_id;
    this.win = win;
    this.lose = lose;
    this.draw = draw;
    this.win_streak = win_streak;
    this.point = point;
  }
}

module.exports = Statistic;
