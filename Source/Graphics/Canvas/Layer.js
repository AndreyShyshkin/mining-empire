export class Layer {
    constructor(parent) {
      this.Canvas = document.createElement("canvas")
      this.Canvas.setAttribute(
        "style",
        "position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
      )
      parent.append(this.Canvas)
      this.Canvas.width = 1920
      this.Canvas.height = 1080
      this.Context = this.Canvas.getContext("2d")
      let img = new Image()
      img.src = "Res/img/1085818.jpg"
      this.Context.drawImage(img, 0, 0)
    }
  }
  