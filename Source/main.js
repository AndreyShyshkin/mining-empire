import { Time } from "./Logic/Time";
import { Game } from "./Logic/Game";
import createGround from "./Map/surface";
import createTrees from "./Map/treesCreate";
import home from "./Map/home";
import player from "./player"
let game = new Game(()=>{},Update, ()=>{},()=>{},()=>{});
let p = document.querySelector("p");
function Update(){
    p.innerText = Time.DeltaTime;
}

createTrees(600, 300);
createTrees(600, 900);
home(600, 1300);
createTrees(600, 2100);
createTrees(600, 2700);
createGround();
player();

window.onload = function() {
    restartGame()
  };

let restart = document.querySelector(".restart");

restart.onclick = function restartGame(){
    window.scrollTo(0, 0);
};


game.Start();


