import { CreateImageByPath } from "../Logic/RenderImage"
import { Tile } from "../Entities/Tile"
import { Vector2 } from "../Math/Vector2"
import { Images } from "../Graphics/Images";

function village(TC){
    for (let y = 5; y < 1000; y++) {
      for (let x = -10; x < 30; x++) {
        if( y == 5 && x % 2 == 0 && x < 6){
          let r = Random(1, 3);
          switch (r){
            case 1:
              home1(TC, x, y);
              break;
            case 2:
              home2(TC, x, y);
              break;
            case 3:
              home3(TC, x, y);
              break;
          }
        }else if( y == 5 && x % 2 == 0 && x > 14){
          let r = Random(1, 3);
          switch (r){
            case 1:
              home1(TC, x, y);
              break;
            case 2:
              home2(TC, x, y);
              break;
            case 3:
              home3(TC, x, y);
              break;
          }
        }else if( y == 5 && x == 6){
          TC.GetLayer(y).push(
            new Tile(
              new Vector2(0 + 100 * x, 100 * (y-1) + 50),
              new Vector2(200, 200),
              Images.cave,
              1
            )
          )
        }else if( y == 5 && x == 12){
          TC.GetLayer(y).push(
            new Tile(
              new Vector2(0 + 100 * x, 100 * (y-1)),
              new Vector2(200, 200),
              Images.market,
              1
            )
          )
        }else if( y == 5 && x == 14){
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
        else if (y > 6 && y < 15){
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

function home1(TC, x, y){
  TC.GetLayer(y).push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * (y-1)),
      new Vector2(200, 200),
      Images.home1,
      1
    )
  )
}

function home2(TC, x, y){
  TC.GetLayer(y).push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * (y-1)),
      new Vector2(200, 200),
      Images.home2,
      1
    )
  )
}

function home3(TC, x, y){
  TC.GetLayer(y).push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * (y-1)),
      new Vector2(200, 200),
      Images.home3,
      1
    )
  )
}

function Random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default village;