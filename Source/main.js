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
import resurse from "./Logic/inventory"
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
  new Vector2(920, 500),
  new Vector2(80, 80),
  playerImg,
  2,
  Vector2.Zero,
  SM
)

village(SM.town.TC);
cave();

window.onbeforeunload = function() {
  return "Вы уверены, что хотите перезагрузить страницу?";
};

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
  const layer1Context = Canvas.Instance.GetLayerContext(1);
  const layer2Context = Canvas.Instance.GetLayerContext(2);
  layer1Context.clearRect(0, 0, 1920, 1080);
  layer2Context.clearRect(0, 0, 1920, 1080);
  //canvas.GetLayerContext(0)!.drawImage(img, 0, 0);
  SM.currentScene.Draw();
  player.Draw(Canvas.Instance.GetLayerContext(player.Layer), Player.Camera);

  let money = document.querySelector(".money");
  let res1 = document.querySelector(".res1");
  let res2 = document.querySelector(".res2");
  let res3 = document.querySelector(".res3");
  let res4 = document.querySelector(".res4");
  let res5 = document.querySelector(".res5");
  let res6 = document.querySelector(".res6");

  money.innerHTML = resurse.money;
  res1.innerHTML = resurse.res1;
  res2.innerHTML = resurse.res2;
  res3.innerHTML = resurse.res3;
  res4.innerHTML = resurse.res4;
  res5.innerHTML = resurse.res5;
  res6.innerHTML = resurse.res6;
}

function drawText(context, text, x, y, font, color, align = "left") {
  context.font = font;
  context.fillStyle = color;
  context.textAlign = align;
  context.fillText(text, x, y);
}
