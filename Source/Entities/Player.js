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
import { PlayerStates } from "./PlayerStates"
import resurse from "../Logic/inventory"
import { EntityTypes } from "../Physics/EntityTypes"
import { PlayerAnimationController } from "../Graphics/PlayerAnimationController"

let SM = new SceneManager();

export class Player extends Entity {
  static Camera;
  changeSceneFlag = false;
  bottomCollision = false;
  topCollision = false;
  leftCollision = false;
  rightCollision = false;
  isAttack = false;
  velocityY = 0;
  speed = 500;
  damage = 1;
  SM;
  Direction = 1; //1 - right, 2 - left
  PAC = new PlayerAnimationController();
  jumpForce = 700;
  attackDelay = 0.2; 
  curAttackDelay = 0;
  State = PlayerStates.Idle;
  constructor(position, size, Image, Layer, Camera, SM) {
    super(new Transform(position, size), Image, Layer)
    Player.Camera = Camera;
    this.SM = SM;
  }
  Update(Entities) {
    this.InputUpdate();
    this.UpdateAttack();
    this.PAC.Update();
    if(!this.bottomCollision){
      this.velocityY -= Physics.G * Time.DeltaTime;
    }
    this.CollisionCheck(Entities);
    this.curAttackDelay -= Time.deltaTime;
  }
  InputUpdate(){
    let stride = Vector2.Zero
      if(this.curAttackDelay <=0 && !Input.GetKeyState(66)){
        let walk = false;
        if (Input.GetKeyState(65) && !Input.GetKeyState(68) && !this.leftCollision) {
          stride = stride.Add(Vector2.Right.Scale(this.speed * Time.DeltaTime))
          walk = true;
          this.Direction = -1;
        }
        if (Input.GetKeyState(68)&& !Input.GetKeyState(65) && !this.rightCollision) {
          stride = stride.Add(Vector2.Left.Scale(this.speed * Time.DeltaTime))
          walk = true;
          this.Direction = 1;
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
        if(walk){
          this.State = PlayerStates.Walk;
          if(this.Direction == 1){
            this.PAC.ChangeAnimation(this.PAC.WalkRight);
          }
          else{
            this.PAC.ChangeAnimation(this.PAC.WalkLeft);
          }
        }
        else{
          this.State = PlayerStates.Idle;
          if(this.Direction == 1){
            this.PAC.ChangeAnimation(this.PAC.IdleRight);
          }
          else{
            this.PAC.ChangeAnimation(this.PAC.IdleLeft);
          }
        }
      }
      if(!this.bottomCollision){
        if(this.Direction == 1)
          this.PAC.ChangeAnimation(this.PAC.JumpRight);
        else
          this.PAC.ChangeAnimation(this.PAC.JumpLeft);
      }
    stride = stride.Add(Vector2.Down.Scale(this.velocityY * Time.deltaTime));
    stride = Vector2.Round(stride);
    Player.Camera = Player.Camera.Add(stride)
    this.transform.Position = this.transform.Position.Add(
      new Vector2(-stride.X, stride.Y)
    )
  }
  UpdateAttack(){
    if (Input.GetKeyState(66) && this.curAttackDelay <= 0 && this.bottomCollision){// B
      let dir;//1 - right, 2 - left, 3 - top, 4 - down
      if (SceneManager.Instance.currentScene == SceneManager.Instance.mine){
        let col = []
        if(Input.GetKeyState(39)){//right
          col = this.GetColliderDot(Vector2.Right.Scale(100));
          dir = 1;
          this.Direction = 1;
        }
        else if(Input.GetKeyState(37)){//left
          col = this.GetColliderDot(Vector2.Left.Scale(100));
          dir = 2;
          this.Direction = -1;
        }
        else if(Input.GetKeyState(38)){//top
          col = this.GetColliderDot(Vector2.Down.Scale(100));
          dir = 3;
        }
        else if(Input.GetKeyState(40)){//down
          col = this.GetColliderDot(Vector2.Up.Scale(100));
          dir = 4;
        }
        let flag = false;
        if(col.length == 2)
        this.SM.currentScene.TC.LoadedLayers.forEach(layer => {
          layer.forEach(entity => {
            if(entity.Type === EntityTypes.SolidTile || entity.Type === EntityTypes.DestroyableTile)
            if(Collisions.AABBtoAABB(entity.GetCollider(), col)){//
              flag = true;
              if(this.Direction == 1)
                this.PAC.ChangeAnimation(this.PAC.AttackRight);
              else
                this.PAC.ChangeAnimation(this.PAC.AttackLeft);
              this.PAC.CurrentAnimation.Reset();
              this.curAttackDelay = this.attackDelay;
              entity.GetDamage(this.damage);
              if(entity.curHp <= 0){
                if(entity.Image == Images.lvl1_res1 || entity.Image == Images.lvl2_res1 || entity.Image == Images.lvl3_res1 || entity.Image == Images.lvl4_res1 || entity.Image == Images.lvl5_res1){
                  resurse.res1 += 1
                  resurse.money += 1
                  console.log("res1 " + resurse.res1);
                  console.log("money " + resurse.money);
                }if(entity.Image == Images.lvl1_res2 || entity.Image == Images.lvl2_res2 || entity.Image == Images.lvl3_res2 || entity.Image == Images.lvl4_res2 || entity.Image == Images.lvl5_res2){
                  resurse.res2 += 1
                  resurse.money += 2
                  console.log("res2 " + resurse.res2);
                  console.log("money " + resurse.money);
                }if(entity.Image == Images.lvl1_res3 || entity.Image == Images.lvl2_res3 || entity.Image == Images.lvl3_res3 || entity.Image == Images.lvl4_res3 || entity.Image == Images.lvl5_res3){
                  resurse.res3 += 1
                  resurse.money += 3
                  console.log("res3 " + resurse.res3);
                  console.log("money " + resurse.money);
                }if(entity.Image == Images.lvl1_res4 || entity.Image == Images.lvl2_res4 || entity.Image == Images.lvl3_res4 || entity.Image == Images.lvl4_res4 || entity.Image == Images.lvl5_res4){
                  resurse.res4 += 1
                  resurse.money += 4
                  console.log("res4 " + resurse.res4);
                  console.log("money " + resurse.money);
                }if(entity.Image == Images.lvl1_res5 || entity.Image == Images.lvl2_res5 || entity.Image == Images.lvl3_res5 || entity.Image == Images.lvl4_res5 || entity.Image == Images.lvl5_res5){
                  resurse.res5 += 1
                  resurse.money += 5
                  console.log("res5 " + resurse.res5);
                  console.log("money " + resurse.money);
                }if(entity.Image == Images.lvl1_res6 || entity.Image == Images.lvl2_res6 || entity.Image == Images.lvl3_res6 || entity.Image == Images.lvl4_res6 || entity.Image == Images.lvl5_res6){
                  resurse.res6 += 1
                  resurse.money += 6
                  console.log("res6 " + resurse.res6);
                  console.log("money " + resurse.money);
                }
                layer.splice(layer.indexOf(entity), 1);

                 // Создание нового блока
                let newX = Math.floor(entity.transform.Position.X / 100);
                let newY = Math.floor(entity.transform.Position.Y / 100);

                if(newY < 50){
                  createLvlBg(Images.lvl1bg, newX, newY);
                }if(newY >= 50 && newY < 150){
                  createLvlBg(Images.lvl2bg, newX, newY);
                }if(newY >= 150 && newY < 250){
                  createLvlBg(Images.lvl3bg, newX, newY);
                }if(newY >= 250 && newY < 350){
                  createLvlBg(Images.lvl4bg, newX, newY);
                }if(newY >= 350){
                  createLvlBg(Images.lvl5bg, newX, newY);
                }
              }
            }
            if(!flag){
              this.State = PlayerStates.Idle;
              if(this.Direction == 1){
                this.PAC.ChangeAnimation(this.PAC.IdleRight);
              }
              else{
                this.PAC.ChangeAnimation(this.PAC.IdleLeft);
              }
            }
          })
        })}
    }
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
      this.PAC.CurrentAnimation.CurrentFrame,
      this.transform.Position.X + Camera.X,
      this.transform.Position.Y - Camera.Y,
      this.transform.Size.X,
      this.transform.Size.Y
    )
  }
}

function createLvlBg(lvlX, x, y) {
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
    new Vector2(0 + 100 * x, 100 * y),
    new Vector2(100, 100),
    lvlX,
    1,
    EntityTypes.BackGroundTile,
    SceneManager.Instance.mine
    )
  )
}


