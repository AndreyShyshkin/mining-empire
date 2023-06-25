import { Vector2 } from "../Math/Vector2"
import { Collisions } from "../Physics/Collisions"
import { Entity } from "../Physics/Entity"
import { Transform } from "../Physics/Transform"

export class Player extends Entity {
  constructor(position, size, Image, Layer) {
    super(new Transform(position, size), Image, Layer)
  }
  Update(Entities) {
    Entities.forEach(entity => {
      if (!(entity === this)) {
        let t = 10
        let Left = [
          new Vector2(this.transform.Position.X, this.transform.Position.Y + t),
          new Vector2(
            this.transform.Position.X,
            this.transform.Position.Y + this.transform.Size.Y - t
          )
        ]
        let Right = [
          new Vector2(
            this.transform.Position.X + this.transform.Size.X,
            this.transform.Position.Y + t
          ),
          new Vector2(
            this.transform.Position.X + this.transform.Size.X,
            this.transform.Position.Y + this.transform.Size.Y - t
          )
        ]
        let Top = [
          new Vector2(this.transform.Position.X + t, this.transform.Position.Y),
          new Vector2(
            this.transform.Position.X + this.transform.Size.X - t,
            this.transform.Position.Y
          )
        ]
        let Bottom = [
          new Vector2(
            this.transform.Position.X + t,
            this.transform.Position.Y + this.transform.Size.Y
          ),
          new Vector2(
            this.transform.Position.X + this.transform.Size.X - t,
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
          //console.log("Collision Bottom");
        }
      }
    })
  }
  GetColliderDot() {
    return [
      this.transform.Position.Add(this.transform.Size.Scale(0.5)),
      this.transform.Position.Add(this.transform.Size.Scale(0.5))
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
