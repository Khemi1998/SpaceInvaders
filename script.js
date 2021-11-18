//constants
const grid = document.querySelector(".game-grid");
const play = document.querySelector(".gameAction")

const position = grid.childNodes;

//grid_square is a node list
let grid_square = [];
let entity;
let laser = 104;
let entity_postion = 104;
let incrementer = 0;

//setting up game grid
for (let i=0; i < 110; i++){
    grid_square = document.createElement("div");

    grid.appendChild(grid_square);

}

//setting up the invaders positions
const invadersArr = [
    0, 1, 2, 3, 4,
    11, 12, 13, 14, 15,
    22, 23, 24, 25, 26,
];

//assigning invaders to grid
for (let i=0; i < invadersArr.length; i++){
    position[invadersArr[i]].classList.add("invaders");
}

//assigning enitity to grid
//default position bottom middle 
entity = position[entity_postion].classList.add("entity");

let deadInvaders = [];
//--------------------------------------------------------------------------------------



//game activation by pressing play
play.addEventListener ("click",() => {
    
    //invaders movement
/*
    function _invaderMovement() {
    for(let j=0; j<84; j++){
        position[j].classList.remove("invaders");
        position[11+j].classList.remove("invaders");
        position[22+j].classList.remove("invaders");
    }}
*/
    function test() {
            //_invaderMovement()
            let i=0; 
            //i<84; 
            i++;       
            invadersArr.forEach((invader)=>{
            invader = invader + i;
            position[invader].classList.add("invaders");
    })}

    setInterval(test,100)

    /*
    METHOD1 DOESNT WORK
    for(let i=0; i<84; i++){
        (function(i) {
            setTimeout(function() {  
        for(let j=0; j<84; j++){
        position[j].classList.remove("invaders");
        position[11+j].classList.remove("invaders");
        position[22+j].classList.remove("invaders");
    }
    
    invadersArr.forEach((invader)=>{
        invader=invader + i;
        position[invader].classList.add("invaders");
    })
    }, 100 * i);
})(i);
}*/

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
                case ("ArrowUp") :
                    //up arrow
                    //shooting
                    laser=entity_postion;

                    entity = position[entity_postion].classList.add("entity");

                    function _laser() {
                        position[laser].classList.remove("laser");
                        laser -=11;
                        position[laser].classList.add("laser");

                        //collision
                        if (position[laser].classList.contains("invaders")){
                            position[laser].classList.remove("laser");
                            //stops lasers
                            clearInterval(laserGone);
                        }
                    } 
                    //speed 100ms
                    const laserGone =setInterval(_laser,100)

                    /*
                    MEDTHOD1 DOESNT WORK
                      //laser movement 200ms
                      laser=entity_postion;

                    for (let i = 1; (i <= 9); i++) {
                        (function(i) {
                            setTimeout(function() { 

                            position[laser].classList.remove("laser");
                            laser -=11;
                            position[laser].classList.add("laser");
                            
                           // console.log (position[laser])
                            
                            //collisions
                            if (position[laser].classList.contains("invaders")){
                               position[laser].classList.remove("laser");
                               laser=null;
                            }
                        }, 100 * i); 
                        })(i);                    
                    }*/
                    
                break;
                default:
                    entity = position[entity_postion].classList.add("entity");
                    break;
        }  

    }})
