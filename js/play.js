import { shuffle, randomNumber } from "./_functions.js";
import { allAddress, allPackages } from "./_data.js";

var currentLevel = 1;
const maxLevel = 5;
var playState = "ASK_READY"; // SHEET RESULT GAME
var pairs = {};

const frame = document.getElementById("frame");

function beginPlay() {
  currentLevel = 1;
  playState = "ASK_READY";
  askReady();
  generateData();
}

function askReady() {
  playState = "ASK_READY";
  frame.innerHTML = `
  <div class="container ready col-flex">
  <h1 style="font-size:60px;margin-bottom: 20px;">Are you ready? </h1>
  <button
        style="
          background-color: green;
          color: white;
          font-size: 60px;
          padding: 14px 80px;
          font-size: 900;
        "
        id="i-m-ready"
      >
        YES
      </button>
  </div>    
    `;
  document
    .getElementById("i-m-ready")
    .addEventListener("click", () => showSheet());
}

function showSheet() {
  const dataHTML = generateSheetContents();
  var time = 10 + currentLevel * 4;

  frame.innerHTML = `
    <div class="container sheet">
      <label id="timer">${time}</label>
      <table id="sheet-table">
        <tr>
          <th style="padding: 20px 40px">Serial</th>
          <th style="padding: 20px 40px">Address</th>
          <th style="padding: 20px 200px">Package_Name</th>
          <th style="padding: 20px 40px">Status</th>
        </tr>
        ${dataHTML}
      </table>
      <button id="continue" style="padding:10px 40px; margin-top: 50px; background-color: green; color: white; font-size: 28px">CONTINUE</button>
    </div>
    `;

  const timer = setInterval(updateTimer, 1000);
  const timerElement = document.getElementById("timer");
  document
    .getElementById("continue")
    .addEventListener("click", () => stopTimer());

  function updateTimer() {
    time--;
    timerElement.innerHTML = time;
    if (time == 0) stopTimer();
  }
  function stopTimer() {
    clearInterval(timer);
  }
}

function generateSheetContents() {
  const keys = shuffle(Object.keys(pairs));
  var html = ``;
  var i = 1;
  keys.forEach((key) => {
    html += `
        <tr>
            <td>${i}</td>
            <td>${key}</td>
            <td style="text-align: left; padding:0 20px;">${pairs[key].packageName}</td>
            <td class="${pairs[key].status}">${pairs[key].status}</td>
        <tr>
        `;
    i++;
  });
  return html;
}
function generateData() {
  var numberOfPairs = currentLevel * 2 + 2; // 4 6 8 10 12

  var fromIndex = randomNumber(0, allPackages.length - 1 - numberOfPairs);
  var slicedPackages = allPackages.slice(fromIndex, fromIndex + numberOfPairs);

  fromIndex = randomNumber(0, 19 - numberOfPairs);
  var slicedAddress = allAddress.slice(fromIndex, fromIndex + numberOfPairs);

  slicedAddress = shuffle(slicedAddress);

  for (var i = 0; i < slicedAddress.length; i++) {
    pairs[slicedAddress[i]] = {
      packageName: slicedPackages[i],
      status: "Undelivered",
    };
  }

  console.log(pairs);
}

export default beginPlay;
