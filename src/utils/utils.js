function determineWinner(player, enemy) {
  const winnerDisplay = document.querySelector("#winner-display");
  let winner = "TIE";

  if (player.health === enemy.health) {
    winner = "TIE";
  } else if (player.health > enemy.health) {
    winner = "PLAYER 1";
  } else {
    winner = "PLAYER 2";
  }

  winnerDisplay.textContent = winner === "TIE" ? "TIE!" : `${winner} WINS!`;
  winnerDisplay.style.display = "flex";
}

export default function showHealthBarsAndTimer(display) {
  let healthBarsAndTimer = document.querySelectorAll("#ui-container");

  if (display) {
    healthBarsAndTimer.forEach((element) => {
      element.style.display = "flex";
    });
  } else {
    healthBarsAndTimer.forEach((element) => {
      element.style.display = "none";
    });
  }
}
