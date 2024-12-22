class MatchHistory {
  constructor(
    id,
    room_id,
    player1,
    player2,
    winner,
    score_player1,
    score_player2
  ) {
    this.id = id;
    this.date = new Date();
    this.room_id = room_id;
    this.player1 = player1;
    this.player2 = player2;
    this.winner = winner;
    this.score_player1 = score_player1;
    this.score_player2 = score_player2;
  }
}
