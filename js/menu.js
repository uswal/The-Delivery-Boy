import beginPlay from "./play.js";
import { getCookie } from "./_functions.js";

console.log("JS LOADED?");
var menuState = "LEADERBOARD"; // MENU  TUTORIAL LEADERBOARD PLAY
//var playState = "SHEET"; // ARE_YOU_READY SHEET LEVEL HINTS RESULT
const frame = document.getElementById("frame");
const user =
  getCookie("user") === undefined ? "GuestPlayer" : getCookie("user");
console.log(user);

function changeToDefaultMenu() {
  menuState = "MENU";
  const st =
    user === "GuestPlayer" ? `<a href="login.php" id="logi">LOGIN</a>` : "";
  frame.innerHTML = `
          ${st}
          <div class="container col-flex menu">
            
            <label class="header">Welcome, ${user} </label>
            <label class="header" id="hdr">MENU</label>
            <label class="big-option" id="play">PLAY</label>
            <label class="big-option" id="tutorial">TUTORIAL</label>
            <label class="big-option" id="leaderboard">LEADERBOARD</label>
          </div>
            `;
  document
    .getElementById("leaderboard")
    .addEventListener("click", () => changeToLeaderboard());
  document.getElementById("play").addEventListener("click", () => beginPlay());
  document.getElementById("tutorial").addEventListener("click", tut);
  function tut() {
    window.location.href = "basics.php#game-mode";
  }
}

function changeToLeaderboard() {
  menuState = "LEADERBOARD";
  window.location.href = "leaderboard.php";
  /*frame.innerHTML = `
    <div class="container col-flex leaderboard">
      <label class="header">LEADERBOARD</label>
      <table>
        <tr>
          <th>Rank</th>
          <th>Username</th>
          <th>High Score</th>
        </tr>
        <tr>
          <td>1</td>
          <td>Oswald</td>
          <td>1200Points</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Oswald</td>
          <td>1200Points</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Oswald</td>
          <td>1200Points</td>
        </tr>
      </table>

      <div>
        <button>PREVIOUS</button>
        <button>NEXT</button>
      </div>

      <button id="main-menu">BACK TO MAIN MENU</button>
    </div>
    `;
  document
    .getElementById("main-menu")
    .addEventListener("click", () => changeToDefaultMenu());*/
}
changeToDefaultMenu();

export { changeToDefaultMenu };
