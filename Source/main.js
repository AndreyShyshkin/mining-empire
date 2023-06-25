import { Canvas } from "./Graphics/Canvas/Canvas"
import { Vector2 } from "./Math/Vector2"
import { Input } from "./Logic/Input"
import { Game } from "./Logic/Game"
import { Time } from "./Logic/Time"
import { Tile } from "./Entities/Tile"
import { Player } from "./Entities/Player"
import { TileController } from "./Entities/TileController"
import { CreateImageByPath } from "./Logic/RenderImage"

let TC = new TileController(100, 1920)

let canvas = new Canvas(2)
let game = new Game(
  Start,
  Update,
  () => {},
  () => {},
  () => {}
)
let img = CreateImageByPath("Res/img/1085818.jpg");
let tile1 = CreateImageByPath("Res/img/Grass.png");
let tile2 = CreateImageByPath("Res/img/Tile2.png");
let iron = CreateImageByPath("Res/img/Iron.png");
let coal = CreateImageByPath("Res/img/Coal.png");

let cross = CreateImageByPath("Res/img/Cross.png");
let chest = CreateImageByPath("Res/img/Chest.png");

let playerImg = CreateImageByPath("Res/img/player1.png");
let pos = Vector2.Zero
let player = new Player(
  new Vector2(900, 450),
  new Vector2(80, 80),
  playerImg,
  1
)
let Entities = []

for (let y = 6; y < 1000; y++) {
  for (let x = -50; x < 50; x++) {
    if (y == 6) {
      TC.GetLayer(y).push(
        new Tile(
          new Vector2(0 + 100 * x, 100 * y),
          new Vector2(100, 100),
          tile1,
          1
        )
      )
    }else if (y < 10){
      TC.GetLayer(y).push(
        new Tile(
          new Vector2(0 + 100 * x, 100 * y),
          new Vector2(100, 100),
          tile2,
          1
        )
      )
    } else {
      let r = Random(1, 100);
      let rd = Random(1, 1000);
      if(rd == 1 && y > 15){
        let yStart = y;
        let xStart = x;
          for(a = 0; a < 4; a++){
            if(a == 0){
              y = yStart;
            }else{
              y -= 1;
            }
            for(i = 0; i < 9; i++){
              if(i == 0){
                x = xStart;
              }else{
                x -= 1;
              }
            if(a == 0 && i == 3){
              TC.GetLayer(y).push(
                new Tile(
                new Vector2(0 + 100 * x, 100 * y),
                new Vector2(100, 100),
                chest,
                1
                )
              )
            }else {    
            TC.GetLayer(y).push(
              new Tile(
              new Vector2(0 + 100 * x, 100 * y),
              new Vector2(100, 100),
              cross,
              1
              )
            )}
            } x = xStart;
          } y = yStart;
      }else{
      if(y >= 10 && y < 50){
      if(r < 5){
        TC.GetLayer(y).push(
          new Tile(
            new Vector2(0 + 100 * x, 100 * y),
            new Vector2(100, 100),
            coal,
            1
          )
        )
      }
      else if(r < 7){
        TC.GetLayer(y).push(
          new Tile(
            new Vector2(0 + 100 * x, 100 * y),
            new Vector2(100, 100),
            iron,
            1
          )
        )
      }
      else
      TC.GetLayer(y).push(
        new Tile(
          new Vector2(0 + 100 * x, 100 * y),
          new Vector2(100, 100),
          tile2,
          1
        )
      )
    } else if (y >= 50){
      if(r < 5){
        TC.GetLayer(y).push(
          new Tile(
            new Vector2(0 + 100 * x, 100 * y),
            new Vector2(100, 100),
            iron,
            1
          )
        )
      }
      else if(r < 7){
        TC.GetLayer(y).push(
          new Tile(
            new Vector2(0 + 100 * x, 100 * y),
            new Vector2(100, 100),
            coal,
            1
          )
        )
      }
      else
      TC.GetLayer(y).push(
        new Tile(
          new Vector2(0 + 100 * x, 100 * y),
          new Vector2(100, 100),
          tile2,
          1
        )
      )  
      }
      }
    }
  }
}

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