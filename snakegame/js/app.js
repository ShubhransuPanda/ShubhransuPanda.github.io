
let inputDir={x:0,y:0};
const foodsound=new Audio('js/food.mp3');
const gameoversound=new Audio('js/gameover.mp3');
const movesound=new Audio('js/move.mp3');
const musicsound=new Audio('js/music.mp3');
let speed=5;
let lastPaintTime=0;
let snakeArr=[{x:13,y:15}];
let food={x:1,y:1};
let score=0;
///in js origin at top left corner
/////////////////////
//game functions
function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime);
    if((ctime - lastPaintTime)/1000<1/speed)
    return;
    lastPaintTime=ctime;
    gameEngine();
}
///
function isCollide(sarr){

    //snake bumps into itself
    for (let index = 1; index < snakeArr.length; index++) {
        if(sarr[index].x === snakeArr[0].x && sarr[index].y==snakeArr[0].y){
            return true;
        }}
        if(sarr[0].x>18 || sarr[0].x<=0  || sarr[0].y>18 || sarr[0].y<=0){
return true;
        }
        return false;
    

    }
//////





function gameEngine(){
    //part 1 updating the snake variable
if(isCollide(snakeArr)){
    gameoversound.play();
    musicsound.pause();
    inputDir={x:0,y:0};
    alert("GAME OVER!! Press any key to play again");
    snakeArr=[{x:13,y:15}];
    score=0;
    speed=5;
    scoreBox.innerHTML="Score: "+score;
}
//////increment result and generate food if food eaten
if(snakeArr[0].y==food.y && snakeArr[0].x==food.x){
    foodsound.play();
    score=score+1;
    speed=speed+1;
    scoreBox.innerHTML="Score: "+score;
    snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y});
    if(score>hiscoreval){
        hiscoreval = score;
        localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
        hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
    }
    ///random no bw a and b

    let a=1;
    let b=18;
    food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};
}
//////////move the snake///replace position of last elem with second elem and so on
for (let i = snakeArr.length-2; i >= 0; i--) {
    snakeArr[i+1]=  {...snakeArr[i]};   
}
snakeArr[0].x+=inputDir.x;
snakeArr[0].y+=inputDir.y;
    //part 2 display the snake
    let board=document.getElementById('board');
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElem=document.createElement('div');
        snakeElem.style.gridRowStart=e.y;
        snakeElem.style.gridColumnStart=e.x;
       
        if(index==0){
        snakeElem.classList.add('head');}
        else{
            snakeElem.classList.add('snake');
        }
        board.appendChild(snakeElem);

    });
    //display the food
    foodElem=document.createElement('div');
        foodElem.style.gridRowStart=food.y;
        foodElem.style.gridColumnStart=food.x;
        foodElem.classList.add('food');
        board.appendChild(foodElem);

}









///////////////////game loop and main logic

let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}


window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    musicsound.play();
    inputDir={x:0,y:1}//start game
    movesound.play();
    switch(e.key){
        case "ArrowUp":
            // console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            // console.log("Arrow2");
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            // console.log("Arrow3");
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight":
            // console.log("Arrow4");
            inputDir.x=1;
            inputDir.y=0;
            break;
        default:
            break;
    }
});
































