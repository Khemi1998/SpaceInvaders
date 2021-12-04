//----------------------------------------------------------------------------------------------------VARIABLES--------------------------------------

//QUERYSELECTORS
const grid = document.querySelector(".game-grid");
const play = document.querySelector(".game__play");
const result = document.querySelector(".game__result");
const refresh = document.querySelector(".game__refresh");

//QUERYSELECTORS--CONTROL BUTTONS
const left = document.querySelector(".game__left");
const right = document.querySelector(".game__right");
const fire = document.querySelector(".game__fire");

const position = grid.childNodes;

let laser = 104;
let entity_postion = 104;
let score = 0;
let deadInvader;

//INVADER POSITION
let invadersTopArray = [0, 1, 2, 3, 4];
let invadersMiddleArray = [11, 12, 13, 14, 15];
let invadersBottomArray = [22, 23, 24, 25, 26];

//----------------------------------------------------------------------------------------------------FUNCTIONS--------------------------------------
//ASSIGNING INVADERS TO GRID
const showInvader = (invadersArr) => {
  for (let i = 0; i < invadersArr.length; i++) {
    position[invadersArr[i]].classList.add("invaders");
  }
};

//INVADER MOVEMENT
const moveArray = (invadersArr) => {
  let lastNumber = invadersArr[invadersArr.length - 1]; //declaring the last invader in each row
  let firstItem = invadersArr.shift(); //declaring the first invader in each row and  removing them from array
  position[firstItem].classList.remove("invaders"); //removing class invaders from the previous first row invader
  invadersArr.push(lastNumber + 1); //adding new invader at the end or array row to simulate movement
};

//REMOVE BOOM
const boomGone = () => {
  for (let i = 0; i < 110; i++) {
    position[i].classList.remove("boom");
  }
};

//SHOOTING
const shooting = () => {
  laser = entity_postion;
  position[entity_postion].classList.add("entity");

  const _laser = () => {
    position[laser].classList.remove("laser");
    laser -= 11;
    if (laser > 11) {
      position[laser].classList.add("laser");
    } else {
      clearInterval(laserGone);
    }

    //COLLISION
    if (position[laser].classList.contains("invaders")) {
      console.log(laser);

      //EXPLOSION
      position[laser].classList.add("boom");
      boomTime = setTimeout(boomGone, 50);

      if (invadersBottomArray.includes(laser)) {
        deadInvader = invadersBottomArray.indexOf(laser);
        invadersBottomArray.splice(deadInvader, 1);
      } else if (invadersMiddleArray.includes(laser)) {
        deadInvader = invadersMiddleArray.indexOf(laser);
        invadersMiddleArray.splice(deadInvader, 1);
      } else {
        deadInvader = invadersTopArray.indexOf(laser);
        invadersTopArray.splice(deadInvader, 1);
      }

      position[laser].classList.remove("invaders");
      position[laser].classList.remove("laser");
      clearInterval(laserGone);
      score++;
    }

    if (score === 15) {
      result.style.display = "block";
      result.innerHTML = "YOU WON!";
    }
  };
  const laserGone = setInterval(_laser, 25);
};

// ENTITY MOVEMENT
const entityLeft = () => {
  position[entity_postion].classList.remove("entity");
  if (entity_postion != 99) {
    entity_postion--;
    position[entity_postion].classList.add("entity");
  } else {
    position[entity_postion].classList.add("entity");
  }
};

const entityRight = () => {
  position[entity_postion].classList.remove("entity");
  if (entity_postion != 109) {
    entity_postion++;
    entity = position[entity_postion].classList.add("entity");
  } else {
    entity = position[entity_postion].classList.add("entity");
  }
};

//----------------------------------------------------------------------------------------------------START-UP-LOGIC----------------------------------

//GAME-GRID SET-UP
for (let i = 0; i < 110; i++) {
  grid_square = document.createElement("div");
  grid.appendChild(grid_square);
}

showInvader(invadersTopArray);
showInvader(invadersMiddleArray);
showInvader(invadersBottomArray);

//ASSIGNING ENTITY DEFAULT POSITION
position[entity_postion].classList.add("entity");

//CONTROL BUTTONS
left.addEventListener("click", entityLeft);

right.addEventListener("click", entityRight);

fire.addEventListener("click", shooting);

//GAME ACTIVATION
play.addEventListener("click", () => {
  play.style.display = "none";
  refresh.style.display = "block";

  //MOVING INVADER
  const invaderMove = () => {
    //if there are invaders in the row then move
    if (invadersTopArray.length > 0) {
      moveArray(invadersTopArray);
      showInvader(invadersTopArray);
    }

    if (invadersMiddleArray.length > 0) {
      moveArray(invadersMiddleArray);
      showInvader(invadersMiddleArray);
    }

    if (invadersBottomArray.length > 0) {
      moveArray(invadersBottomArray);
      showInvader(invadersBottomArray);
    }
    //entity crashes into invader and explodes
    if (position[entity_postion].classList.contains("invaders")) {
      clearInterval(invaders);
      result.style.display = "block";
      position[entity_postion].classList.remove("entity");
      position[entity_postion].classList.remove("invaders");
      position[entity_postion].classList.add("crash");
      result.innerHTML = "YOU LOSE!";
    }
  };
  const invaders = setInterval(invaderMove, 200);

  //KEY CONTROLS
  const detectArrow = (e) => {
    position[entity_postion].classList.remove("entity");

    //stays on bottom line
    switch (e.key) {
      case "ArrowLeft": //left arrow
        entityLeft();
        break;
      case "ArrowRight": //right arrow
        entityRight();
        break;
      case "ArrowUp": //up arrow
        shooting();
        break;
      default:
        position[entity_postion].classList.add("entity");
        break;
    }
  };

  document.onkeydown = detectArrow;

  //RESTART
  refresh.addEventListener("click", () => {
    refresh.style.display = "none";
    play.style.display = "block";
    result.style.display = "none";

    clearInterval(invaders);
    position[entity_postion].classList.remove("crash");
    result.innerHTML = "";
    position[entity_postion].classList.remove("entity");

    const removeInvader = (invadersArr) => {
      for (let i = 0; i < invadersArr.length; i++) {
        position[invadersArr[i]].classList.remove("invaders");
        position[invadersArr[i]].classList.remove("boom");
      }
    };

    removeInvader(invadersTopArray);
    removeInvader(invadersMiddleArray);
    removeInvader(invadersBottomArray);

    invadersTopArray = [0, 1, 2, 3, 4];
    invadersMiddleArray = [11, 12, 13, 14, 15];
    invadersBottomArray = [22, 23, 24, 25, 26];

    showInvader(invadersTopArray);
    showInvader(invadersMiddleArray);
    showInvader(invadersBottomArray);

    laser = 104;
    entity_postion = 104;
    score = 0;

    position[entity_postion].classList.add("entity");
  });
});
