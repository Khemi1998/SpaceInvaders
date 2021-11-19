//constants
const grid = document.querySelector(".game-grid");
const play = document.querySelector(".gameAction");
const result = document.querySelector(".result");
const refresh = document.querySelector(".refresh");

const position = grid.childNodes;

//grid_square is a node list
let grid_square = [];
let laser = 104;
let entity_postion = 104;
let incrementer = 0;
let score = 0;

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
entity = position[entity_postion].classList.add("entity");

//restart
refresh.addEventListener("click", () => {
  location.reload();
});

//--------------------------------------------------------------------------------------

//game activation by pressing play
play.addEventListener("click", () => {
  play.style.display = "none";
  refresh.style.display = "block";

  function invaderMove() {
      moveArray(invadersTopArray);
      showInvader(invadersTopArray);
    
      moveArray(invadersMiddleArray);
      showInvader(invadersMiddleArray);
    
      moveArray(invadersBottomArray);
      showInvader(invadersBottomArray);
    
    //entity crashes into invader and explodes
    if (position[entity_postion].classList.contains("invaders")) {
      clearInterval(invaders);
      position[entity_postion].classList.remove("invaders");
      position[entity_postion].classList.add("boom")
      result.innerHTML="YOU LOSE!"
    }
  }

  const invaders = setInterval(invaderMove, 200);

  //document detect when arrows are pressed and runs function to move enitity
  document.onkeydown = detectArrow;

  //moving the entity
  function detectArrow(e) {
    position[entity_postion].classList.remove("entity");

    //stays on bottom line
    switch (e.key) {
      case "ArrowLeft":
        //left arrow
        if (entity_postion != 99) {
          entity_postion = entity_postion - 1;
          position[entity_postion].classList.add("entity");
        } else {
          position[entity_postion].classList.add("entity");
        }
        break;
      case "ArrowRight":
        //right arrow
        if (entity_postion != 109) {
          entity_postion = entity_postion + 1;
          entity = position[entity_postion].classList.add("entity");
        } else {
          entity = position[entity_postion].classList.add("entity");
        }
        break;
      case "ArrowUp":
        //up arrow
        //shooting
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


            if (invadersTopArray.includes(laser)) {
                invadersTopArray = invadersTopArray.filter(invader => invader != laser);
            }
            
             else if (invadersMiddleArray.includes(laser)) {
                invadersMiddleArray = invadersMiddleArray.filter(invader => invader != laser);
            } 
            
            else {
                invadersBottomArray = invadersBottomArray.filter(invader => invader != laser);
            }
            position[laser].classList.remove("invaders");
            position[laser].classList.remove("laser");
            clearInterval(laserGone);
            score++;
          }

          if (score === 15) {
            result.innerHTML = "YOU WON!";
          }
        }
        //speed 100ms
        const laserGone = setInterval(_laser, 20);
     break;
        default:
        position[entity_postion].classList.add("entity");
     break;
    }
  }
});

//----------------------------------------------------------------------------