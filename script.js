//constants
const grid = document.querySelector(".game-grid");
const play = document.querySelector(".gameAction")

const position = grid.childNodes;

//grid_square is a node list
let grid_square = [];
let entity;
let laser = 104;
let entity_postion = 104;
let invaderMovement;

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


//--------------------------------------------------------------------------------------


//game activation by pressing play
play.addEventListener ("click",() => {

    //invaders movement
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
}
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
                entity = position[entity_postion].classList.add("entity");
                
                //laser movement 200ms
                for (let i = 1; i <= 9; i++) {
                    (function(i) {
                        setTimeout(function() { 
                        position[laser].classList.remove("laser");
                        laser = entity_postion -11*[i];
                        position[laser].classList.add("laser");                      
                    }, 200 * i);
                    })(i);
                    }
            break;
            default:
                entity = position[entity_postion].classList.add("entity");
                break;
        }
    }})

    //collision
if (grid_square.classList.contains("laser") & (grid_square.classList.contains("invaders"))) {
    alert("yay");
}