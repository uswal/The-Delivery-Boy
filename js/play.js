import { shuffle, randomNumber, getRadioValue } from "./_functions.js";
import { allAddress, allPackages } from "./_data.js";

var currentLevel = 1;
const maxLevel = 3;
var playState = "ASK_READY"; // SHEET RESULT GAME
var pairs = {};
var score = 0;
var isFinished = false;

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
  <h1 style="font-size:60px;margin-bottom: 20px;">LEVEL ${currentLevel} <br> Are you ready? </h1>
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

function incrementLevel() {
  console.log(currentLevel);
  if (currentLevel < maxLevel) currentLevel++;
  else {
    //You have completed the game, show some frame
    console.log(`Increment level - ${currentLevel}`);
  }
}

function resetPairs() {
  pairs = {};
}

function showSheet() {
  const dataHTML = generateSheetContents();
  var time = 10 + currentLevel * 4;

  frame.innerHTML = `
    <div class="container sheet">
      <label id="timer">${time}</label>
      <table id="sheet-table">
        <tr>
          <th style="padding: 10px 40px">Serial</th>
          <th style="padding: 10px 40px">Pincode</th>
          <th style="padding: 10px 200px">Package_Name</th>
          <th style="padding: 10px 40px">Status</th>
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
    startLevel("f");
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

function startLevel() {
  //Double nested function atm
  const keys = Object.keys(pairs);
  const shuffleKeys = shuffle(Object.keys(pairs));
  var currentIndex = 0;
  const maxIndex = keys.length - 1;
  var deliveredPackages = [];
  var time = 10;
  var lastTime = 0;

  startStuffs();

  function showLoadingAnimation(address) {
    frame.innerHTML = `
    <div class="container">
        <div class="level">
          <img class="img" id="logo" src="assets/slide1-logo.png" />
          <h1 id="loading-msg">WE WILL SOON REACH THE ADDRESS ${address}</h1>
        </div>
      </div>
    `;
  }

  function startStuffs() {
    showLoadingAnimation(keys[currentIndex]);
    setTimeout(questionTimer, 0); // 3000
  }

  function moveToNextQuestion() {
    currentIndex++;
    if (currentIndex > maxIndex && currentLevel === maxLevel) isFinished = true;
    if (currentIndex > maxIndex) {
      incrementLevel();
      if (isFinished) {
        console.log("FINISHED");
        return;
      }
      askReady();
      resetPairs();
      generateData();
      //console.log("reached");
    } else startStuffs();
  }

  function submitValue(address) {
    const submitTime = new Date().getTime();
    console.log(parseInt((submitTime - lastTime) / 1000));
    var value = getRadioValue("option");
    if (value === undefined) {
      // Do nothing
    } else if (value !== pairs[address].packageName) {
      score -= 10;
      console.log("Points deducted -1 " + score);
    } else if (value === pairs[address].packageName) {
      score += 100;
      const timeTook = parseInt((submitTime - lastTime) / 1000);
      score += (10 - timeTook) * 10;
    }
    deliveredPackages.push(value);
    console.log(deliveredPackages);
    console.log(score);
    moveToNextQuestion();
  }

  function questionTimer() {
    time = 10;
    askQuestion(keys[currentIndex]);
    const questionInterval = setInterval(updateQuestionTimer, 1000);

    function updateQuestionTimer() {
      time--;
      if (time < 10) {
        document.getElementById("timer").innerHTML = time;
      }
      if (time === 0) {
        // console.log("REACHED");
        stopQuestionTimer();
      }
    }
    function stopQuestionTimer() {
      clearInterval(questionInterval);
    }

    function askQuestion(address) {
      /*
{
    "500114": {
        "packageName": "PARAGON Men Stimulus Sandal",
        "status": "Undelivered"
    },
    "500115": {
        "packageName": "Park Avenue Beer Shampoo",
        "status": "Undelivered"
    },
    "500116": {
        "packageName": "Philips BT2303/15 Trimmer",
        "status": "Undelivered"
    },
    "500117": {
        "packageName": "Nescafe Classic Coffee",
        "status": "Undelivered"
    }
}
      */

      //GENERATE PACKAGE BUTTONS
      var packageDivs = ``;
      var hidRadios = ``;
      var removeActiveClassFromAll = ``;

      for (var i = 0; i < keys.length; i++) {
        if (pairs[keys[i]].status === "Undelivered")
          removeActiveClassFromAll += `document.getElementById('p${i}').classList.remove('active');`;
      }

      for (var i = 0; i < keys.length; i += 2) {
        var isSubmitted1 = "";
        var isSubmitted2 = "";
        var e1 = `${removeActiveClassFromAll}document.getElementById('o${i}').checked = true;document.getElementById('p${i}').classList.add('active');`;
        var e2 = `${removeActiveClassFromAll}document.getElementById('o${
          i + 1
        }').checked = true;document.getElementById('p${
          i + 1
        }').classList.add('active');`;

        if (
          deliveredPackages.indexOf(pairs[shuffleKeys[i]].packageName) !== -1
        ) {
          isSubmitted1 = "delivered-package";
          e1 = "";
        }
        if (
          deliveredPackages.indexOf(pairs[shuffleKeys[i + 1]].packageName) !==
          -1
        ) {
          isSubmitted2 = "delivered-package";
          e2 = "";
        }

        hidRadios += `<input type="radio" name="option" id="o${i}" value='${
          pairs[shuffleKeys[i]].packageName
        }' disabled /><input type="radio" name="option" value='${
          pairs[shuffleKeys[i + 1]].packageName
        }' id="o${i + 1}" disabled />`;

        packageDivs += `
        <div class="row-flex">
                  <div
                    class="package ${isSubmitted1}"
                    id="p${i}"
                    onclick="${e1}"
                  >
                    ${pairs[shuffleKeys[i]].packageName}
                  </div>
                  <div
                    class="package ${isSubmitted2}"
                    id="p${i + 1}"
                    onclick="${e2}"
                  >
                  ${pairs[shuffleKeys[i + 1]].packageName}
                  </div>
        </div>
        `;
      }
      //console.log(removeActiveClassFromAll);
      frame.innerHTML = `
      <div class="container">
          <div class="level">
            <div
              class="quiz"
              style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              "
            >
              <div class="section col-flex">
                <label id="timer" style="font-size: 22px; font-weight: 900">10</label>
                <label style="font-size: 24px; margin: 50px 0"
                  >You have reached ${address}!</label
                >
                <img src="assets/house.png" style="width: 50%; padding-left: 25%" />
                <label style="font-size: 24px; margin: 50px 0"
                  >Select the package!</label
                >
              </div>
              <div class="section col-flex">
                ${packageDivs}
                <button id="submit">SUBMIT</button>
              </div>
              <div class="hidden-radios col-flex">
                ${hidRadios}
              </div>
            </div>
          </div>
        </div>
      `;
      lastTime = new Date().getTime();
      document.getElementById("submit").addEventListener("click", () => {
        stopQuestionTimer();
        submitValue(address);
      });
      //document.getElementById('p1').classList.remove('active');
    }
  }
}

export default beginPlay;
