export class Entity {
    IsActive = true;
    Type;
    Scene;
    constructor(transform, Image, Layer, Type, Scene) {
      this.transform = transform;
      this.Image = Image;
      this.Layer = Layer;
      this.Type = Type;
      this.Scene = Scene;
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
    Collision(entity){
    }
    GetDamage(Damage){
    }
  }
  