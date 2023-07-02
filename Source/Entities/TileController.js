export class TileController {
  Layers = []
  LoadedLayers = []
  constructor(tileSize, cameraHeight) {
    this.tileSize = tileSize
    this.cameraHeight = cameraHeight
  }
  GetLayer(Layer) {
    if (Layer > -1) {
      if (Layer > this.Layers.length - 1) {
        for (let i = this.Layers.length; i <= Layer; i++) {
          this.Layers.push([])
        }
      }
      return this.Layers[Layer]
    }
    return null
  }
  UpdateLoadted(cameraPosH) {
    this.LoadedLayers = []
    for (
      let y = cameraPosH - 100;
      y < cameraPosH + this.cameraHeight + 100;
      y += this.tileSize
    ) {
      if (y > 0 && Math.floor(y / this.tileSize) < this.Layers.length) {
        this.LoadedLayers.push(this.Layers[Math.floor(y / this.tileSize)])
      }
    }
  }
  GetLayerByPos(y){
    let i = 0;
    y /= this.tileSize;
    y = Math.floor(y);
    y *= this.tileSize;
    while(i < this.Layers.length){
      if(this.Layers[i].length > 0){
        if(this.Layers[i][0].transform.Position.Y == y){
          return this.GetLayer(i);
        }
      }
      i++;
    }
    return null;
  }
}
  