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
let score = 0;

//setting up game grid
for (let i=0; i < 110; i++){
    grid_square = document.createElement("div");

    grid.appendChild(grid_square);

}

//setting up the invaders positions
//constantly changing
let invadersToparr = [ 0, 1, 2, 3, 4];
let invadersMiddlearr = [11, 12, 13, 14, 15];
let invadersBottomarr = [22, 23, 24, 25, 26];

//assigning invaders to grid function 
const showInvader =invadersArr => {
    for (let i=0; i < invadersArr.length; i++){
    position[invadersArr[i]].classList.add("invaders");
}}

showInvader(invadersToparr);
showInvader(invadersMiddlearr);
showInvader(invadersBottomarr);

//new invader position function
const newPosition = invadersArr => {

    //remove first row fo array
    let firstRowinvader = invadersArr.shift();

    //remove class of next position
    position[firstRowinvader].classList.remove("invaders");
    
    //declare last invader
    let lastRowinvader = invadersArr[invadersArr.length-1];

    //move along
    invadersArr.push(lastRowinvader+1);

}


//assigning enitity to grid
//default position bottom middle 
position[entity_postion].classList.add("entity");

//restart
refresh.addEventListener("click", ()=> {
location.reload();
})

//--------------------------------------------------------------------------------------


//game activation by pressing play
play.addEventListener ("click",() => {
    play.style.display = "none";
    refresh.style.display = "block";   

    //invaders movement
    function invaderMove() {
        newPosition(invadersToparr);
        showInvader(invadersToparr);

        newPosition(invadersMiddlearr);
        showInvader(invadersMiddlearr);

        newPosition(invadersBottomarr);
        showInvader(invadersBottomarr);

        if (position[109].classList.contains("invaders")) {
            clearInterval(invaders);
            result.innerHTML="YOU LOSE!"
        }
    }
    //invader speed
    const invaders = setInterval(invaderMove, 100);
    

    //document detect when arrows are pressed and runs function to move enitity
    document.onkeydown = detectArrow;

    //moving the entity
    function detectArrow(e) {

        entity = position[entity_postion].classList.remove("entity");
        
        //stays on bottom line 
        switch (e.key) {
            case ("ArrowLeft") :
                //left arrow
                if (entity_postion !=99){
                    entity_postion = entity_postion-1;
                    entity = position[entity_postion].classList.add("entity");
                } else {
                    entity = position[entity_postion].classList.add("entity");
                }
            break;
            case ("ArrowRight") :
                //right arrow
                if (entity_postion != 109){
                    entity_postion = entity_postion+1;
                    entity = position[entity_postion].classList.add("entity"); 
                }else {
                    entity = position[entity_postion].classList.add("entity");
                }
                break;
      case "ArrowUp":
        //up arrow
        //shooting
        laser = entity_postion;

        entity = position[entity_postion].classList.add("entity");

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

            //remove dead invader from array
            if (invadersToparr.includes(laser)) {
                invadersToparr = invadersToparr.filter((invader) =>{ return invader != laser});

            } else if (invadersMiddlearr.includes(laser)) {
                invadersMiddlearr = invadersMiddlearr.filter((invader) =>{ return invader != laser});

            } else {
                invadersBottomarr = invadersBottomarr.filter((invader) =>{ return invader != laser});
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
        const laserGone = setInterval(_laser, 100);

        //gets rid of lingering laser classlists
        position.forEach(square => {
          position[laser].classList.remove("laser");
        });

        break;
      default:
        entity = position[entity_postion].classList.add("entity");
        break;
    }
  }
});

//----------------------------------------------------------------------------