"use strict";

//constants
var grid = document.querySelector(".game-grid");
var play = document.querySelector(".play");
var result = document.querySelector(".result");
var refresh = document.querySelector(".refresh"); //CONTROL BUTTONS

var left = document.querySelector(".left");
var right = document.querySelector(".right");
var fire = document.querySelector(".fire");
var position = grid.childNodes; //grid_square is a node list

var laser = 104;
var entity_postion = 104;
var score = 0;
var deadInvader; //setting up game grid

for (var i = 0; i < 110; i++) {
  grid_square = document.createElement("div");
  grid.appendChild(grid_square);
} //setting up the invaders positions


var invadersTopArray = [0, 1, 2, 3, 4];
var invadersMiddleArray = [11, 12, 13, 14, 15];
var invadersBottomArray = [22, 23, 24, 25, 26]; //assigning invaders to grid

var showInvader = function showInvader(invadersArr) {
  for (var _i = 0; _i < invadersArr.length; _i++) {
    position[invadersArr[_i]].classList.add("invaders");
  }
};

showInvader(invadersTopArray);
showInvader(invadersMiddleArray);
showInvader(invadersBottomArray); //invaders movement

var moveArray = function moveArray(invadersArr) {
  //declaring the last invader in each row
  var lastNumber = invadersArr[invadersArr.length - 1]; //declaring the first invader in each row and  removing them from array

  var firstItem = invadersArr.shift(); //removing class invaders from the previous first row invader

  position[firstItem].classList.remove("invaders"); //adding new invader at the end or array row to simulate movement

  invadersArr.push(lastNumber + 1);
}; //assigning enitity to grid
//default position bottom middle


position[entity_postion].classList.add("entity"); //function to remove explosion

function boomGone() {
  position[laser].classList.remove("boom");
} //--------------------------------------------------------------------------------------
//game activation by pressing play


play.addEventListener("click", function () {
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
    } //entity crashes into invader and explodes


    if (position[entity_postion].classList.contains("invaders")) {
      clearInterval(invaders);
      result.style.display = "block";
      position[entity_postion].classList.remove("entity");
      position[entity_postion].classList.remove("invaders");
      position[entity_postion].classList.add("crash");
      result.innerHTML = "YOU LOSE!";
    }
  }

  var invaders = setInterval(invaderMove, 200); //functions to call for user to move entity

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

  function shooting() {
    laser = entity_postion;
    position[entity_postion].classList.add("entity");

    function _laser() {
      position[laser].classList.remove("laser");
      laser -= 11;

      if (laser > 11) {
        position[laser].classList.add("laser");
      } else {
        clearInterval(laserGone);
      } //collision
      //stops lasers


      if (position[laser].classList.contains("invaders")) {
        console.log(laser); //explosion

        position[laser].classList.add("boom");
        setTimeout(boomGone, 5);

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
    } //speed 100ms


    var laserGone = setInterval(_laser, 25);
  } //CONTROL BUTTONS


  left.addEventListener("click", function () {
    position[entity_postion].classList.remove("entity");
    entityLeft();
  });
  right.addEventListener("click", function () {
    position[entity_postion].classList.remove("entity");
    entityRight();
  });
  fire.addEventListener("click", function () {
    shooting();
  }); //KEY CONTROLS

  document.onkeydown = detectArrow; //moving the entity

  function detectArrow(e) {
    position[entity_postion].classList.remove("entity"); //stays on bottom line

    switch (e.key) {
      case "ArrowLeft":
        //left arrow
        entityLeft();
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
  } //restart


  refresh.addEventListener("click", function () {
    //reset invader position
    refresh.style.display = "none";
    play.style.display = "block";
    result.style.display = "none";
    clearInterval(invaders);
    position[entity_postion].classList.remove("crash");
    result.innerHTML = "";
    position[entity_postion].classList.remove("entity");

    var removeInvader = function removeInvader(invadersArr) {
      for (var _i2 = 0; _i2 < invadersArr.length; _i2++) {
        position[invadersArr[_i2]].classList.remove("invaders");
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
}); //----------------------------------------------------------------------------