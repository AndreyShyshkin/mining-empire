const map = document.getElementById("playMap");
const mapWidth = map.offsetWidth * 2;


function createGround(){
    let i = 0;
    let groundWidth = 50;
    
    while ((i + 1) * groundWidth <= mapWidth) {
      let ground = document.createElement("div");
      ground.className = "ground";
      ground.style.top = "500px";
      ground.style.left = i * groundWidth + "px";
      map.appendChild(ground);

      i++;

    }
}

export default createGround;