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
  var mapWidth = map.offsetWidth * 2;
  var mapHeight = map.offsetHeight;
  function createGround() {
    let a = 0;
    let groundHeight = 50;
    while ((a + 1) * groundHeight <= mapHeight) {
      let i2 = 0;
      let groundWidth = 50;
      while ((i2 + 1) * groundWidth <= mapWidth) {
        let ground = document.createElement("div");
        ground.className = "ground";
        ground.style.top = 500 + a * groundHeight + "px";
        if (a > 0) {
          ground.classList.add("dirt");
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
  function createTrees() {
    let trees = document.createElement("div");
    trees.className = "trees";
    let left = trees.style.left.replace("px", "");
    let top = trees.style.top.replace("px", "");
    trees.id = "x-" + left + "y-" + top;
    map2.appendChild(trees);
    buildTrees(trees);
  }
  function buildTrees(trees) {
    let treeFirst = document.createElement("div");
    treeFirst.className = "treeFirst";
    treeFirst.style.top = "450px";
    treeFirst.style.left = "300px";
    trees.appendChild(treeFirst);
    let hightTree = 0;
    for (i = 0; i < 5; i++) {
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
  var treesCreate_default = createTrees;

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
  treesCreate_default();
  surface_default();
  game.Start();
})();
