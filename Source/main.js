import { Canvas } from "./Graphics/Canvas/Canvas"
import { Vector2 } from "./Math/Vector2"
import { Input } from "./Logic/Input"
import { Game } from "./Logic/Game"
import { Time } from "./Logic/Time"
import { Tile } from "./Entities/Tile"
import { Player } from "./Entities/Player"
import { TileController } from "./Entities/TileController"
import { CreateImageByPath } from "./Logic/RenderImage"
import cave from "./Map/cave";
import village from "./Map/village";
import { Layer } from "./Graphics/Canvas/Layer"
import { Collisions } from "./Physics/Collisions"
import { Physics } from "./Physics/Physics"

let TC = new TileController(100, 1920)

let canvas = new Canvas(2)
let game = new Game(
  Start,
  Update,
  () => {},
  () => {},
  () => {}
)


let level = "villageLVL";

let playerImg = CreateImageByPath("Res/img/player1.png");
let player = new Player(
  new Vector2(900, 450),
  new Vector2(80, 80),
  playerImg,
  1,
  Vector2.Zero
)
let Entities = []

selectLVL(TC);
function selectLVL(){
  console.log(level)
  if(level == "villageLVL"){
    village(TC);
    }else {
    cave(TC);
  }
}

window.onload = () => game.Start()
function Start() {
  canvas.updateSize()
}
function UpdateInput() {
  if (Input.GetKeyState(90)){// Z
    if( level == "villageLVL"){
      level = "caveLVL";
      selectLVL();
    }else{
      level = "villageLVL";
      selectLVL();
    }
  }
}
function Update() {
  let tiles = []
  TC.LoadedLayers.forEach(layer => {
    layer.forEach(entity => {
      tiles.push(entity);
    })
  })
  UpdateInput()
  TC.UpdateLoadted(player.Camera.Y);
  player.Update(tiles);
  canvas.GetLayerContext(1).clearRect(0, 0, 1920, 1080)
  //canvas.GetLayerContext(0)!.drawImage(img, 0, 0);
  Entities.forEach(tile => {
    tile.Draw(canvas.GetLayerContext(tile.Layer), player.Camera)
  })
  tiles.forEach(entity => {
    entity.Draw(canvas.GetLayerContext(entity.Layer), player.Camera)
  })
  player.Draw(canvas.GetLayerContext(player.Layer), player.Camera)
}
function Random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
