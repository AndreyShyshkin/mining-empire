export class Layer {
    constructor(parent) {
      this.Canvas = document.createElement("canvas")
      this.Canvas.setAttribute(
        "style",
        "position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
      )
      parent.insertBefore(this.Canvas, document.querySelector("#game div"));
      this.Canvas.width = 1920;
      this.Canvas.height = 1080;
      this.Context = this.Canvas.getContext("2d");
    }
  }
  