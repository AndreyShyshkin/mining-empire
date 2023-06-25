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
  if (Input.GetKeyState(87) || Input.GetKeyState(32)) {
    stride = stride.Add(Vector2.Down.Scale(speed * Time.DeltaTime))
  }
  if (Input.GetKeyState(83) || Input.GetKeyState(17)) {
    stride = stride.Add(Vector2.Up.Scale(speed * Time.DeltaTime))
  }
  if (Input.GetKeyState(66)){// B
    TC.LoadedLayers.forEach(layer => {
      layer.forEach(entity => {
        if(Collisions.AABBtoAABB(entity.GetCollider(), player.GetColliderDot())){//
          layer.splice(layer.indexOf(entity), 1);
        }
      })
    })
  }
  if (stride.X > 0) {
    stride.X = Math.floor(stride.X)
  } else if (stride.X < 0) {
    stride.X = Math.ceil(stride.X)
  }
  if (stride.Y > 0) {
    stride.Y = Math.floor(stride.Y)
  } else if (stride.Y < 0) {
    stride.Y = Math.ceil(stride.Y)
  }
  pos = pos.Add(stride)
  player.transform.Position = player.transform.Position.Add(
    new Vector2(-stride.X, stride.Y)
  )
}
function Update() {
  UpdateInput()
  TC.UpdateLoadted(pos.Y)
  //player.Update(Entities);
  canvas.GetLayerContext(1).clearRect(0, 0, 1920, 1080)
  //canvas.GetLayerContext(0)!.drawImage(img, 0, 0);
  Entities.forEach(tile => {
    tile.Draw(canvas.GetLayerContext(tile.Layer), pos)
  })
  TC.LoadedLayers.forEach(layer => {
    layer.forEach(entity => {
      entity.Draw(canvas.GetLayerContext(entity.Layer), pos)
    })
  })
  player.Draw(canvas.GetLayerContext(player.Layer), pos)
}
function Random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}