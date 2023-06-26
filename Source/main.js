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

let playerImg = CreateImageByPath("Res/img/player1.png");
let pos = Vector2.Zero
let player = new Player(
  new Vector2(900, 450),
  new Vector2(80, 80),
  playerImg,
  1
)
let Entities = []

cave(TC);
//village(TC);

window.onload = () => game.Start()
let speed = 500
function Start() {
  canvas.updateSize()
}
function UpdateInput() {
  let stride = Vector2.Zero
  if (Input.GetKeyState(65)) {
    stride = stride.Add(Vector2.Right.Scale(speed * Time.DeltaTime))
  }
  if (Input.GetKeyState(68)) {
    stride = stride.Add(Vector2.Left.Scale(speed * Time.DeltaTime))
  }
  if(player.bottomCollision){
    if (Input.GetKeyState(87) || Input.GetKeyState(32)) {
      player.velocityY = 400;
    }
  }
  if(!player.bottomCollision){
    if (Input.GetKeyState(83) || Input.GetKeyState(17)) {
      stride = stride.Add(Vector2.Up.Scale(speed * Time.DeltaTime))
    }
  }
  if (Input.GetKeyState(66)){// B
    let col = []
    if(Input.GetKeyState(39)){//right
      col = player.GetColliderDot(Vector2.Right.Scale(100));
    }
    else if(Input.GetKeyState(37)){//left
      col = player.GetColliderDot(Vector2.Left.Scale(100));
    }
    else if(Input.GetKeyState(38)){//top
      col = player.GetColliderDot(Vector2.Down.Scale(100));
    }
    else if(Input.GetKeyState(40)){//down
      col = player.GetColliderDot(Vector2.Up.Scale(100));
    }
    if(col.length == 2)
    TC.LoadedLayers.forEach(layer => {
      layer.forEach(entity => {
        if(Collisions.AABBtoAABB(entity.GetCollider(), col)){//
          layer.splice(layer.indexOf(entity), 1);
        }
      })
    })
  }
  stride = stride.Add(Vector2.Down.Scale(player.velocityY * Time.deltaTime));
  stride = Vector2.Round(stride);
  pos = pos.Add(stride)
  player.transform.Position = player.transform.Position.Add(
    new Vector2(-stride.X, stride.Y)
  )
}
function Update() {
  let tiles = []
  TC.LoadedLayers.forEach(layer => {
    layer.forEach(entity => {
      tiles.push(entity);
    })
  })
  UpdateInput()
  TC.UpdateLoadted(pos.Y);
  playerUpdate(tiles);
  canvas.GetLayerContext(1).clearRect(0, 0, 1920, 1080)
  //canvas.GetLayerContext(0)!.drawImage(img, 0, 0);
  Entities.forEach(tile => {
    tile.Draw(canvas.GetLayerContext(tile.Layer), pos)
  })
  tiles.forEach(entity => {
    entity.Draw(canvas.GetLayerContext(entity.Layer), pos)
  })
  player.Draw(canvas.GetLayerContext(player.Layer), pos)
}
function playerUpdate(tiles){
  if(!player.bottomCollision){
    player.velocityY -= Physics.G * Time.DeltaTime;
  }
  player.Update(tiles);
}
function Random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
