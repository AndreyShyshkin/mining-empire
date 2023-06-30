import { Images } from "../Graphics/Images";
import { Entity } from "../Physics/Entity";
import { EntityTypes } from "../Physics/EntityTypes";
import { Transform } from "../Physics/Transform"
import { SceneManager } from "../Logic/SceneManager";
import { Vector2 } from "../Math/Vector2";
import resurse from "../Logic/inventory";
import { Player } from "./Player";
export class Tile extends Entity {
  curHp;
  maxHp;
  constructor(position, size, Image, Layer, Type, Scene, maxHp = 5) {
    super(new Transform(position, size), Image, Layer, Type, Scene);
    this.curHp = maxHp;
    this.maxHp = maxHp;
  }
  Draw(Context, Camera) {
    Context.drawImage(
      this.Image,
      this.transform.Position.X + Camera.X,
      this.transform.Position.Y - Camera.Y,
      this.transform.Size.X,
      this.transform.Size.Y
    )
    if(this.curHp < this.maxHp){
      let per = this.curHp / this.maxHp;
      if(per <= 0.2){
        Context.drawImage(
          Images.damage4,
          this.transform.Position.X + Camera.X,
          this.transform.Position.Y - Camera.Y,
          this.transform.Size.X,
          this.transform.Size.Y
        )
      }
      else if(per <= 0.4){
        Context.drawImage(
          Images.damage3,
          this.transform.Position.X + Camera.X,
          this.transform.Position.Y - Camera.Y,
          this.transform.Size.X,
          this.transform.Size.Y
        )
      }
      else if(per <= 0.6){
        Context.drawImage(
          Images.damage2,
          this.transform.Position.X + Camera.X,
          this.transform.Position.Y - Camera.Y,
          this.transform.Size.X,
          this.transform.Size.Y
        )
      }
      else{
        Context.drawImage(
          Images.damage1,
          this.transform.Position.X + Camera.X,
          this.transform.Position.Y - Camera.Y,
          this.transform.Size.X,
          this.transform.Size.Y
        )
      }
    }
    if(SceneManager.Instance.currentScene == SceneManager.Instance.mine){
      let fill = 0;
      let xDelta = Math.abs(this.transform.Position.X - Player.Instance.transform.Position.X);
      let yDelta = Math.abs(this.transform.Position.Y - Player.Instance.transform.Position.Y);
      if(xDelta < 100 && xDelta > -100){
        console.log(xDelta)
        console.log(this.transform.Position.ToString())
      }
      if(this.transform.Position.Y >= 900)
      fill = 0.2;       
      if(this.transform.Position.Y >= 1000)
      fill = 0.4;       
      if(this.transform.Position.Y >= 1100)
      fill = 0.6;       
      if(this.transform.Position.Y >= 1200)
      fill = 0.8;       
      if(this.transform.Position.Y >= 1300)
      fill = 1;
      if(xDelta + yDelta >= 700){
        fill = Math.min(1, fill);
      }
      else if(xDelta + yDelta >= 600){
        fill = Math.min(0.8, fill);
      }     
      else if(xDelta + yDelta >= 500){
        fill = Math.min(0.6, fill);
      } 
      else if(xDelta + yDelta >= 400){
        fill = Math.min(0.4, fill);
      }      
      else if(xDelta + yDelta >= 300){
        fill =  Math.min(0.2, fill);
      }
      else{
        fill = 0;
      }      
      if(fill != 0){
        Context.beginPath();
        Context.rect(
          this.transform.Position.X + Camera.X, 
          this.transform.Position.Y - Camera.Y, 
          this.transform.Size.X, 
          this.transform.Size.Y
        );
      Context.fillStyle = `rgba(0, 0, 0, ${fill})`; 
      Context.fill();
      Context.closePath();
      }
    }
  }
  GetDamage(damage){
    this.curHp -= damage;
  }
  OnDestroy(){
    // Создание нового блока
    let newX = Math.floor(this.transform.Position.X / 100);
    let newY = Math.floor(this.transform.Position.Y / 100);
      
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
    if(this.Image == Images.lvl1_res1 || this.Image == Images.lvl2_res1 || this.Image == Images.lvl3_res1 || this.Image == Images.lvl4_res1 || this.Image == Images.lvl5_res1){
      resurse.res1 += 1
    }if(this.Image == Images.lvl1_res2 || this.Image == Images.lvl2_res2 || this.Image == Images.lvl3_res2 || this.Image == Images.lvl4_res2 || this.Image == Images.lvl5_res2){
      resurse.res2 += 1
    }if(this.Image == Images.lvl1_res3 || this.Image == Images.lvl2_res3 || this.Image == Images.lvl3_res3 || this.Image == Images.lvl4_res3 || this.Image == Images.lvl5_res3){
      resurse.res3 += 1
    }if(this.Image == Images.lvl1_res4 || this.Image == Images.lvl2_res4 || this.Image == Images.lvl3_res4 || this.Image == Images.lvl4_res4 || this.Image == Images.lvl5_res4){
      resurse.res4 += 1
    }if(this.Image == Images.lvl1_res5 || this.Image == Images.lvl2_res5 || this.Image == Images.lvl3_res5 || this.Image == Images.lvl4_res5 || this.Image == Images.lvl5_res5){
      resurse.res5 += 1
    }if(this.Image == Images.lvl1_res6 || this.Image == Images.lvl2_res6 || this.Image == Images.lvl3_res6 || this.Image == Images.lvl4_res6 || this.Image == Images.lvl5_res6){
      resurse.res6 += 1
    }
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