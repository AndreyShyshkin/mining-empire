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
            new Vector2(0 + 100 * x, 100 * (y-3)),
            new Vector2(300, 300),
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
        lvl1(SceneManager, x, y);
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
                chest(SceneManager, x, y)
              } else {    
                cross(SceneManager, x, y)
              }
              if(y >= 10 && y < 50){
                lvl1bg(SceneManager, x, y)
              }else if(y >= 50 && y < 150){
                lvl2bg(SceneManager, x, y)
              }else if(y >= 150 && y < 250){
                lvl3bg(SceneManager, x, y)
              }else if(y >= 250 && y < 350){
                lvl4bg(SceneManager, x, y)
              }else if(y >= 350){
                lvl5bg(SceneManager, x, y)
              }
            } x = xStart;
          } y = yStart;
        }else{
          if(y >= 10 && y < 50){
            if(r < 2){
              lvl1_res2(SceneManager, x, y);
            }
            else if(r < 5){
              lvl1_res1(SceneManager, x, y)
            }
            else
            lvl1(SceneManager, x, y);
          } else if (y >= 50 && y < 150){
            if(r < 2){
              lvl2_res3(SceneManager, x, y)
            }
            else if(r < 5){
              lvl2_res1(SceneManager, x, y);
            }
            else if(r < 10){
              lvl2_res2(SceneManager, x, y);
            }
            else
              lvl2(SceneManager, x, y);
          } else if (y >= 150 && y < 250){
            if(r < 2){
              lvl3_res4(SceneManager, x, y)
            }
            else if(r < 5){
              lvl3_res3(SceneManager, x, y);
            }
            else if(r < 10){
              lvl3_res2(SceneManager, x, y);
            }
            else
            lvl3(SceneManager, x, y)
          } else if (y >= 250 && y < 350){
            if(r < 2){
              lvl4_res5(SceneManager, x, y)
            }
            else if(r < 5){
              lvl4_res4(SceneManager, x, y);
            }
            else if(r < 10){
              lvl4_res3(SceneManager, x, y);
            }
            else
            lvl4(SceneManager, x, y)
          } else if (y >= 350){
            if(r < 2){
              lvl5_res6(SceneManager, x, y)
            }
            else if(r < 5){
              lvl5_res5(SceneManager, x, y);
            }
            else if(r < 10){
              lvl5_res4(SceneManager, x, y);
            }
            else
            lvl5(SceneManager, x, y)
          }
        }
      }
    }
  } 
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
function lvl1(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * y),
      new Vector2(100, 100),
      Images.lvl1,
      2,
      EntityTypes.SolidTile,
      SceneManager.Instance.mine
    )
  )
}

function lvl1bg(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * y),
      new Vector2(100, 100),
      Images.lvl1bg,
      1,
      EntityTypes.BackGroundTile,
      SceneManager.Instance.mine
    )
  )
}

function lvl1_res1(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * y),
      new Vector2(100, 100),
      Images.lvl1_res1,
      2,
      EntityTypes.SolidTile,
      SceneManager.Instance.mine
    )
  )
}

function lvl1_res2(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * y),
      new Vector2(100, 100),
      Images.lvl1_res2,
      2,
      EntityTypes.SolidTile,
      SceneManager.Instance.mine
    )
  )
}

function lvl1_res3(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * y),
      new Vector2(100, 100),
      Images.lvl1_res3,
      2,
      EntityTypes.SolidTile,
      SceneManager.Instance.mine
    )
  )
}

function lvl1_res4(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * y),
      new Vector2(100, 100),
      Images.lvl1_res4,
      2,
      EntityTypes.SolidTile,
      SceneManager.Instance.mine
    )
  )
}

function lvl1_res5(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * y),
      new Vector2(100, 100),
      Images.lvl1_res5,
      2,
      EntityTypes.SolidTile,
      SceneManager.Instance.mine
    )
  )
}

function lvl1_res6(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * y),
      new Vector2(100, 100),
      Images.lvl1_res6,
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

function lvl2(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
    new Vector2(0 + 100 * x, 100 * y),
    new Vector2(100, 100),
    Images.lvl2,
    2,      
    EntityTypes.SolidTile,
    SceneManager.Instance.mine
    )
  )
}

function lvl2bg(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * y),
      new Vector2(100, 100),
      Images.lvl2bg,
      1,
      EntityTypes.BackGroundTile,
      SceneManager.Instance.mine
    )
  )
}

function lvl2_res1(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * y),
      new Vector2(100, 100),
      Images.lvl2_res1,
      2,
      EntityTypes.SolidTile,
      SceneManager.Instance.mine
    )
  )
}

function lvl2_res2(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * y),
      new Vector2(100, 100),
      Images.lvl2_res2,
      2,
      EntityTypes.SolidTile,
      SceneManager.Instance.mine
    )
  )
}

function lvl2_res3(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * y),
      new Vector2(100, 100),
      Images.lvl2_res3,
      2,
      EntityTypes.SolidTile,
      SceneManager.Instance.mine
    )
  )
}

function lvl2_res4(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * y),
      new Vector2(100, 100),
      Images.lvl2_res4,
      2,
      EntityTypes.SolidTile,
      SceneManager.Instance.mine
    )
  )
}

function lvl2_res5(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * y),
      new Vector2(100, 100),
      Images.lvl2_res5,
      2,
      EntityTypes.SolidTile,
      SceneManager.Instance.mine
    )
  )
}

function lvl2_res6(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * y),
      new Vector2(100, 100),
      Images.lvl2_res6,
      2,
      EntityTypes.SolidTile,
      SceneManager.Instance.mine
    )
  )
}

function lvl3(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
    new Vector2(0 + 100 * x, 100 * y),
    new Vector2(100, 100),
    Images.lvl3,
    2,
    EntityTypes.SolidTile,
    SceneManager.Instance.mine
    )
  )
}

function lvl3bg(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * y),
      new Vector2(100, 100),
      Images.lvl3bg,
      1,
      EntityTypes.BackGroundTile,
      SceneManager.Instance.mine
    )
  )
}

function lvl3_res1(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * y),
      new Vector2(100, 100),
      Images.lvl3_res1,
      2,
      EntityTypes.SolidTile,
      SceneManager.Instance.mine
    )
  )
}

function lvl3_res2(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * y),
      new Vector2(100, 100),
      Images.lvl3_res2,
      2,
      EntityTypes.SolidTile,
      SceneManager.Instance.mine
    )
  )
}

function lvl3_res3(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * y),
      new Vector2(100, 100),
      Images.lvl3_res3,
      2,
      EntityTypes.SolidTile,
      SceneManager.Instance.mine
    )
  )
}

function lvl3_res4(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * y),
      new Vector2(100, 100),
      Images.lvl3_res4,
      2,
      EntityTypes.SolidTile,
      SceneManager.Instance.mine
    )
  )
}

function lvl3_res5(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * y),
      new Vector2(100, 100),
      Images.lvl3_res5,
      2,
      EntityTypes.SolidTile,
      SceneManager.Instance.mine
    )
  )
}

function lvl3_res6(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * y),
      new Vector2(100, 100),
      Images.lvl3_res6,
      2,
      EntityTypes.SolidTile,
      SceneManager.Instance.mine
    )
  )
}

function lvl4(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
    new Vector2(0 + 100 * x, 100 * y),
    new Vector2(100, 100),
    Images.lvl4,
    2,
    EntityTypes.SolidTile,
    SceneManager.Instance.mine
    )
  )
}

function lvl4bg(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * y),
      new Vector2(100, 100),
      Images.lvl4bg,
      1,
      EntityTypes.BackGroundTile,
      SceneManager.Instance.mine
    )
  )
}

function lvl4_res1(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * y),
      new Vector2(100, 100),
      Images.lvl4_res1,
      2,
      EntityTypes.SolidTile,
      SceneManager.Instance.mine
    )
  )
}

function lvl4_res2(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * y),
      new Vector2(100, 100),
      Images.lvl4_res2,
      2,
      EntityTypes.SolidTile,
      SceneManager.Instance.mine
    )
  )
}

function lvl4_res3(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * y),
      new Vector2(100, 100),
      Images.lvl4_res3,
      2,
      EntityTypes.SolidTile,
      SceneManager.Instance.mine
    )
  )
}

function lvl4_res4(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * y),
      new Vector2(100, 100),
      Images.lvl4_res4,
      2,
      EntityTypes.SolidTile,
      SceneManager.Instance.mine
    )
  )
}

function lvl4_res5(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * y),
      new Vector2(100, 100),
      Images.lvl4_res5,
      2,
      EntityTypes.SolidTile,
      SceneManager.Instance.mine
    )
  )
}

function lvl4_res6(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * y),
      new Vector2(100, 100),
      Images.lvl4_res6,
      2,
      EntityTypes.SolidTile,
      SceneManager.Instance.mine
    )
  )
}

function lvl5(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
    new Vector2(0 + 100 * x, 100 * y),
    new Vector2(100, 100),
    Images.lvl5,
    2,
    EntityTypes.SolidTile,
    SceneManager.Instance.mine
    )
  )
}

function lvl5bg(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * y),
      new Vector2(100, 100),
      Images.lvl5bg,
      1,
      EntityTypes.BackGroundTile,
      SceneManager.Instance.mine
    )
  )
}

function lvl5_res1(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * y),
      new Vector2(100, 100),
      Images.lvl5_res1,
      2,
      EntityTypes.SolidTile,
      SceneManager.Instance.mine
    )
  )
}

function lvl5_res2(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * y),
      new Vector2(100, 100),
      Images.lvl5_res2,
      2,
      EntityTypes.SolidTile,
      SceneManager.Instance.mine
    )
  )
}

function lvl5_res3(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * y),
      new Vector2(100, 100),
      Images.lvl5_res3,
      2,
      EntityTypes.SolidTile,
      SceneManager.Instance.mine
    )
  )
}

function lvl5_res4(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * y),
      new Vector2(100, 100),
      Images.lvl5_res4,
      2,
      EntityTypes.SolidTile,
      SceneManager.Instance.mine
    )
  )
}

function lvl5_res5(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * y),
      new Vector2(100, 100),
      Images.lvl5_res5,
      2,
      EntityTypes.SolidTile,
      SceneManager.Instance.mine
    )
  )
}

function lvl5_res6(SceneManager, x, y){
  SceneManager.Instance.mine.TC.GetLayer(y).push(
    new Tile(
      new Vector2(0 + 100 * x, 100 * y),
      new Vector2(100, 100),
      Images.lvl5_res6,
      2,
      EntityTypes.SolidTile,
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