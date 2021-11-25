//constants
const grid = document.querySelector(".game-grid");
const play = document.querySelector(".game__play");
const result = document.querySelector(".game__result");
const refresh = document.querySelector(".game__refresh");

//CONTROL BUTTONS
const left = document.querySelector(".game__left");
const right = document.querySelector(".game__right");
const fire = document.querySelector(".game__fire")

const position = grid.childNodes;

//grid_square is a node list
let laser = 104;
let entity_postion = 104;
let score = 0;
let deadInvader;

//setting up game grid
for (let i = 0; i < 110; i++) {
  grid_square = document.createElement("div");

  grid.appendChild(grid_square);
}

//setting up the invaders positions
let invadersTopArray = [0, 1, 2, 3, 4];
let invadersMiddleArray = [11, 12, 13, 14, 15];
let invadersBottomArray = [22, 23, 24, 25, 26];

//assigning invaders to grid
const showInvader = invadersArr => {
  for (let i = 0; i < invadersArr.length; i++) {
    position[invadersArr[i]].classList.add("invaders");
  }
};

showInvader(invadersTopArray);
showInvader(invadersMiddleArray);
showInvader(invadersBottomArray);

//invaders movement
const moveArray = invadersArr => {

    //declaring the last invader in each row
    let lastNumber = invadersArr[invadersArr.length - 1];

    //declaring the first invader in each row and  removing them from array
    let firstItem = invadersArr.shift();

    //removing class invaders from the previous first row invader
    position[firstItem].classList.remove("invaders");

    //adding new invader at the end or array row to simulate movement
    invadersArr.push(lastNumber + 1);
  };

//assigning enitity to grid
//default position bottom middle
position[entity_postion].classList.add("entity");

//function to remove explosion
function boomGone() {
    position[laser].classList.remove("boom");
}


//shooting function
function shooting(){
  laser = entity_postion;

  position[entity_postion].classList.add("entity");

  function _laser() {
    position[laser].classList.remove("laser");
    laser -= 11;
    if (laser > 11) {
      position[laser].classList.add("laser");
    } else {
      clearInterval(laserGone);
    }

    //collision
    //stops lasers
    if (position[laser].classList.contains("invaders")) {
      console.log(laser);

      //explosion
      position[laser].classList.add("boom");
      boomTime = setTimeout(boomGone, 50);

      if (invadersBottomArray.includes(laser)) {
        deadInvader= invadersBottomArray.indexOf(laser);
        invadersBottomArray.splice(deadInvader,1);

        } else if (invadersMiddleArray.includes(laser)) {
          deadInvader= invadersMiddleArray.indexOf(laser);
          invadersMiddleArray.splice(deadInvader,1);

        } else {
          deadInvader= invadersTopArray.indexOf(laser);
          invadersTopArray.splice(deadInvader,1);
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
  }
  //speed 25ms
  const laserGone = setInterval(_laser, 25);
}

//--------------------------------------------------------------------------------------

//game activation by pressing play
play.addEventListener("click", () => {
  play.style.display = "none";
  refresh.style.display = "block";

  function invaderMove() {
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
      position[entity_postion].classList.remove("entity")
      position[entity_postion].classList.remove("invaders");
      position[entity_postion].classList.add("crash")
      result.innerHTML="YOU LOSE!"
    }
  }

  const invaders = setInterval(invaderMove, 200);


//functions to call for user to move entity
function entityLeft() {
  if (entity_postion != 99) {
    entity_postion = entity_postion - 1;
    position[entity_postion].classList.add("entity");
  } else {
    position[entity_postion].classList.add("entity");
  }
}

function entityRight() {
  if (entity_postion != 109) {
    entity_postion = entity_postion + 1;
    entity = position[entity_postion].classList.add("entity");
  } else {
    entity = position[entity_postion].classList.add("entity");
  }
}

  //CONTROL BUTTONS
left.addEventListener("click", () => {
  position[entity_postion].classList.remove("entity");
  entityLeft();
 });

 right.addEventListener("click", () => {
  position[entity_postion].classList.remove("entity");
  entityRight()
 });
  //KEY CONTROLS
  document.onkeydown = detectArrow;

  //moving the entity
  function detectArrow(e) {
    position[entity_postion].classList.remove("entity");

    //stays on bottom line
    switch (e.key) {
      case "ArrowLeft":
        //left arrow
        entityLeft()
        break;
      case "ArrowRight":
        //right arrow
        entityRight();
        break;
      case "ArrowUp":
        shooting();
     break;
        default:
        position[entity_postion].classList.add("entity");
     break;
    }
  }

  //RESTART
refresh.addEventListener("click", () => {
    //reset invader position
  refresh.style.display = "none";
  play.style.display = "block";
  result.style.display = "none";

  clearInterval(invaders);
  position[entity_postion].classList.remove("crash");
  result.innerHTML="";
  position[entity_postion].classList.remove("entity");
  
  const removeInvader = invadersArr => {
      for (let i = 0; i < invadersArr.length; i++) {
        position[invadersArr[i]].classList.remove("invaders");
        position[invadersArr[i]].classList.remove("boom")
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

//---------------------------------------------------------------------------

