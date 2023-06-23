(() => {
  // Source/Logic/Time.js
  var Time = class _Time {
    static #prevTime;
    static #curTime;
    static #deltaTime = (_Time.#curTime - _Time.#prevTime) / 1e3;
    static Init() {
      _Time.#prevTime = performance.now();
      _Time.#curTime = performance.now();
    }
    static Update() {
      _Time.#curTime = performance.now();
      _Time.#deltaTime = (_Time.#curTime - _Time.#prevTime) / 1e3;
      _Time.#prevTime = _Time.#curTime;
    }
    static get DeltaTime() {
      return _Time.#deltaTime;
    }
  };

  // Source/Logic/Game.js
  var Game = class {
    onStart;
    onUpdate;
    onStop;
    onStartPause;
    onClearPause;
    ShouldStop = false;
    constructor(onStart, onUpdate, onStop, onStartPause, onClearPause) {
      this.onStart = onStart;
      this.onUpdate = onUpdate;
      this.onStop = onStop;
      this.onStartPause = onStartPause;
      this.onClearPause = onClearPause;
    }
    Start() {
      this.onStart();
      Time.Init();
      window.requestAnimationFrame(this.Update.bind(this));
    }
    Update() {
      if (!this.ShouldStop) {
        Time.Update();
        this.onUpdate();
        window.requestAnimationFrame(this.Update.bind(this));
      }
    }
  };

  // Source/Map/surface.js
  var map = document.getElementById("playMap");
  var mapWidth = 2e3 * 2;
  var mapHeight = 5e3;
  function createGround() {
    let a = 0;
    let groundHeight = 50;
    while ((a + 1) * groundHeight <= mapHeight) {
      let i2 = 0;
      let groundWidth = 50;
      while ((i2 + 1) * groundWidth <= mapWidth) {
        let ground = document.createElement("div");
        ground.className = "ground";
        ground.style.top = 700 + a * groundHeight + "px";
        if (a > 0) {
          if (a > 3 && a < 20) {
            let spawn = Math.floor(Math.random() * 100);
            if (spawn < 5) {
              ground.classList.add("iron");
            } else if (spawn < 15) {
              ground.classList.add("coal");
            } else {
              ground.classList.add("dirt");
            }
          } else {
            ground.classList.add("dirt");
          }
          if (a > 20) {
            let spawn = Math.floor(Math.random() * 100);
            if (spawn < 5) {
              ground.classList.add("coal");
            } else if (spawn < 15) {
              ground.classList.add("iron");
            } else {
              ground.classList.add("dirt");
            }
          } else {
            ground.classList.add("dirt");
          }
        }
        ground.style.left = i2 * groundWidth + "px";
        let left = ground.style.left.replace("px", "");
        let top = ground.style.top.replace("px", "");
        ground.id = "x-" + left + "y-" + top;
        map.appendChild(ground);
        i2++;
      }
      a++;
    }
  }
  var surface_default = createGround;

  // Source/Map/treesCreate.js
  var map2 = document.getElementById("playMap");
  function createTrees(cotdinatX, cotdinatY) {
    let trees = document.createElement("div");
    trees.className = "trees";
    let left = trees.style.left.replace("px", "");
    let top = trees.style.top.replace("px", "");
    trees.id = "x-" + left + "y-" + top;
    map2.appendChild(trees);
    buildTrees(trees, cotdinatX, cotdinatY);
  }
  function buildTrees(trees, cotdinatX, cotdinatY) {
    let treeFirst = document.createElement("div");
    treeFirst.className = "treeFirst";
    treeFirst.style.top = cotdinatX + 50 + "px";
    treeFirst.style.left = cotdinatY + "px";
    trees.appendChild(treeFirst);
    let hightTree = 0;
    for (i = 0; i < 5; i++) {
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
    for (i = 0; i < 3; i++) {
      leave(trees, hightTree, leaveY, leaveX);
      if (i == 1) {
        leaveY += 50;
      } else {
        leaveY -= 50;
      }
      leaveX += 100;
    }
  }
  function leave(trees, hightTree, leaveY, leaveX) {
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
  var treesCreate_default = createTrees;

  // Source/Map/home.js
  var map3 = document.getElementById("playMap");
  function home(cordinatY, cordinatX) {
    let home2 = document.createElement("div");
    home2.className = "home";
    map3.appendChild(home2);
    for (i = 1; i < 5; i++) {
      const home3 = document.getElementById("playMap");
      let homeLevel1 = document.createElement("div");
      homeLevel1.className = "home-" + i + "-1";
      homeLevel1.style.top = cordinatY - 200 + "px";
      homeLevel1.style.left = cordinatX + 100 * i + "px";
      home3.appendChild(homeLevel1);
    }
    for (i = 1; i < 5; i++) {
      const home3 = document.getElementById("playMap");
      let homeLevel2 = document.createElement("div");
      homeLevel2.className = "home-" + i + "-2";
      homeLevel2.style.top = cordinatY - 100 + "px";
      homeLevel2.style.left = cordinatX + 100 * i + "px";
      home3.appendChild(homeLevel2);
    }
    for (i = 1; i < 5; i++) {
      const home3 = document.getElementById("playMap");
      let homeLevel3 = document.createElement("div");
      homeLevel3.className = "home-" + i + "-3";
      homeLevel3.style.top = cordinatY + "px";
      homeLevel3.style.left = cordinatX + 100 * i + "px";
      home3.appendChild(homeLevel3);
    }
  }
  var home_default = home;

  // Source/player.js
  function player() {
    const moveRange = 20;
    window.scrollTo(0, 0);
    document.addEventListener("keydown", function(event) {
      if (event.keyCode === 68) {
        event.preventDefault();
        movePlayer("left", moveRange);
        window.scrollBy(moveRange, 0);
      } else if (event.keyCode === 65) {
        event.preventDefault();
        movePlayer("left", -moveRange);
        window.scrollBy(-moveRange, 0);
      } else if (event.keyCode === 32 || event.keyCode === 87) {
        event.preventDefault();
        movePlayer("top", -moveRange);
        window.scrollBy(0, -moveRange);
      } else if (event.keyCode === 17 || event.keyCode === 83) {
        event.preventDefault();
        movePlayer("top", moveRange);
        window.scrollBy(0, moveRange);
      }
    });
  }
  function movePlayer(property, value) {
    let player2 = document.getElementById("player");
    if (player2) {
      let current = parseInt(player2.style[property]) || 0;
      let newPosition = current + value;
      player2.style[property] = newPosition + "px";
    }
  }
  var player_default = player;

  // Source/main.js
  var game = new Game(() => {
  }, Update, () => {
  }, () => {
  }, () => {
  });
  var p = document.querySelector("p");
  function Update() {
    p.innerText = Time.DeltaTime;
  }
  treesCreate_default(600, 300);
  treesCreate_default(600, 900);
  home_default(600, 1300);
  treesCreate_default(600, 2100);
  treesCreate_default(600, 2700);
  surface_default();
  player_default();
  window.onload = function() {
    restartGame();
  };
  var restart = document.querySelector(".restart");
  restart.onclick = function restartGame2() {
    window.scrollTo(0, 0);
  };
  game.Start();
})();
