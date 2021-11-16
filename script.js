//constant variables from .html
const grid = document.querySelector(".game-grid");

//grid_square is a node list
let grid_square = [];
let position = grid.childNodes;
let entity;
let entity_postion= 104;

//setting up game grid
for (let i=0; i < 110; i++){
    grid_square = document.createElement("div");

    grid.appendChild(grid_square);

}

//setting up the invaders positions
const invadersArr = [
    0, 1, 2, 3, 4, 5,
    11, 12, 13, 14, 15, 16,
    22, 23, 24, 25, 26, 27
];

//assigning invaders to grid
for (let i=0; i < invadersArr.length; i++){
    position[invadersArr[i]].classList.add("invaders");
}

//assigning enitity to grid
//default position bottom middle 
entity = position[entity_postion].classList.add("entity");

//document detect when arrows are pressed and runs function to move enitity
document.onkeydown = detectArrow;

//moving the entity
function detectArrow(e) {
    entity = position[entity_postion].classList.remove("entity");
    //stays on bottom line
    if (entity_postion <= 100) {
        entity_postion = 100;
    } 

    if (entity_postion >= 110) {
        entity_postion = 110;
    } 

    switch (e.key) {
        case ("ArrowLeft") :
            //left arrow
            entity_postion = entity_postion-1;
            entity = position[entity_postion].classList.add("entity");
        break;
        case ("ArrowRight") :
            entity_postion = entity_postion+1;
            entity = position[entity_postion].classList.add("entity");
        break;
        case ("ArrowUp") :
            //up arrow
            entity = position[entity_postion].classList.add("entity");
            alert("hi")
        break;
        default:
            entity = position[entity_postion].classList.add("entity");
            break;
    }
}