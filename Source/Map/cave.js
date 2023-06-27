import { CreateImageByPath } from "../Logic/RenderImage"
import { Tile } from "../Entities/Tile"
import { Vector2 } from "../Math/Vector2"
import { Images } from "../Graphics/Images";
import { SceneManager } from "../Logic/SceneManager";

function cave(){
  for (let y = 6; y < 1000; y++) {
    for (let x = -50; x < 50; x++) {
      if (y == 6) {
        title1(SceneManager, x, y)
      }else if (y < 10){
        title2(SceneManager, x, y);
      } else {
        let r = Random(1, 100);
        let rd = Random(1, 1000);
        if(rd == 1 && y > 15  && x > -40 && x < 40){
          let yStart = y;
          let xStart = x;
            for(a = 0; a < 4; a++){
              if(a == 0){
                y = yStart;
              }else{
                y -= 1;
              }
              for(i = 0; i < 9; i++){
                if(i == 0){
                  x = xStart;
                }else{
                  x -= 1;
                }
              if(a == 0 && i == 3){
                chest(SceneManager, x, y)
              }else {    
                cross(SceneManager, x, y)
              }
              } x = xStart;
            } y = yStart;
        }else{
        if(y >= 10 && y < 50){
        if(r < 5){
          coal(SceneManager, x, y);
        }
        else if(r < 7){
          iron(SceneManager, x, y)
        }
        else
        title2(SceneManager, x, y);
      } else if (y >= 50){
        if(r < 5){
          iron(SceneManager, x, y)
        }
        else if(r < 7){
          coal(SceneManager, x, y);
        }
        else
          title2(SceneManager, x, y);
        }
        }
      }
    }
  }
  
}


function title1(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * y),
      new Vector2(100, 100),
      Images.tile1,
      1
    )
  )
}
function title2(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * y),
      new Vector2(100, 100),
      Images.tile2,
      1
    )
  )
}

function coal(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * y),
      new Vector2(100, 100),
      Images.coal,
      1
    )
  )
}

function iron(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * y),
      new Vector2(100, 100),
      Images.iron,
      1
    )
  )
}

function chest(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
    new Vector2(0 + 100 * x, 100 * y),
    new Vector2(100, 100),
    Images.chest,
    1
    )
  )
}

function cross(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
    new Vector2(0 + 100 * x, 100 * y),
    new Vector2(100, 100),
    Images.cross,
    1
    )
  )  
}

function Random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default cave;