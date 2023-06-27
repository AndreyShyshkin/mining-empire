import { Vector2 } from "../Math/Vector2"
import { Collisions } from "../Physics/Collisions"
import { Entity } from "../Physics/Entity"
import { Transform } from "../Physics/Transform"
import { Time } from "../Logic/Time"
import { Physics } from "../Physics/Physics"
import { Input } from "../Logic/Input"
import { SceneManager } from "../Logic/SceneManager"

let SM = new SceneManager();

export class Player extends Entity {
  static Camera;
  bottomCollision = false;
  topCollision = false;
  leftCollision = false;
  rightCollision = false;
  velocityY = 0;
  speed = 500;
  SM;
  jumpForce = 600;
  constructor(position, size, Image, Layer, Camera, SM) {
    super(new Transform(position, size), Image, Layer)
    Player.Camera = Camera;
    this.SM = SM;
  }
  Update(Entities) {
    this.InputUpdate();
    if(!this.bottomCollision){
      this.velocityY -= Physics.G * Time.DeltaTime;
    }
    this.CollisionCheck(Entities);
  }
  InputUpdate(){
    let stride = Vector2.Zero
    if (Input.GetKeyState(65) && !this.leftCollision) {
      stride = stride.Add(Vector2.Right.Scale(this.speed * Time.DeltaTime))
    }
    if (Input.GetKeyState(68) && !this.rightCollision) {
      stride = stride.Add(Vector2.Left.Scale(this.speed * Time.DeltaTime))
    }
    if(this.bottomCollision){
      if (Input.GetKeyState(87) || Input.GetKeyState(32)) {
        this.velocityY = this.jumpForce;
      }
    }
    if(!this.bottomCollision && false){
      if (Input.GetKeyState(83) || Input.GetKeyState(17)) {
        stride = stride.Add(Vector2.Up.Scale(this.speed * Time.DeltaTime))
      }
    }
    if (Input.GetKeyState(66)){// B
      if (SceneManager.Instance.currentScene == SceneManager.Instance.mine){
        let col = []
        if(Input.GetKeyState(39)){//right
          col = this.GetColliderDot(Vector2.Right.Scale(100));
        }
        else if(Input.GetKeyState(37)){//left
          col = this.GetColliderDot(Vector2.Left.Scale(100));
        }
        else if(Input.GetKeyState(38)){//top
          col = this.GetColliderDot(Vector2.Down.Scale(100));
        }
        else if(Input.GetKeyState(40)){//down
          col = this.GetColliderDot(Vector2.Up.Scale(100));
        }
        if(col.length == 2)
        this.SM.currentScene.TC.LoadedLayers.forEach(layer => {
          layer.forEach(entity => {
            if(Collisions.AABBtoAABB(entity.GetCollider(), col)){//
              layer.splice(layer.indexOf(entity), 1);
            }
          })
        })}
    }
    stride = stride.Add(Vector2.Down.Scale(this.velocityY * Time.deltaTime));
    stride = Vector2.Round(stride);
    Player.Camera = Player.Camera.Add(stride)
    this.transform.Position = this.transform.Position.Add(
      new Vector2(-stride.X, stride.Y)
    )
  }
  CollisionCheck(Entities){
    let bottomFlag = false;
    let topFlag = false;
    let leftFlag = false;
    let rightFlag = false;
    Entities.forEach(entity => {
      if (!(entity === this)) {
        let offset = 10;
        let Left = [
          new Vector2(this.transform.Position.X, this.transform.Position.Y + offset),
          new Vector2(
            this.transform.Position.X,
            this.transform.Position.Y + this.transform.Size.Y - offset
          )
        ]
        let Right = [
          new Vector2(
            this.transform.Position.X + this.transform.Size.X,
            this.transform.Position.Y + offset
          ),
          new Vector2(
            this.transform.Position.X + this.transform.Size.X,
            this.transform.Position.Y + this.transform.Size.Y - offset
          )
        ]
        let Top = [
          new Vector2(this.transform.Position.X + offset, this.transform.Position.Y),
          new Vector2(
            this.transform.Position.X + this.transform.Size.X - offset,
            this.transform.Position.Y
          )
        ]
        let Bottom = [
          new Vector2(
            this.transform.Position.X + offset,
            this.transform.Position.Y + this.transform.Size.Y
          ),
          new Vector2(
            this.transform.Position.X + this.transform.Size.X - offset,
            this.transform.Position.Y + this.transform.Size.Y
          )
        ]

        if (Collisions.AABBtoAABB(entity.GetCollider(), Left)) {
          this.leftCollision = true;
          leftFlag = true;
        }
        if (Collisions.AABBtoAABB(entity.GetCollider(), Right)) {
          this.rightCollision = true;
          rightFlag = true;
        }
        if (Collisions.AABBtoAABB(entity.GetCollider(), Top)) {
          topFlag = true;
          this.topCollision = true;
          if(this.velocityY > 0){
            this.velocityY = 0;
          }
        }
        if (Collisions.AABBtoAABB(entity.GetCollider(), Bottom)) {
          bottomFlag = true;
          this.bottomCollision = true;
          this.velocityY = 0;
        }
      }
    })
    if(!bottomFlag) {
      this.bottomCollision = false;
    }    
    if(!topFlag) {
      this.topCollision = false;
    }    
    if(!leftFlag) {
      this.leftCollision = false;
    }
    if(!rightFlag){
      this.rightCollision = false;
    }
  }
  GetColliderDot(direction) {
    return [
      this.transform.Position.Add(this.transform.Size.Scale(0.5).Add(direction)),
      this.transform.Position.Add(this.transform.Size.Scale(0.5).Add(direction))
    ]
  }
  Draw(Context, Camera) {
    Context.drawImage(
      this.Image,
      this.transform.Position.X + Camera.X,
      this.transform.Position.Y - Camera.Y,
      this.transform.Size.X,
      this.transform.Size.Y
    )
  }
}
