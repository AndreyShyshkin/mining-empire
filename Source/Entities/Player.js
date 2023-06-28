import { Vector2 } from "../Math/Vector2"
import { Collisions } from "../Physics/Collisions"
import { Entity } from "../Physics/Entity"
import { Transform } from "../Physics/Transform"
import { Time } from "../Logic/Time"
import { Physics } from "../Physics/Physics"
import { Input } from "../Logic/Input"
import { SceneManager } from "../Logic/SceneManager"
import { Images } from "../Graphics/Images";
import { Tile } from "../Entities/Tile"

import resurse from "../Logic/inventory"
import { EntityTypes } from "../Physics/EntityTypes"

let SM = new SceneManager();

export class Player extends Entity {
  static Camera;
  changeSceneFlag = false;
  bottomCollision = false;
  topCollision = false;
  leftCollision = false;
  rightCollision = false;
  velocityY = 0;
  speed = 500;
  damage = 1;
  SM;
  jumpForce = 700;
  attackDelay = 0.2; 
  curAttackDelay = 0;
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
    this.curAttackDelay -= Time.deltaTime;
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
    if (Input.GetKeyState(66) && this.curAttackDelay <= 0){// B
      this.curAttackDelay = this.attackDelay;
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
            if(entity.Type === EntityTypes.SolidTile || entity.Type === EntityTypes.DestroyableTile)
            if(Collisions.AABBtoAABB(entity.GetCollider(), col)){//
              entity.GetDamage(this.damage);
              if(entity.curHp <= 0){
                if(entity.Image == Images.lvl1_res1 || entity.Image == Images.lvl2_res1 || entity.Image == Images.lvl3_res1 || entity.Image == Images.lvl4_res1 || entity.Image == Images.lvl5_res1){
                  resurse[0] += 1
                  console.log("res1 " + resurse[0]);
                }if(entity.Image == Images.lvl1_res2 || entity.Image == Images.lvl2_res2 || entity.Image == Images.lvl3_res2 || entity.Image == Images.lvl4_res2 || entity.Image == Images.lvl5_res2){
                  resurse[1] += 1
                  console.log("res2 " + resurse[1]);
                }if(entity.Image == Images.lvl1_res3 || entity.Image == Images.lvl2_res3 || entity.Image == Images.lvl3_res3 || entity.Image == Images.lvl4_res3 || entity.Image == Images.lvl5_res3){
                  resurse[2] += 1
                  console.log("res3 " + resurse[2]);
                }if(entity.Image == Images.lvl1_res4 || entity.Image == Images.lvl2_res4 || entity.Image == Images.lvl3_res4 || entity.Image == Images.lvl4_res4 || entity.Image == Images.lvl5_res4){
                  resurse[3] += 1
                  console.log("res4 " + resurse[3]);
                }if(entity.Image == Images.lvl1_res5 || entity.Image == Images.lvl2_res5 || entity.Image == Images.lvl3_res5 || entity.Image == Images.lvl4_res5 || entity.Image == Images.lvl5_res5){
                  resurse[4] += 1
                  console.log("res5 " + resurse[4]);
                }if(entity.Image == Images.lvl1_res6 || entity.Image == Images.lvl2_res6 || entity.Image == Images.lvl3_res6 || entity.Image == Images.lvl4_res6 || entity.Image == Images.lvl5_res6){
                  resurse[5] += 1
                  console.log("res6 " + resurse[5]);
                }
                layer.splice(layer.indexOf(entity), 1);

                 // Создание нового блока
                let newX = Math.floor(entity.transform.Position.X / 100);
                let newY = Math.floor(entity.transform.Position.Y / 100);

                if(newY < 50){
                  createLvl1bg(newX, newY);
                }if(newY >= 50 && newY < 150){
                  createLvl2bg(newX, newY);
                }if(newY >= 150 && newY < 250){
                  createLvl3bg(newX, newY);
                }if(newY >= 250 && newY < 350){
                  createLvl4bg(newX, newY);
                }if(newY >= 350){
                  createLvl5bg(newX, newY);
                }
              }
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
    Entities.forEach(entity => {
      if (!(entity === this)) {
        if(entity.Type === EntityTypes.SolidTile){
          
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
      }
      this.CaveCheck(entity);
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
  CaveCheck(entity){
    if(entity.Type === EntityTypes.Cave){
      if (Input.GetKeyState(90)){// Z
        if (Collisions.AABBtoAABB(this.GetCollider(), entity.GetCollider())) {
          if(!this.changeSceneFlag){
            SceneManager.Instance.ChangeScene();
          }
          this.changeSceneFlag = true;
        }
      }
      else{
        this.changeSceneFlag = false;
      }
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

function createLvl1bg(x, y) {
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
    new Vector2(0 + 100 * x, 100 * y),
    new Vector2(100, 100),
    Images.lvl1bg,
    1,
    EntityTypes.BackGroundTile,
    SceneManager.Instance.mine
    )
  )
}

function createLvl2bg(x, y) {
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
    new Vector2(0 + 100 * x, 100 * y),
    new Vector2(100, 100),
    Images.lvl2bg,
    1,
    EntityTypes.BackGroundTile,
    SceneManager.Instance.mine
    )
  )
}

function createLvl3bg(x, y) {
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
    new Vector2(0 + 100 * x, 100 * y),
    new Vector2(100, 100),
    Images.lvl3bg,
    1,
    EntityTypes.BackGroundTile,
    SceneManager.Instance.mine
    )
  )
}

function createLvl4bg(x, y) {
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
    new Vector2(0 + 100 * x, 100 * y),
    new Vector2(100, 100),
    Images.lvl4bg,
    1,
    EntityTypes.BackGroundTile,
    SceneManager.Instance.mine
    )
  )
}

function createLvl5bg(x, y) {
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
    new Vector2(0 + 100 * x, 100 * y),
    new Vector2(100, 100),
    Images.lvl5bg,
    1,
    EntityTypes.BackGroundTile,
    SceneManager.Instance.mine
    )
  )
}

