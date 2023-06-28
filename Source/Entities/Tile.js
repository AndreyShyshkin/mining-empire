import { Entity } from "../Physics/Entity"
import { Transform } from "../Physics/Transform"

export class Tile extends Entity {
  constructor(position, size, Image, Layer, Type, Scene) {
    super(new Transform(position, size), Image, Layer, Type, Scene)
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
