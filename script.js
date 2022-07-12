window.onload = function () {
  const $computer = document.querySelector("#computer");
  const $score = document.querySelector("#score");
  const $rock = document.querySelector("#rock");
  const $scissors = document.querySelector("#scissors");
  const $paper = document.querySelector("#paper");
  const IMG_URL = "./rsp.png";
  $computer.style.background = `url(${IMG_URL}) 0 0`;
  $computer.style.backgroundSize = "auto 200px";
  const rspX = {
    scissors: "0", // 가위
    rock: "-220px", // 바위
    paper: "-440px", // 보
  };

  let computerChoice = "scissors";
  const changeComputerHand = () => {
    if (computerChoice === "rock") {
      computerChoice = "scissors";
    } else if (computerChoice === "scissors") {
      computerChoice = "paper";
    } else if (computerChoice === "paper") {
      computerChoice = "rock";
    }
    $computer.style.background = `url(${IMG_URL}) ${rspX[computerChoice]} 0`;
    $computer.style.backgroundSize = "auto 200px";
  };
  let intervalId = setInterval(changeComputerHand, 50);

  const scoreTable = {
    rock: 0,
    scissors: -1,
    paper: 1,
  };

  let clickable = true;
  let me = 0;
  let computer = 0;

  const clickButton = (event) => {
    if (clickable) {
      clearInterval(intervalId);
      clickable = false;
      const myChoice =
        event.target.textContent === "바위"
          ? "rock"
          : event.target.textContent === "가위"
          ? "scissors"
          : "paper";
      const myScore = scoreTable[myChoice];
      const computerScore = scoreTable[computerChoice];
      const diff = myScore - computerScore;
      let message;
      if ([-2, 1].includes(diff)) {
        me += 1;
        message = "승리";
      } else if ([2, -1].includes(diff)) {
        computer += 1;
        message = "패배";
      } else if (diff === 0) {
        message = "무승부";
      }

      console.log(me, computer);

      $score.textContent = `${message} 나: ${me}점 컴퓨터: ${computer}`;

      if (me > 2 || computer > 2) {
        if (me > 2) {
          $score.textContent = `축하합니다! 가위바위보 게임에서 ${me} : ${computer}로 이겼습니다!`;
        }
        if (computer > 2) {
          $score.textContent = `아쉽네요! 가위바위보 게임에서 ${me} : ${computer}로 졌습니다!`;
        }
        return;
      }
      setTimeout(() => {
        clickable = true;
        intervalId = setInterval(changeComputerHand, 50);
      }, 1000);
    }
  };
  $rock.addEventListener("click", clickButton);
  $scissors.addEventListener("click", clickButton);
  $paper.addEventListener("click", clickButton);
};
