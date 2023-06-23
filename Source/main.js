import { Time } from "./Logic/Time";
import { Game } from "./Logic/Game";
import createGround from "./Map/surface";
import createTrees from "./Map/treesCreate";
let game = new Game(()=>{},Update, ()=>{},()=>{},()=>{});
let p = document.querySelector("p");
function Update(){
    p.innerText = Time.DeltaTime;
}

createTrees(600, 300);
createTrees(600, 900);
createTrees(600, 1500);
createTrees(600, 2100);
createTrees(600, 2700);
createGround();
game.Start();


