import { Vector2 } from "../Math/Vector2"
import { Collisions } from "../Physics/Collisions"
import { Entity } from "../Physics/Entity"
import { Transform } from "../Physics/Transform"
import { Time } from "../Logic/Time"

export class Player extends Entity {
  bottomCollision = false;
  velocityY = 0;
  constructor(position, size, Image, Layer) {
    super(new Transform(position, size), Image, Layer)
  }
  Update(Entities) {
    let bottomFlag = false;
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
          //console.log("Collision Left");
        }
        if (Collisions.AABBtoAABB(entity.GetCollider(), Right)) {
          //console.log("Collision Right");
        }
        if (Collisions.AABBtoAABB(entity.GetCollider(), Top)) {
          //console.log("Collision Top");
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
