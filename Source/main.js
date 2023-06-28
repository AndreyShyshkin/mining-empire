import { Canvas } from "./Graphics/Canvas/Canvas"
import { Vector2 } from "./Math/Vector2"
import { Input } from "./Logic/Input"
import { Game } from "./Logic/Game"
import { Time } from "./Logic/Time"
import { Player } from "./Entities/Player"
import { TileController } from "./Entities/TileController"
import { CreateImageByPath } from "./Logic/RenderImage"
import cave from "./Map/cave";
import village from "./Map/village";
import { SceneManager } from "./Logic/SceneManager"
import { Images } from "./Graphics/Images"
import { Collisions } from "./Physics/Collisions"
let game = new Game(
  Start,
  Update,
  () => {},
  () => {},
  () => {}
)

let SM = new SceneManager();

let playerImg = CreateImageByPath("Res/img/player1.png");
let player = new Player(
  new Vector2(900, 450),
  new Vector2(80, 80),
  playerImg,
  2,
  Vector2.Zero,
  SM
)

village(SM.town.TC);
cave();

window.onload = () => game.Start()
function Start() {
  Canvas.Instance.updateSize()
}
function Update() {
  let entities = [];
  SceneManager.Instance.currentScene.Entities.forEach(element => {
    entities.push(element);
  });
  SM.currentScene.TC.LoadedLayers.forEach(layer => {
    layer.forEach(entity => {
      entities.push(entity);
    })
  })
  SM.currentScene.TC.UpdateLoadted(Player.Camera.Y);
  player.Update(entities);
  Canvas.Instance.GetLayerContext(1).clearRect(0, 0, 1920, 1080)
  Canvas.Instance.GetLayerContext(2).clearRect(0, 0, 1920, 1080)
  //canvas.GetLayerContext(0)!.drawImage(img, 0, 0);
  SM.currentScene.Draw();
  player.Draw(Canvas.Instance.GetLayerContext(player.Layer), Player.Camera)
}
