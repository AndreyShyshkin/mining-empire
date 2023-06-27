import { CreateImageByPath } from "../Logic/RenderImage"
import { Tile } from "../Entities/Tile"
import { Vector2 } from "../Math/Vector2"
import { Images } from "../Graphics/Images";
import { SceneManager } from "../Logic/SceneManager";
function village(){
    for (let y = 5; y < 1000; y++) {
      for (let x = -10; x < 30; x++) {
        if( y == 5 && x % 2 == 0 && x < 6){
          let r = Random(1, 3);
          switch (r){
            case 1:
              home1(SceneManager.Instance.town.Entities, x, y);
              break;
            case 2:
              home2(SceneManager.Instance.town.Entities, x, y);
              break;
            case 3:
              home3(SceneManager.Instance.town.Entities, x, y);
              break;
          }
        }else if( y == 5 && x % 2 == 0 && x > 14){
          let r = Random(1, 3);
          switch (r){
            case 1:
              home1(SceneManager.Instance.town.Entities, x, y);
              break;
            case 2:
              home2(SceneManager.Instance.town.Entities, x, y);
              break;
            case 3:
              home3(SceneManager.Instance.town.Entities, x, y);
              break;
          }
        }else if( y == 5 && x == 6){
          SceneManager.Instance.town.Entities.push(
            new Tile(
              new Vector2(0 + 100 * x, 100 * (y-1) + 50),
              new Vector2(200, 200),
              Images.cave,
              1
            )
          )
        }else if( y == 5 && x == 12){
          SceneManager.Instance.town.Entities.push(
            new Tile(
              new Vector2(0 + 100 * x, 100 * (y-1)),
              new Vector2(200, 200),
              Images.market,
              1
            )
          )
        }else if( y == 5 && x == 14){
          SceneManager.Instance.town.Entities.push(
            new Tile(
              new Vector2(0 + 100 * x, 100 * (y-1)),
              new Vector2(200, 200),
              Images.forge,
              1
            )
          )
        }
        else if (y == 6) {
          SceneManager.Instance.town.TC.GetLayer(y).push(
            new Tile(
              new Vector2(0 + 100 * x, 100 * y),
              new Vector2(100, 100),
              Images.tile1,
              1
            )
          )
        }
        else if (y > 6 && y < 15){
          SceneManager.Instance.town.TC.GetLayer(y).push(
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

function home1(Entities, x, y){
  Entities.push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * (y-1)),
      new Vector2(200, 200),
      Images.home1,
      1
    )
  )
}

function home2(Entities, x, y){
  Entities.push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * (y-1)),
      new Vector2(200, 200),
      Images.home2,
      1
    )
  )
}

function home3(Entities, x, y){
  Entities.push(
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