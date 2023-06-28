import { CreateImageByPath } from "../Logic/RenderImage"
import { Tile } from "../Entities/Tile"
import { Vector2 } from "../Math/Vector2"
import { Images } from "../Graphics/Images";
import { SceneManager } from "../Logic/SceneManager";
import { EntityTypes } from "../Physics/EntityTypes";
import { Cave } from "../Entities/Cave";

function cave(){
  for (let y = 6; y < 1000; y++) {
    for (let x = -50; x < 50; x++) {
      if( y == 6 && x == 6){
        SceneManager.Instance.mine.Entities.push(
          new Cave(
            new Vector2(0 + 100 * x, 100 * (y-2)),
            new Vector2(300, 200),
            Images.cave,
            2,
            EntityTypes.Cave,
            SceneManager.Instance.mine
          )
      )
    }
      if (y == 6) {
        lvl1_grass(SceneManager, x, y)
      } else if (y < 10){
        lvl(Images.lvl1, SceneManager, x, y);
      } else {
        let r = Random(1, 100);
        let rd = Random(1, 2000);
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
              removeBlockAtCoordinates(x, y);
              if (a == 0 && i == 3){
                cross(SceneManager, x, y)
                chest(SceneManager, x, y)
              } else {    
                cross(SceneManager, x, y)
              }
              if(y >= 10 && y < 50){
                lvlBg(Images.lvl1bg, SceneManager, x, y);
              }else if(y >= 50 && y < 150){
                lvlBg(Images.lvl2bg, SceneManager, x, y);
              }else if(y >= 150 && y < 250){
                lvlBg(Images.lvl3bg, SceneManager, x, y);
              }else if(y >= 250 && y < 350){
                lvlBg(Images.lvl4bg, SceneManager, x, y);
              }else if(y >= 350){
                lvlBg(Images.lvl5bg, SceneManager, x, y);
              }
            } x = xStart;
          } y = yStart;
        }else{
          if(y >= 10 && y < 50){
            if(r < 2){
              lvlRes(Images.lvl1_res2, SceneManager, x, y);
            }
            else if(r < 5){
              lvlRes(Images.lvl1_res1, SceneManager, x, y);
            }
            else
              lvl(Images.lvl1, SceneManager, x, y);
          } else if (y >= 50 && y < 150){
            if(r < 2){
              lvlRes(Images.lvl2_res3, SceneManager, x, y);
            }
            else if(r < 5){
              lvlRes(Images.lvl2_res1, SceneManager, x, y);
            }
            else if(r < 10){
              lvlRes(Images.lvl2_res2, SceneManager, x, y);
            }
            else
              lvl(Images.lvl2, SceneManager, x, y);
          } else if (y >= 150 && y < 250){
            if(r < 2){
              lvlRes(Images.lvl3_res4, SceneManager, x, y);
            }
            else if(r < 5){
              lvlRes(Images.lvl3_res3, SceneManager, x, y);
            }
            else if(r < 10){
              lvlRes(Images.lvl3_res2, SceneManager, x, y);
            }
            else
              lvl(Images.lvl3, SceneManager, x, y);
          } else if (y >= 250 && y < 350){
            if(r < 2){
              lvlRes(Images.lvl4_res5, SceneManager, x, y);
            }
            else if(r < 5){
              lvlRes(Images.lvl4_res4, SceneManager, x, y);
            }
            else if(r < 10){
              lvlRes(Images.lvl4_res3, SceneManager, x, y);
            }
            else
              lvl(Images.lvl4, SceneManager, x, y);
          } else if (y >= 350){
            if(r < 2){
              lvlRes(Images.lvl5_res6, SceneManager, x, y);
            }
            else if(r < 5){
              lvlRes(Images.lvl5_res5, SceneManager, x, y);
            }
            else if(r < 10){
              lvlRes(Images.lvl5_res4, SceneManager, x, y);
            }
            else
              lvl(Images.lvl5, SceneManager, x, y);
          }
        }
      }
    }
  } 
}



function lvl(lvlX, SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * y),
      new Vector2(100, 100),
      lvlX,
      2,
      EntityTypes.SolidTile,
      SceneManager.Instance.mine
    )
  )
}

function lvlBg(lvlX, SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * y),
      new Vector2(100, 100),
      lvlX,
      1,
      EntityTypes.BackGroundTile,
      SceneManager.Instance.mine
    )
  )
}

function lvlRes(lvlX, SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * y),
      new Vector2(100, 100),
      lvlX,
      2,
      EntityTypes.SolidTile,
      SceneManager.Instance.mine
    )
  )
}

function lvl1_grass(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * y),
      new Vector2(100, 100),
      Images.lvl1_grass,
      2,
      EntityTypes.SolidTile,
      SceneManager.Instance.mine
    )
  )
}

function chest(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
    new Vector2(0 + 100 * x, 100 * y),
    new Vector2(100, 100),
    Images.chest,
    2,
    EntityTypes.DestroyableTile,
    SceneManager.Instance.mine
    )
  )
}

function cross(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
    new Vector2(0 + 100 * x, 100 * y),
    new Vector2(100, 100),
    Images.cross,
    2,
    EntityTypes.DestroyableTile,
    SceneManager.Instance.mine
    )
  )  
}

function Random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function removeBlockAtCoordinates(x, y) {
  const layer = SceneManager.Instance.mine.TC.GetLayer(y);
  for (let i = 0; i < layer.length; i++) {
    const block = layer[i];
    if (block.transform.Position.X === x * 100 && block.transform.Position.Y === y * 100) {
      layer.splice(i, 1); // Удаление блока из массива
      break;
    }
  }
}

export default cave;