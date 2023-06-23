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

  // Source/Map/surface.js
  var map = document.getElementById("playMap");
  var mapWidth = map.offsetWidth * 2;
  function createGround() {
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
  var surface_default = createGround;

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
      surface_default();
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
  game.Start();
})();
