import { Vector2 } from "../Math/Vector2"
export class Transform {
  Position = Vector2.Zero
  Size = Vector2.One
  constructor(Position, size) {
    this.Position = Position
    this.Size = size
  }
}
