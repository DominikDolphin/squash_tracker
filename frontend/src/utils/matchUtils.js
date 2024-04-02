
/**
 * Checks the winner of a match by comparing the value of bestof and the result of each match in gamesData
 * @param {Array} gamesData - Array of games played in the match
 * @param {Number} bestOf - Total amount of games to be played in a match. This is not the amount needed to win the match.
 * @returns {Void} Returns user object if found, false otherwise.
*/
export const checkWinner = (gamesData, bestOf, players) => {
    if (gamesData.length === bestOf) {
      let player1Wins = 0;
      let player2Wins = 0;
      gamesData.forEach(game => {
        if (game.player1Score > game.player2Score) {
          player1Wins++;
        } else if (game.player1Score < game.player2Score) {
          player2Wins++;
        }
      });
  
      let winner = '';
      if (player1Wins > player2Wins) {
        winner = players[0].username;
      } else if (player1Wins < player2Wins) {
        winner = players[1].username;
      } else {
        return "Tie!"
      }
      return `🏆 Winner - ${winner} 🏆`;
    } else {
        return "⏳ In Progress ⏳";
    }
  };