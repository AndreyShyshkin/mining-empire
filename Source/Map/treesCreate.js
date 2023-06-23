const map = document.getElementById("playMap");

function createTrees(){
      let trees = document.createElement("div");
      trees.className = "trees";

      let left = trees.style.left.replace("px", "");
      let top = trees.style.top.replace("px", "");

      trees.id = "x-" + left + "y-" + top;
      map.appendChild(trees);
      buildTrees(trees)
}

function buildTrees(trees){
      let treeFirst = document.createElement("div");
      treeFirst.className = "treeFirst";
      treeFirst.style.top = "450px";
      treeFirst.style.left = "300px";

      trees.appendChild(treeFirst);
      let hightTree = 0;
      for(i = 0; i < 5; i++){
            let treeTrunk = document.createElement("div");
            treeTrunk.className = "treeTrunk";
            treeTrunk.style.top = 400 - hightTree + "px";
            treeTrunk.style.left = "300px";

            trees.appendChild(treeTrunk);
            hightTree += 50;

      }
      let treeTrunkLast = document.createElement("div");
      treeTrunkLast.className = "treeTrunkLast";
      treeTrunkLast.style.top = 400 - hightTree + "px";
      treeTrunkLast.style.left = "300px";

      trees.appendChild(treeTrunkLast);
}

export default createTrees;