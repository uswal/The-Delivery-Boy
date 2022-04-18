import {
  shuffle,
  randomNumber,
  getRadioValue,
  getCookie,
} from "./_functions.js";
import { allAddress, allPackages } from "./_data.js";
import { changeToDefaultMenu } from "./menu.js";

const user =
  getCookie("user") === undefined ? "GuestPlayer" : getCookie("user");
var currentLevel;
const maxLevel = 2;
var playState = "ASK_READY"; // SHEET RESULT GAME
var pairs = {};
var score = 0;
var isFinished = false;
var pointsHistory = [];

const frame = document.getElementById("frame");

function beginPlay() {
  currentLevel = 1;
  playState = "ASK_READY";
  pairs = {};
  score = 0;
  isFinished = false;
  pointsHistory = [];

  askReady();
  generateData();
}

function askReady() {
  playState = "ASK_READY";
  frame.innerHTML = `
  <div class="container ready col-flex">
  <h1 style="font-size:60px;margin-bottom: 20px;color:white">LEVEL ${currentLevel} <br> ARE YOU READY? </h1>
  <button
 
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
    if (time <= 5) document.getElementById("timer").style.color = "red";
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
  var numberOfHints = currentLevel - 1;
  var hintsUsed = 0;
  console.log(numberOfHints);

  startStuffs();
  function showPointsHistory(level, isFinished) {
    pointsHistory.push(
      `LEVEL ${currentLevel} | 1000 points credited for clearning the level.`
    );
    score += 1000;
    var list = "";
    pointsHistory.forEach((msg) => {
      list += `<label class="points-msg">${msg}</label>`;
    });
    frame.innerHTML = `
    <div class="container">
    <div class="level col-flex">
      <label class="points-hdr">POINTS HISTORY</label>
      <div class="col-flex" style="height: 65vh; overflow-y: auto">
      ${list}
      </div>
      <label class="points-total">TOTAL = ${score} points</label>

      <label><button id="next" class="points-next">NEXT</button></label>
    </div>
  </div>
  `;
    document
      .getElementById("next")
      .addEventListener("click", () => moveToNextLevel(isFinished));
  }

  function gameCompleted() {
    frame.innerHTML = `
    <div class="container">
    <div class="level">
      <form action="app.php" method="post" class="center col-flex">
        <label
          >CONGRATULATIONS!<br />
          YOU HAVE FINISHED THE GAME WITH A TOTAL OF <br /><b>${score} POINTS!</b> <br
        /></label>
        <input type="text" name="nick" value='${user}' style="visibility:hidden" />
        <input type="text" name="score" value='${score}' style="visibility:hidden" />
        <input id="main-menu" type="submit" value="BACK TO MAIN MENU" />
      
      </form>
    </div>
  </div>
    `;
    document
      .getElementById("new-game")
      .addEventListener("click", () => beginPlay());
    document
      .getElementById("main-menu")
      .addEventListener("click", () => changeToDefaultMenu());
  }
  function moveToNextLevel(isFinished) {
    incrementLevel();
    if (isFinished) {
      console.log("FINISHED");
      gameCompleted();
      return;
    }
    askReady();
    resetPairs();
    generateData();
    numberOfHints += 1;
  }

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

  function showHint() {
    const keys = shuffle(Object.keys(pairs));
    var time = 10;
    function renderHintContents() {
      var dataHtml = ``;
      var i = 1;
      keys.forEach((key) => {
        dataHtml += `
        <tr>
            <td>${i}</td>
            <td>${key}</td>
            <td style="text-align: left; padding:0 20px;">${pairs[key].packageName}</td>
            <td class="${pairs[key].status}">${pairs[key].status}</td>
        <tr>
        `;
        i++;
      });

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
        ${dataHtml}
      </table>
      <button id="continue" style="padding:10px 40px; margin-top: 50px; background-color: green; color: white; font-size: 28px">CONTINUE</button>
    
    </div>
    `;
    }

    const startHintTimer = setInterval(updateHintTimer, 1000);
    function updateHintTimer() {
      time--;
      if (time === 0) {
        stopHintTimer();
        return;
      }
      document.getElementById("timer").innerHTML = time;
      if (time <= 3) document.getElementById("timer").style.color = "red";
    }

    function stopHintTimer() {
      clearInterval(startHintTimer);
      startStuffs();
    }

    renderHintContents();
    updateHintTimer();

    document
      .getElementById("continue")
      .addEventListener("click", () => stopHintTimer());
  }

  function startStuffs() {
    showLoadingAnimation(keys[currentIndex]);
    setTimeout(questionTimer, 3000); // 3000
  }

  function moveToNextQuestion() {
    currentIndex++;
    if (currentIndex > maxIndex && currentLevel === maxLevel) isFinished = true;
    if (currentIndex > maxIndex) {
      showPointsHistory(currentLevel, isFinished);
    } else startStuffs();
  }

  function submitValue(address) {
    const submitTime = new Date().getTime();
    console.log(parseInt((submitTime - lastTime) / 1000));

    var value = getRadioValue("option");
    // "Address - {} | {} credited for correct delivery and {} points as bonus."
    // "Address - {} | no points awarded or deducted."
    // "Address - {} | {} points deducted for incorrect delivery"
    if (value === undefined) {
      pointsHistory.push(
        `LEVEL ${currentLevel} | Address - ${address} | no points awarded or deducted.`
      );
    } else if (value !== pairs[address].packageName) {
      score -= 10;
      //console.log("Points deducted -1 " + score);
      pointsHistory.push(
        `LEVEL ${currentLevel} | Address - ${address} | 10 points deducted for incorrect delivery.`
      );
      pairs[address].status = "Failed";
    } else if (value === pairs[address].packageName) {
      score += 100;
      const timeTook = parseInt((submitTime - lastTime) / 1000);
      const bonus = (10 - timeTook) * 10;
      score += bonus;
      pointsHistory.push(
        `LEVEL ${currentLevel} | Address - ${address} | 100 points credited for correct delivery and ${bonus} points as bonus.`
      );
      pairs[address].status = "Delivered";
    }

    deliveredPackages.push(value);
    console.log(deliveredPackages);
    console.log(score);
    console.log(pointsHistory);
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
      if (time <= 3) document.getElementById("timer").style.color = "red";
      if (time === 0) {
        // console.log("REACHED");
        stopQuestionTimer();
        submitValue(document.getElementById("add").innerHTML);
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
      const remainingHint = numberOfHints - hintsUsed;
      console.log(
        `Hints used ${hintsUsed} - Number of hints ${numberOfHints} - remaining hint ${remainingHint}`
      );
      var hintSvg = "";
      if (remainingHint > 0) {
        hintSvg = `
        <div id="hint" class="hint-container">
          <img class="svg" src="assets/hint.svg" />
          <div>${remainingHint}</div>
        </div>
        `;
      }

      frame.innerHTML = `
      <div class="container">
          ${hintSvg}
      

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
              <div class="section section1 col-flex">
                <label id="timer" style="font-size: 22px; font-weight: 900">10</label>
                <label style="font-size: 24px; margin: 50px 0"
                  >You have reached <span id="add">${address}</span>!</label
                >
                <img src="assets/house.png" style="width: 50%; padding-left: 25%" />
                <label style="font-size: 24px; margin: 50px 0"
                  >Select the package!</label
                >
              </div>
              <div class="section section2 col-flex">
                <div style="position:relative;top: 50%;left: 50%;transform:translate(-50%,-50%)">
                ${packageDivs}
                <button id="submit" style="padding: 6px 20px;">NEXT</button>
                </div>
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
      if (remainingHint > 0) {
        document.getElementById("hint").addEventListener("click", () => {
          stopQuestionTimer();
          showHint();
          hintsUsed++;
          pointsHistory.push(
            `LEVEL ${currentLevel} | 40 points deducted for using hint.`
          );
          score -= 40;
        });
      }
      //document.getElementById('p1').classList.remove('active');
    }
  }
}

export default beginPlay;
