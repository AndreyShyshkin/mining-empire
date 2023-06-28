import { Images } from "../Graphics/Images";
import { Entity } from "../Physics/Entity"
import { Transform } from "../Physics/Transform"

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
  }
  GetDamage(damage){
    this.curHp -= damage;
  }
}
