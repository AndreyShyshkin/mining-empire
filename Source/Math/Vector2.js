import { MathConstants } from "./MathConstants"
export class Vector2 {
  constructor(X, Y) {
    this.X = X
    this.Y = Y
  }
  Add(vector) {
    return Vector2.Add(this, vector)
  }
  Angle(vector) {
    return Vector2.Angle(this, vector)
  }
  Dot(vector) {
    return Vector2.Dot(this, vector)
  }
  Rotate(angle) {
    return Vector2.Rotate(this, angle)
  }
  Magnitude() {
    return Vector2.Magnitude(this)
  }
  Normilize() {
    return Vector2.Normilize(this)
  }
  Equals(vector) {
    return Vector2.Equals(this, vector)
  }
  ToSting() {
    return `X: ${this.X}; Y: ${this.Y}`
  }
  Scale(number) {
    return Vector2.Scale(this, number)
  }
  Set(X, Y) {
    this.X = X
    this.Y = Y
  }
  static get Zero() {
    return new Vector2(0, 0)
  }
  static get One() {
    return new Vector2(1, 1)
  }
  static get Right() {
    return new Vector2(1, 0)
  }
  static get Left() {
    return new Vector2(-1, 0)
  }
  static get Up() {
    return new Vector2(0, 1)
  }
  static get Down() {
    return new Vector2(0, -1)
  }
  static Equals(vector1, vector2) {
    return vector1.X == vector2.X && vector1.Y == vector2.Y
  }
  static Add(vector1, vector2) {
    return new Vector2(vector1.X + vector2.X, vector1.Y + vector2.Y)
  }
  static Angle(vector1, vector2) {
    if (
      !Vector2.Equals(vector1, Vector2.Zero) &&
      !Vector2.Equals(vector1, Vector2.Zero)
    ) {
      return (
        Math.acos(
          Vector2.Dot(vector1, vector2) /
            (vector1.Magnitude() * vector2.Magnitude())
        ) * MathConstants.RadianToDegrees
      )
    }
    return NaN
  }
  static Dot(vector1, vector2) {
    return vector1.X * vector2.X + vector1.Y * vector2.Y
  }
  static Distance(vector1, vector2) {
    return Math.sqrt(
      Math.pow(vector2.X - vector1.X, 2) + Math.pow(vector2.Y - vector1.Y, 2)
    )
  }
  static Magnitude(vector) {
    return Math.sqrt(Math.pow(vector.X, 2) + Math.pow(vector.Y, 2))
  }
  static Normilize(vector) {
    let m = Vector2.Magnitude(vector)
    return new Vector2(vector.X / m, vector.Y / m)
  }
  static Scale(vector, number) {
    return new Vector2(vector.X * number, vector.Y * number)
  }
  static LineNormal(vector1, vector2) {
    return new Vector2(-(vector2.X - vector1.X), vector2.Y - vector1.Y)
  }
  static Rotate(vector, angle) {
    angle = angle * MathConstants.DegreesToRadian
    let m = vector.Magnitude()
    vector = vector.Normilize()
    return new Vector2(Math.cos(angle) * m, Math.sin(angle) * m)
  }
}
