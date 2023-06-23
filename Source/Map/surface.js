const map = document.getElementById("playMap");
const mapWidth = 2000 * 2;
const mapHeight = map.offsetHeight;

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
      if(a > 0){
        ground.classList.add("dirt")
      }
      ground.style.left = i * groundWidth + "px";

      let left = ground.style.left.replace("px", "");
      let top = ground.style.top.replace("px", "");

      ground.id = "x-" + left + "y-" + top;
      map.appendChild(ground);

      i++;
    }

    a++;
  }
}

export default createGround;