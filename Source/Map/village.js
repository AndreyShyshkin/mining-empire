import { CreateImageByPath } from "../Logic/RenderImage"
import { Tile } from "../Entities/Tile"
import { Vector2 } from "../Math/Vector2"
import { Images } from "../Graphics/Images";

function village(TC){
  level = "villageLVL";
    for (let y = 5; y < 1000; y++) {
      for (let x = -50; x < 50; x++) {
        if( y == 5 && x == 0){
          TC.GetLayer(y).push(
            new Tile(
              new Vector2(0 + 100 * x, 100 * (y-1) + 50),
              new Vector2(200, 200),
              Images.cave,
              1
            )
          )
        }else if( y == 5 && x == 4){
          TC.GetLayer(y).push(
            new Tile(
              new Vector2(0 + 100 * x, 100 * (y-1)),
              new Vector2(200, 200),
              Images.home1,
              1
            )
          )
        }else if( y == 5 && x == 6){
          TC.GetLayer(y).push(
            new Tile(
              new Vector2(0 + 100 * x, 100 * (y-1)),
              new Vector2(200, 200),
              Images.home2,
              1
            )
          )
        }else if( y == 5 && x == 8){
          TC.GetLayer(y).push(
            new Tile(
              new Vector2(0 + 100 * x, 100 * (y-1)),
              new Vector2(200, 200),
              Images.home3,
              1
            )
          )
        }else if( y == 5 && x == 10){
          TC.GetLayer(y).push(
            new Tile(
              new Vector2(0 + 100 * x, 100 * (y-1)),
              new Vector2(200, 200),
              Images.market,
              1
            )
          )
        }else if( y == 5 && x == 12){
          TC.GetLayer(y).push(
            new Tile(
              new Vector2(0 + 100 * x, 100 * (y-1)),
              new Vector2(200, 200),
              Images.forge,
              1
            )
          )
        }
        else if (y == 6) {
          TC.GetLayer(y).push(
            new Tile(
              new Vector2(0 + 100 * x, 100 * y),
              new Vector2(100, 100),
              Images.tile1,
              1
            )
          )
        }
        else if (y > 6 && y < 20){
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