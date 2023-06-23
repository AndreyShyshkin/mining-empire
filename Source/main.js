import { Time } from "./Logic/Time";
import { Game } from "./Logic/Game";
let game = new Game(()=>{},Update, ()=>{},()=>{},()=>{});
let p = document.querySelector("p");
function Update(){
    p.innerText = Time.DeltaTime;
}
game.Start();