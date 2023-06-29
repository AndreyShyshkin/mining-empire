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

class TextElement {
  constructor(context, text, x, y, font, color, align = "left") {
    this.context = context;
    this.text = text;
    this.x = x;
    this.y = y;
    this.font = font;
    this.color = color;
    this.align = align;
  }

  draw() {
    this.context.font = this.font;
    this.context.fillStyle = this.color;
    this.context.textAlign = this.align;
    this.context.fillText(this.text, this.x, this.y);
  }
}

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

  const moneyText = new TextElement(layer2Context, `Money: ${resurse.money}`, 10, 20, "20px Arial", "white", "left");
  const res1Text = new TextElement(layer2Context, `Res1: ${resurse.res1}`, 10, 50, "20px Arial", "white", "left");
  const res2Text = new TextElement(layer2Context, `Res2: ${resurse.res2}`, 10, 80, "20px Arial", "white", "left");
  const res3Text = new TextElement(layer2Context, `Res3: ${resurse.res3}`, 10, 110, "20px Arial", "white", "left");
  const res4Text = new TextElement(layer2Context, `Res4: ${resurse.res4}`, 10, 140, "20px Arial", "white", "left");
  const res5Text = new TextElement(layer2Context, `Res5: ${resurse.res5}`, 10, 170, "20px Arial", "white", "left");
  const res6Text = new TextElement(layer2Context, `Res6: ${resurse.res6}`, 10, 200, "20px Arial", "white", "left");

  moneyText.draw();
  res1Text.draw();
  res2Text.draw();
  res3Text.draw();
  res4Text.draw();
  res5Text.draw();
  res6Text.draw();
}

function drawText(context, text, x, y, font, color, align = "left") {
  context.font = font;
  context.fillStyle = color;
  context.textAlign = align;
  context.fillText(text, x, y);
}
