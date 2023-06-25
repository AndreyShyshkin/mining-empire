import { CreateImageByPath } from "../Logic/RenderImage"
import { Tile } from "../Entities/Tile"
import { Vector2 } from "../Math/Vector2"
import { Images } from "../Graphics/Images";

function village(TC){
    for (let y = 6; y < 1000; y++) {
      for (let x = -50; x < 50; x++) {
        if (y == 6) {
          TC.GetLayer(y).push(
            new Tile(
              new Vector2(0 + 100 * x, 100 * y),
              new Vector2(100, 100),
              Images.tile1,
              1
            )
          )
        }
        else if (y < 20){
          TC.GetLayer(y).push(
            new Tile(
              new Vector2(0 + 100 * x, 100 * y),
              new Vector2(100, 100),
              Images.tile2,
              1
            )
          )
        }
      }
    }
}

export default village;