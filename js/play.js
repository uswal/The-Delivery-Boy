import { shuffle, randomNumber } from "./_functions.js";
import { allAddress, allPackages } from "./_data";

var currentLevel = 1;
const maxLevel = 5;
var playState = "ASK_READY"; // SHEET RESULT GAME
var pairs = {};

const frame = document.getElementById("frame");

function beginPlay() {
  currentLevel = 1;
  maxLevel = 5;
  playState = "ASK_READY";
  askReady();
}

function askReady() {
  playState = "ASK_READY";
  frame.innerHTML = `
  <div class="container ready">
  <button
        style="
          background-color: green;
          color: white;
          font-size: 60px;
          padding: 20px 80px;
          font-size: 900;
        "
        id="i-m-ready"
      >
        I AM READY
      </button>
  </div>    
    `;
  document.getElementById("i-am-ready").addEventListener("click", generateData);
}

function showSheet() {
  return 0;
}

function generateData() {
  var numberOfPairs = currentLevel * 2 + 2; // 4 6 8 10 12

  var fromIndex = randomNumber(0, 19 - numberOfPairs); //19 - Number of Items in DATA
  var slicedPackages = allPackages.slice(fromIndex, fromIndex + numberOfPairs);

  fromIndex = randomNumber(0, 19 - numberOfPairs);
  var slicedAddress = allAddress.slice(fromIndex, fromIndex + numberOfPairs);

  slicedAddress = shuffle(slicedAddress);
  slicedPackages = shuffle(slicedPackages);

  for (var i = 0; i < slicedAddress.length; i++) {
    pairs.slicedAddress[i] = slicedPackages[i];
  }

  console.log(pairs);
}

export default beginPlay;
