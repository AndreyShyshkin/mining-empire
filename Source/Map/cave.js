import { CreateImageByPath } from "../Logic/RenderImage"
import { Tile } from "../Entities/Tile"
import { Vector2 } from "../Math/Vector2"
import { Images } from "../Graphics/Images";

function cave(TC){
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
      }else if (y < 10){
        TC.GetLayer(y).push(
          new Tile(
            new Vector2(0 + 100 * x, 100 * y),
            new Vector2(100, 100),
            Images.tile2,
            1
          )
        )
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
                TC.GetLayer(y).push(
                  new Tile(
                  new Vector2(0 + 100 * x, 100 * y),
                  new Vector2(100, 100),
                  Images.chest,
                  1
                  )
                )
              }else {    
              TC.GetLayer(y).push(
                new Tile(
                new Vector2(0 + 100 * x, 100 * y),
                new Vector2(100, 100),
                Images.cross,
                1
                )
              )}
              } x = xStart;
            } y = yStart;
        }else{
        if(y >= 10 && y < 50){
        if(r < 5){
          TC.GetLayer(y).push(
            new Tile(
              new Vector2(0 + 100 * x, 100 * y),
              new Vector2(100, 100),
              Images.coal,
              1
            )
          )
        }
        else if(r < 7){
          TC.GetLayer(y).push(
            new Tile(
              new Vector2(0 + 100 * x, 100 * y),
              new Vector2(100, 100),
              Images.iron,
              1
            )
          )
        }
        else
        TC.GetLayer(y).push(
          new Tile(
            new Vector2(0 + 100 * x, 100 * y),
            new Vector2(100, 100),
            Images.tile2,
            1
          )
        )
      } else if (y >= 50){
        if(r < 5){
          TC.GetLayer(y).push(
            new Tile(
              new Vector2(0 + 100 * x, 100 * y),
              new Vector2(100, 100),
              Images.iron,
              1
            )
          )
        }
        else if(r < 7){
          TC.GetLayer(y).push(
            new Tile(
              new Vector2(0 + 100 * x, 100 * y),
              new Vector2(100, 100),
              Images.coal,
              1
            )
          )
        }
        else
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
  }
  
}

function Random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default cave;