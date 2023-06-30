import { Layer } from "./Layer"
export class Canvas {
  static Instance = new Canvas(3);
  Layers = []
  UI
  constructor(LayersCount, UILayersCount) {
    this.LayersCount = LayersCount
    this.canvas = document.querySelector("#game")
    this.WScale = 16
    this.HScale = 9
    this.updateSize()
    for (let i = 0; i < LayersCount; i++) {
      this.Layers.push(new Layer(document.querySelector("#game")))
    }    
    this.UI = document.querySelector("#game div");
    window.addEventListener("resize", () => this.updateSize()); 
  }
  updateSize() {
    let w = window.innerWidth / this.WScale
    let h = window.innerHeight / this.HScale
    let windowScale = Math.min(w, h)
    let WSize = windowScale * this.WScale
    let HSize = windowScale * this.HScale
    this.canvas.setAttribute("style", `width: ${WSize}px; height: ${HSize}px;`)
  }
  GetLayerContext(Layer) {
    if (Layer >= 0 && Layer < this.LayersCount) {
      return this.Layers[Layer].Context
    }
    return null
  }
}
