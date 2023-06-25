export class Entity {
    IsActive = true
    constructor(transform, Image, Layer) {
      this.transform = transform
      this.Image = Image
      this.Layer = Layer
    }
    Update(Entities) {}
    GetCollider() {
      return [
        this.transform.Position,
        this.transform.Position.Add(this.transform.Size)
      ]
    }
    Draw(Context, CameraPosition) {
      if (this.IsActive) {
        Context.drawImage(
          this.Image,
          this.transform.Position.X + CameraPosition.X,
          this.transform.Position.Y - CameraPosition.Y,
          this.transform.Size.X,
          this.transform.Position.Y
        )
      }
    }
    SetActive(value) {
      this.IsActive = value
    }
  }
  