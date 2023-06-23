import { Time } from "./Logic/Time";
import { Game } from "./Logic/Game";
import createGround from "./Map/surface";
import createTrees from "./Map/treesCreate";
let game = new Game(()=>{},Update, ()=>{},()=>{},()=>{});
let p = document.querySelector("p");
function Update(){
    p.innerText = Time.DeltaTime;
}

createTrees();
createGround();
game.Start();


