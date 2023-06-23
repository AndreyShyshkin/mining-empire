const map = document.getElementById("playMap");

function createTrees(cotdinatX, cotdinatY){
      let trees = document.createElement("div");
      trees.className = "trees";

      let left = trees.style.left.replace("px", "");
      let top = trees.style.top.replace("px", "");

      trees.id = "x-" + left + "y-" + top;
      map.appendChild(trees);
      buildTrees(trees, cotdinatX, cotdinatY)
}

function buildTrees(trees, cotdinatX, cotdinatY){
      let treeFirst = document.createElement("div");
      treeFirst.className = "treeFirst";
      treeFirst.style.top = cotdinatX + 50 + "px";
      treeFirst.style.left = cotdinatY + "px";

      trees.appendChild(treeFirst);
      let hightTree = 0;
      for(i = 0; i < 5; i++){
            let treeTrunk = document.createElement("div");
            treeTrunk.className = "treeTrunk";
            treeTrunk.style.top = cotdinatX - hightTree + "px";
            treeTrunk.style.left = cotdinatY + "px";

            trees.appendChild(treeTrunk);
            hightTree += 50;

      }
      let treeTrunkLast = document.createElement("div");
      treeTrunkLast.className = "treeTrunkLast";
      treeTrunkLast.style.top = cotdinatX - hightTree + "px";
      treeTrunkLast.style.left = cotdinatY + "px";

      trees.appendChild(treeTrunkLast);

      hightTree += 50;

      let leaveY = cotdinatX;
      let leaveX = cotdinatY - 100;
      for(i = 0; i < 3; i++){
            leave(trees, hightTree, leaveY, leaveX)
            if(i == 1){
              leaveY += 50;
            }else{
            leaveY -= 50;
            }
            leaveX += 100;
      }
    }


 function leave(trees, hightTree, leaveY, leaveX){
  let leave_left_top = document.createElement("div");
  leave_left_top.className = "leave-left-top";
  leave_left_top.style.top = leaveY - hightTree + "px";
  leave_left_top.style.left = leaveX - 50 + "px";

  trees.appendChild(leave_left_top);
  
  let leave_middle_top = document.createElement("div");
  leave_middle_top.className = "leave-middle-top";
  leave_middle_top.style.top = leaveY - hightTree + "px";
  leave_middle_top.style.left = leaveX + "px";

  trees.appendChild(leave_middle_top);

  let leave_right_top = document.createElement("div");
  leave_right_top.className = "leave-right-top";
  leave_right_top.style.top = leaveY - hightTree + "px";
  leave_right_top.style.left = leaveX + 50 + "px";

  trees.appendChild(leave_right_top);


  hightTree -= 50;


  let leave_left_middle = document.createElement("div");
  leave_left_middle.className = "leave-left-middle";
  leave_left_middle.style.top = leaveY - hightTree + "px";
  leave_left_middle.style.left = leaveX - 50 + "px";

  trees.appendChild(leave_left_middle);
  
  let leave_middle_middle = document.createElement("div");
  leave_middle_middle.className = "leave-middle-middle";
  leave_middle_middle.style.top = leaveY - hightTree + "px";
  leave_middle_middle.style.left = leaveX + "px";

  trees.appendChild(leave_middle_middle);

  let leave_right_middle = document.createElement("div");
  leave_right_middle.className = "leave-right-middle";
  leave_right_middle.style.top = leaveY - hightTree + "px";
  leave_right_middle.style.left = leaveX + 50 + "px";

  trees.appendChild(leave_right_middle); 
  
  
  hightTree -= 50;

  let leave_left_bottom = document.createElement("div");
  leave_left_bottom.className = "leave-left-bottom";
  leave_left_bottom.style.top = leaveY - hightTree + "px";
  leave_left_bottom.style.left = leaveX - 50 + "px";

  trees.appendChild(leave_left_bottom);
  
  let leave_middle_bottom = document.createElement("div");
  leave_middle_bottom.className = "leave-middle-bottom";
  leave_middle_bottom.style.top = leaveY - hightTree + "px";
  leave_middle_bottom.style.left = leaveX + "px";

  trees.appendChild(leave_middle_bottom);

  let leave_right_bottom = document.createElement("div");
  leave_right_bottom.className = "leave-right-bottom";
  leave_right_bottom.style.top = leaveY - hightTree + "px";
  leave_right_bottom.style.left = leaveX + 50 + "px";

  trees.appendChild(leave_right_bottom); 
 }

export default createTrees;