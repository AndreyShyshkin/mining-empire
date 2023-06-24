const map = document.getElementById("playMap");
const mapWidth = 2000 * 2;
const mapHeight = 5000;

function createGround() {
  let a = 0;
  let groundHeight = 50;

  while ((a + 1) * groundHeight <= mapHeight) {
    let i = 0;
    let groundWidth = 50;

    while ((i + 1) * groundWidth <= mapWidth) {

      let ground = document.createElement("div");
      
      ground.className = "ground";
      
      ground.style.top = 700 + a * groundHeight + "px";
      ground.style.left = i * groundWidth + "px";

      let left = ground.style.left.replace("px", "");
      let top = ground.style.top.replace("px", "");

      if(a > 0){
        let dangSpawn = Math.floor(Math.random() * 2000);
        if(dangSpawn < 1 && a > 10 && left > 10 && left < mapWidth - 10){danger(ground, left, top);}else{
        if(a > 3 && a < 20){
        let spawn = Math.floor(Math.random() * 100);
        if(spawn < 3){
            ground.classList.add("iron")
          }else if(spawn < 10){
            ground.classList.add("coal")
          }else{
            ground.classList.add("dirt")
            }
        }else{
            ground.classList.add("dirt")
        }
        if(a > 20){
            let spawn = Math.floor(Math.random() * 100);
            if(spawn < 3){
                ground.classList.add("coal")
              }else if(spawn < 10){
                ground.classList.add("iron")
              }else{
                ground.classList.add("dirt")
                }
            }else{
                ground.classList.add("dirt")
            }

        
          }
      }
  

        ground.id = "x-" + left + "y-" + top;
        map.appendChild(ground);
      i++;
    }

    a++;
  }
}

function danger(ground, left, top){
  ground.classList.add("dangerWall");
  let dangerWidth = 0;
  let dangerHeight = 0;

  while(dangerHeight < 7){
    while(dangerWidth < 12){
      if(dangerHeight == 0 || dangerHeight == 6 || dangerWidth == 0 || dangerWidth == 11){
        let danger = document.createElement("div");
    
        danger.className = "danger";
        
        danger.style.top = parseInt(top) - dangerHeight * 50 + "px";
        danger.style.left = parseInt(left) - dangerWidth * 50  + "px";

        danger.classList.add("dangerWall");

        map.appendChild(danger);
      }else{
      let danger = document.createElement("div");
    
      danger.className = "danger";
      
      danger.style.top = parseInt(top) - dangerHeight * 50 + "px";
      danger.style.left = parseInt(left) - dangerWidth * 50  + "px";

      danger.classList.add("dirt-bg");

      map.appendChild(danger);

      if(dangerHeight == 1 && dangerWidth == 4){
        let chest = document.createElement("div");
    
        chest.className = "chest";

        chest.style.top = parseInt(top) - dangerHeight * 50 + "px";
        chest.style.left = parseInt(left) + 50 - dangerWidth * 50  + "px";

        map.appendChild(chest);
      }
      }

      dangerWidth++;
    }
    dangerHeight++;
    dangerWidth = 0;
  }
}



export default createGround;
