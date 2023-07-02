(() => {
  // Source/Graphics/Canvas/Layer.js
  var Layer = class {
    constructor(parent) {
      this.Canvas = document.createElement("canvas");
      this.Canvas.setAttribute(
        "style",
        "position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
      );
      parent.insertBefore(this.Canvas, document.querySelector("#game div"));
      this.Canvas.width = 1920;
      this.Canvas.height = 1080;
      this.Context = this.Canvas.getContext("2d");
    }
  };

  // Source/Graphics/Canvas/Canvas.js
  var Canvas = class _Canvas {
    static Instance = new _Canvas(4);
    Layers = [];
    UI;
    constructor(LayersCount) {
      this.LayersCount = LayersCount;
      this.canvas = document.querySelector("#game");
      this.WScale = 16;
      this.HScale = 9;
      this.updateSize();
      for (let i2 = 0; i2 < LayersCount; i2++) {
        this.Layers.push(new Layer(document.querySelector("#game")));
      }
      this.UI = document.querySelector("#game div");
      window.addEventListener("resize", () => this.updateSize());
    }
    updateSize() {
      let w = window.innerWidth / this.WScale;
      let h = window.innerHeight / this.HScale;
      let windowScale = Math.min(w, h);
      let WSize = windowScale * this.WScale;
      let HSize = windowScale * this.HScale;
      this.canvas.setAttribute("style", `width: ${WSize}px; height: ${HSize}px;`);
    }
    GetLayerContext(Layer2) {
      if (Layer2 >= 0 && Layer2 < this.LayersCount) {
        return this.Layers[Layer2].Context;
      }
      return null;
    }
  };

  // Source/Math/MathConstants.js
  var MathConstants = class {
    static RadianToDegrees = 180 / Math.PI;
    static DegreesToRadian = Math.PI / 180;
  };

  // Source/Math/Vector2.js
  var Vector2 = class _Vector2 {
    constructor(X, Y) {
      this.X = X;
      this.Y = Y;
    }
    Add(vector) {
      return _Vector2.Add(this, vector);
    }
    Angle(vector) {
      return _Vector2.Angle(this, vector);
    }
    Dot(vector) {
      return _Vector2.Dot(this, vector);
    }
    Rotate(angle) {
      return _Vector2.Rotate(this, angle);
    }
    Magnitude() {
      return _Vector2.Magnitude(this);
    }
    Normilize() {
      return _Vector2.Normilize(this);
    }
    Equals(vector) {
      return _Vector2.Equals(this, vector);
    }
    ToString() {
      return `X: ${this.X}; Y: ${this.Y}`;
    }
    Scale(number) {
      return _Vector2.Scale(this, number);
    }
    Set(X, Y) {
      this.X = X;
      this.Y = Y;
    }
    static get Zero() {
      return new _Vector2(0, 0);
    }
    static get One() {
      return new _Vector2(1, 1);
    }
    static get Right() {
      return new _Vector2(1, 0);
    }
    static get Left() {
      return new _Vector2(-1, 0);
    }
    static get Up() {
      return new _Vector2(0, 1);
    }
    static get Down() {
      return new _Vector2(0, -1);
    }
    static Equals(vector1, vector2) {
      return vector1.X == vector2.X && vector1.Y == vector2.Y;
    }
    static Add(vector1, vector2) {
      return new _Vector2(vector1.X + vector2.X, vector1.Y + vector2.Y);
    }
    static Angle(vector1, vector2) {
      if (!_Vector2.Equals(vector1, _Vector2.Zero) && !_Vector2.Equals(vector1, _Vector2.Zero)) {
        return Math.acos(
          _Vector2.Dot(vector1, vector2) / (vector1.Magnitude() * vector2.Magnitude())
        ) * MathConstants.RadianToDegrees;
      }
      return NaN;
    }
    static Dot(vector1, vector2) {
      return vector1.X * vector2.X + vector1.Y * vector2.Y;
    }
    static Distance(vector1, vector2) {
      return Math.sqrt(
        Math.pow(vector2.X - vector1.X, 2) + Math.pow(vector2.Y - vector1.Y, 2)
      );
    }
    static Magnitude(vector) {
      return Math.sqrt(Math.pow(vector.X, 2) + Math.pow(vector.Y, 2));
    }
    static Normilize(vector) {
      let m = _Vector2.Magnitude(vector);
      return new _Vector2(vector.X / m, vector.Y / m);
    }
    static Scale(vector, number) {
      return new _Vector2(vector.X * number, vector.Y * number);
    }
    static LineNormal(vector1, vector2) {
      return new _Vector2(-(vector2.X - vector1.X), vector2.Y - vector1.Y);
    }
    static Rotate(vector, angle) {
      angle = angle * MathConstants.DegreesToRadian;
      let m = vector.Magnitude();
      vector = vector.Normilize();
      return new _Vector2(Math.cos(angle) * m, Math.sin(angle) * m);
    }
    static Round(vector) {
      if (vector.X > 0) {
        vector.X = Math.floor(vector.X);
      } else if (vector.X < 0) {
        vector.X = Math.ceil(vector.X);
      }
      if (vector.Y > 0) {
        vector.Y = Math.floor(vector.Y);
      } else if (vector.Y < 0) {
        vector.Y = Math.ceil(vector.Y);
      }
      return vector;
    }
  };

  // Source/Logic/Time.js
  var Time = class _Time {
    static deltaTime = (_Time.curTime - _Time.prevTime) / 1e3;
    static Init() {
      _Time.prevTime = performance.now();
      _Time.curTime = performance.now();
      window.addEventListener("focus", () => _Time.OnFocus());
    }
    static Update() {
      _Time.curTime = performance.now();
      _Time.deltaTime = (_Time.curTime - _Time.prevTime) / 1e3;
      _Time.prevTime = _Time.curTime;
    }
    static OnFocus() {
      _Time.prevTime = performance.now();
      _Time.curTime = performance.now();
      _Time.Update();
    }
    static get DeltaTime() {
      return _Time.deltaTime;
    }
  };

  // Source/Logic/Input.js
  var Input = class _Input {
    static activeKeys = [];
    static Init() {
      document.onkeydown = _Input.#onKeyDown;
      document.onkeyup = _Input.#onKeyUP;
      window.addEventListener("blur", () => {
        _Input.#onChangeFocus();
      });
    }
    static #onKeyDown(e) {
      _Input.#SetKeyState(e, true);
    }
    static #onKeyUP(e) {
      _Input.#SetKeyState(e, false);
    }
    static #onChangeFocus() {
      _Input.activeKeys = [];
    }
    static #SetKeyState(e, state) {
      if (e.keyCode == 9) {
        return;
      }
      if (state == true) {
        if (!_Input.activeKeys.includes(e.keyCode)) {
          _Input.activeKeys.push(e.keyCode);
        }
      } else {
        if (_Input.activeKeys.includes(e.keyCode)) {
          _Input.activeKeys.splice(_Input.activeKeys.indexOf(e.keyCode), 1);
        }
      }
    }
    static GetKeyState(keyCode) {
      return this.activeKeys.includes(keyCode);
    }
  };

  // Source/Logic/Game.js
  var Game = class {
    ShouldStop = false;
    IsPause = false;
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
      Input.Init();
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

  // Source/Physics/Collisions.js
  var Collisions = class {
    static AABBtoAABB(col1, col2) {
      let axmin = col1[0].X;
      let axmax = col1[1].X;
      let aymin = col1[0].Y;
      let aymax = col1[1].Y;
      let bxmin = col2[0].X;
      let bxmax = col2[1].X;
      let bymin = col2[0].Y;
      let bymax = col2[1].Y;
      if (axmin <= bxmax && bxmin <= axmax && aymin <= bymax && bymin <= aymax) {
        return true;
      } else {
        return false;
      }
    }
  };

  // Source/Physics/Entity.js
  var Entity = class {
    IsActive = true;
    Type;
    Scene;
    constructor(transform, Image2, Layer2, Type, Scene2) {
      this.transform = transform;
      this.Image = Image2;
      this.Layer = Layer2;
      this.Type = Type;
      this.Scene = Scene2;
    }
    Update(Entities) {
    }
    GetCollider() {
      return [
        this.transform.Position,
        this.transform.Position.Add(this.transform.Size)
      ];
    }
    Draw(Context, CameraPosition) {
      if (this.IsActive) {
        Context.drawImage(
          this.Image,
          this.transform.Position.X + CameraPosition.X,
          this.transform.Position.Y - CameraPosition.Y,
          this.transform.Size.X,
          this.transform.Position.Y
        );
      }
    }
    SetActive(value) {
      this.IsActive = value;
    }
    Collision(entity) {
    }
    GetDamage(Damage) {
    }
    OnDestroy() {
    }
  };

  // Source/Physics/Transform.js
  var Transform = class {
    Position = Vector2.Zero;
    Size = Vector2.One;
    constructor(Position, size) {
      this.Position = Position;
      this.Size = size;
    }
  };

  // Source/Physics/Physics.js
  var Physics = class {
    static G = 1e3;
  };

  // Source/Entities/TileController.js
  var TileController = class {
    Layers = [];
    LoadedLayers = [];
    constructor(tileSize, cameraHeight) {
      this.tileSize = tileSize;
      this.cameraHeight = cameraHeight;
    }
    GetLayer(Layer2) {
      if (Layer2 > -1) {
        if (Layer2 > this.Layers.length - 1) {
          for (let i2 = this.Layers.length; i2 <= Layer2; i2++) {
            this.Layers.push([]);
          }
        }
        return this.Layers[Layer2];
      }
      return null;
    }
    UpdateLoadted(cameraPosH) {
      this.LoadedLayers = [];
      for (let y = cameraPosH - 100; y < cameraPosH + this.cameraHeight + 100; y += this.tileSize) {
        if (y > 0 && Math.floor(y / this.tileSize) < this.Layers.length) {
          this.LoadedLayers.push(this.Layers[Math.floor(y / this.tileSize)]);
        }
      }
    }
    GetLayerByPos(y) {
      let i2 = 0;
      y /= this.tileSize;
      y = Math.floor(y);
      y *= this.tileSize;
      while (i2 < this.Layers.length) {
        if (this.Layers[i2].length > 0) {
          if (this.Layers[i2][0].transform.Position.Y == y) {
            return this.GetLayer(i2);
          }
        }
        i2++;
      }
      return null;
    }
  };

  // Source/Logic/Scene.js
  var Scene = class {
    Entities = [];
    TC = new TileController(100, 1920);
    Draw() {
      this.Entities.forEach((entity) => {
        entity.Draw(Canvas.Instance.GetLayerContext(entity.Layer), Player.Camera);
      });
      this.TC.LoadedLayers.forEach((layer) => {
        layer.forEach((entity) => {
          entity.Draw(Canvas.Instance.GetLayerContext(entity.Layer), Player.Camera);
        });
      });
    }
  };

  // Source/Logic/SceneManager.js
  var SceneManager = class _SceneManager {
    town = new Scene();
    mine = new Scene();
    currentScene = this.town;
    static Instance;
    constructor() {
      _SceneManager.Instance = this;
    }
    ChangeScene() {
      if (Object.is(this.currentScene, this.town)) {
        this.currentScene = this.mine;
      } else {
        this.currentScene = this.town;
      }
    }
  };

  // Source/Logic/RenderImage.js
  function CreateImageByPath(path) {
    let img = new Image();
    img.src = path;
    return img;
  }

  // Source/Graphics/Images.js
  var Images = class {
    static lvl1_grass = CreateImageByPath("Res/img/Lvl1/lvl1_grass.png");
    static lvl1_res1 = CreateImageByPath("Res/img/Lvl1/lvl1_res1.png");
    static lvl1_res2 = CreateImageByPath("Res/img/Lvl1/lvl1_res2.png");
    static lvl1_res3 = CreateImageByPath("Res/img/Lvl1/lvl1_res3.png");
    static lvl1_res4 = CreateImageByPath("Res/img/Lvl1/lvl1_res4.png");
    static lvl1_res5 = CreateImageByPath("Res/img/Lvl1/lvl1_res5.png");
    static lvl1_res6 = CreateImageByPath("Res/img/Lvl1/lvl1_res6.png");
    static lvl1 = CreateImageByPath("Res/img/Lvl1/lvl1.png");
    static lvl1bg = CreateImageByPath("Res/img/Lvl1/lvl1bg.png");
    static lvl2_res1 = CreateImageByPath("Res/img/Lvl2/lvl2_res1.png");
    static lvl2_res2 = CreateImageByPath("Res/img/Lvl2/lvl2_res2.png");
    static lvl2_res3 = CreateImageByPath("Res/img/Lvl2/lvl2_res3.png");
    static lvl2_res4 = CreateImageByPath("Res/img/Lvl2/lvl2_res4.png");
    static lvl2_res5 = CreateImageByPath("Res/img/Lvl2/lvl2_res5.png");
    static lvl2_res6 = CreateImageByPath("Res/img/Lvl2/lvl2_res6.png");
    static lvl2 = CreateImageByPath("Res/img/Lvl2/lvl2.png");
    static lvl2bg = CreateImageByPath("Res/img/Lvl2/lvl2bg.png");
    static lvl3_res1 = CreateImageByPath("Res/img/Lvl3/lvl3_res1.png");
    static lvl3_res2 = CreateImageByPath("Res/img/Lvl3/lvl3_res2.png");
    static lvl3_res3 = CreateImageByPath("Res/img/Lvl3/lvl3_res3.png");
    static lvl3_res4 = CreateImageByPath("Res/img/Lvl3/lvl3_res4.png");
    static lvl3_res5 = CreateImageByPath("Res/img/Lvl3/lvl3_res5.png");
    static lvl3_res6 = CreateImageByPath("Res/img/Lvl3/lvl3_res6.png");
    static lvl3 = CreateImageByPath("Res/img/Lvl3/lvl3.png");
    static lvl3bg = CreateImageByPath("Res/img/Lvl3/lvl3bg.png");
    static lvl4_res1 = CreateImageByPath("Res/img/Lvl4/lvl4_res1.png");
    static lvl4_res2 = CreateImageByPath("Res/img/Lvl4/lvl4_res2.png");
    static lvl4_res3 = CreateImageByPath("Res/img/Lvl4/lvl4_res3.png");
    static lvl4_res4 = CreateImageByPath("Res/img/Lvl4/lvl4_res4.png");
    static lvl4_res5 = CreateImageByPath("Res/img/Lvl4/lvl4_res5.png");
    static lvl4_res6 = CreateImageByPath("Res/img/Lvl4/lvl4_res6.png");
    static lvl4 = CreateImageByPath("Res/img/Lvl4/lvl4.png");
    static lvl4bg = CreateImageByPath("Res/img/Lvl4/lvl4bg.png");
    static lvl5_res1 = CreateImageByPath("Res/img/Lvl5/lvl5_res1.png");
    static lvl5_res2 = CreateImageByPath("Res/img/Lvl5/lvl5_res2.png");
    static lvl5_res3 = CreateImageByPath("Res/img/Lvl5/lvl5_res3.png");
    static lvl5_res4 = CreateImageByPath("Res/img/Lvl5/lvl5_res4.png");
    static lvl5_res5 = CreateImageByPath("Res/img/Lvl5/lvl5_res5.png");
    static lvl5_res6 = CreateImageByPath("Res/img/Lvl5/lvl5_res6.png");
    static lvl5 = CreateImageByPath("Res/img/Lvl5/lvl5.png");
    static lvl5bg = CreateImageByPath("Res/img/Lvl5/lvl5bg.png");
    static chest = CreateImageByPath("Res/img/Structures/Chest.png");
    static cross = CreateImageByPath("Res/img/Structures/Cross.png");
    static ladder = CreateImageByPath("Res/img/Structures/Ladder.png");
    static cave = CreateImageByPath("Res/img/Building/Cave.png");
    static forge = CreateImageByPath("Res/img/Building/forge.png");
    static home1 = CreateImageByPath("Res/img/Building/House1.png");
    static home2 = CreateImageByPath("Res/img/Building/House2.png");
    static home3 = CreateImageByPath("Res/img/Building/House3.png");
    static market = CreateImageByPath("Res/img/Building/market.png");
    static tree = CreateImageByPath("Res/img/tree.png");
    static damage1 = CreateImageByPath("Res/img/BlockDamage/Block damage1.png");
    static damage2 = CreateImageByPath("Res/img/BlockDamage/Block damage2.png");
    static damage3 = CreateImageByPath("Res/img/BlockDamage/Block damage3.png");
    static damage4 = CreateImageByPath("Res/img/BlockDamage/Block damage4.png");
    static back = CreateImageByPath("Res/img/bg.png");
  };

  // Source/Physics/EntityTypes.js
  var EntityTypes = class {
    static Player = "Player";
    static SolidTile = "SolidTile";
    static BackGroundTile = "BackGroundTile";
    static Forge = "Forge";
    static Market = "Market";
    static Building = "Building";
    static Cave = "Cave";
    static DestroyableTile = "DestroyableTile";
    static Ladder = "Ladder";
  };

  // Source/Logic/inventory.js
  var resurse = {
    lvlPick: 1,
    money: 0,
    res1: 0,
    res2: 0,
    res3: 0,
    res4: 0,
    res5: 0,
    res6: 0
  };
  var inventory_default = resurse;

  // Source/Entities/Tile.js
  var Tile = class extends Entity {
    curHp;
    maxHp;
    constructor(position, size, Image2, Layer2, Type, Scene2, maxHp = 5) {
      super(new Transform(position, size), Image2, Layer2, Type, Scene2);
      this.curHp = maxHp;
      this.maxHp = maxHp;
    }
    Draw(Context, Camera) {
      if (this.transform.Position.X + this.transform.Size.X + Camera.X < 0 || this.transform.Position.X - this.transform.Size.X + Camera.X > 1920)
        return;
      Context.drawImage(
        this.Image,
        this.transform.Position.X + Camera.X,
        this.transform.Position.Y - Camera.Y,
        this.transform.Size.X,
        this.transform.Size.Y
      );
      if (this.curHp < this.maxHp) {
        let per = this.curHp / this.maxHp;
        if (per <= 0.2) {
          Context.drawImage(
            Images.damage4,
            this.transform.Position.X + Camera.X,
            this.transform.Position.Y - Camera.Y,
            this.transform.Size.X,
            this.transform.Size.Y
          );
        } else if (per <= 0.4) {
          Context.drawImage(
            Images.damage3,
            this.transform.Position.X + Camera.X,
            this.transform.Position.Y - Camera.Y,
            this.transform.Size.X,
            this.transform.Size.Y
          );
        } else if (per <= 0.6) {
          Context.drawImage(
            Images.damage2,
            this.transform.Position.X + Camera.X,
            this.transform.Position.Y - Camera.Y,
            this.transform.Size.X,
            this.transform.Size.Y
          );
        } else {
          Context.drawImage(
            Images.damage1,
            this.transform.Position.X + Camera.X,
            this.transform.Position.Y - Camera.Y,
            this.transform.Size.X,
            this.transform.Size.Y
          );
        }
      }
      if (SceneManager.Instance.currentScene == SceneManager.Instance.mine) {
        let fill = 0;
        let xDelta = Math.abs(this.transform.Position.X + this.transform.Size.X / 2 - (Player.Instance.transform.Position.X + Player.Instance.transform.Size.X / 2));
        let yDelta = Math.abs(this.transform.Position.Y + this.transform.Size.Y / 2 - (Player.Instance.transform.Position.Y + Player.Instance.transform.Size.Y / 2));
        if (xDelta < 100 && xDelta > -100) {
          console.log(xDelta);
          console.log(this.transform.Position.ToString());
        }
        if (this.transform.Position.Y >= 900)
          fill = 0.2;
        if (this.transform.Position.Y >= 1e3)
          fill = 0.4;
        if (this.transform.Position.Y >= 1100)
          fill = 0.6;
        if (this.transform.Position.Y >= 1200)
          fill = 0.8;
        if (this.transform.Position.Y >= 1300)
          fill = 1;
        if (xDelta + yDelta >= 600) {
          fill = Math.min(1, fill);
        } else if (xDelta + yDelta >= 500) {
          fill = Math.min(0.8, fill);
        } else if (xDelta + yDelta >= 400) {
          fill = Math.min(0.6, fill);
        } else if (xDelta + yDelta >= 300) {
          fill = Math.min(0.4, fill);
        } else if (xDelta + yDelta >= 200) {
          fill = Math.min(0.2, fill);
        } else {
          fill = 0;
        }
        if (fill != 0) {
          Context.beginPath();
          Context.rect(
            this.transform.Position.X + Camera.X,
            this.transform.Position.Y - Camera.Y,
            this.transform.Size.X,
            this.transform.Size.Y
          );
          Context.fillStyle = `rgba(0, 0, 0, ${fill})`;
          Context.fill();
          Context.closePath();
        }
      }
    }
    GetDamage(damage) {
      this.curHp -= damage;
    }
    OnDestroy() {
      if (this.Image == Images.lvl1_res1 || this.Image == Images.lvl2_res1 || this.Image == Images.lvl3_res1 || this.Image == Images.lvl4_res1 || this.Image == Images.lvl5_res1) {
        inventory_default.res1 += 1;
      }
      if (this.Image == Images.lvl1_res2 || this.Image == Images.lvl2_res2 || this.Image == Images.lvl3_res2 || this.Image == Images.lvl4_res2 || this.Image == Images.lvl5_res2) {
        inventory_default.res2 += 1;
      }
      if (this.Image == Images.lvl1_res3 || this.Image == Images.lvl2_res3 || this.Image == Images.lvl3_res3 || this.Image == Images.lvl4_res3 || this.Image == Images.lvl5_res3) {
        inventory_default.res3 += 1;
      }
      if (this.Image == Images.lvl1_res4 || this.Image == Images.lvl2_res4 || this.Image == Images.lvl3_res4 || this.Image == Images.lvl4_res4 || this.Image == Images.lvl5_res4) {
        inventory_default.res4 += 1;
      }
      if (this.Image == Images.lvl1_res5 || this.Image == Images.lvl2_res5 || this.Image == Images.lvl3_res5 || this.Image == Images.lvl4_res5 || this.Image == Images.lvl5_res5) {
        inventory_default.res5 += 1;
      }
      if (this.Image == Images.lvl1_res6 || this.Image == Images.lvl2_res6 || this.Image == Images.lvl3_res6 || this.Image == Images.lvl4_res6 || this.Image == Images.lvl5_res6) {
        inventory_default.res6 += 1;
      }
      this.Type = EntityTypes.BackGroundTile;
      this.maxHp = 0;
      this.curHp = 0;
      let y = this.transform.Position.Y / 100;
      if (y < 50) {
        this.Image = Images.lvl1bg;
      }
      if (y >= 50 && y < 150) {
        this.Image = Images.lvl2bg;
      }
      if (y >= 150 && y < 250) {
        this.Image = Images.lvl3bg;
      }
      if (y >= 250 && y < 350) {
        this.Image = Images.lvl4bg;
      }
      if (y >= 350) {
        this.Image = Images.lvl5bg;
      }
    }
  };

  // Source/Entities/PlayerStates.js
  var PlayerStates = {
    Idle: "Idle",
    Walk: "Walk"
  };

  // Source/Graphics/Animation.js
  var Animation = class {
    FrameDuration;
    CurrentFrameTime;
    Frames = [];
    CurrentFrame;
    constructor(Frames, FrameDuration) {
      this.Frames = Frames;
      this.FrameDuration = FrameDuration;
      this.CurrentFrameTime = FrameDuration;
      this.CurrentFrame = Frames[0];
    }
    Update() {
      this.CurrentFrameTime -= Time.deltaTime;
      if (this.CurrentFrameTime <= 0) {
        this.NextFrame();
        this.CurrentFrameTime = this.FrameDuration;
      }
    }
    NextFrame() {
      let i2 = this.Frames.indexOf(this.CurrentFrame);
      if (i2 < this.Frames.length - 1) {
        this.CurrentFrame = this.Frames[i2 + 1];
      } else {
        this.CurrentFrame = this.Frames[0];
      }
    }
    Reset() {
      this.CurrentFrameTime = 0;
      this.CurrentFrame = this.Frames[0];
    }
  };

  // Source/Graphics/Animations.js
  var Animations = class {
    static PlayerWalkRight = new Animation([
      new CreateImageByPath("Res/img/Player/WalkRight/Player_run1.png"),
      new CreateImageByPath("Res/img/Player/WalkRight/Player_run2.png"),
      new CreateImageByPath("Res/img/Player/WalkRight/Player_run3.png"),
      new CreateImageByPath("Res/img/Player/WalkRight/Player_run4.png"),
      new CreateImageByPath("Res/img/Player/WalkRight/Player_run5.png"),
      new CreateImageByPath("Res/img/Player/WalkRight/Player_run6.png")
    ], 0.15);
    static PlayerWalkLeft = new Animation([
      new CreateImageByPath("Res/img/Player/WalkLeft/Player_run1.png"),
      new CreateImageByPath("Res/img/Player/WalkLeft/Player_run2.png"),
      new CreateImageByPath("Res/img/Player/WalkLeft/Player_run3.png"),
      new CreateImageByPath("Res/img/Player/WalkLeft/Player_run4.png"),
      new CreateImageByPath("Res/img/Player/WalkLeft/Player_run5.png"),
      new CreateImageByPath("Res/img/Player/WalkLeft/Player_run6.png")
    ], 0.15);
    static PlayerIdleRight = new Animation([
      new CreateImageByPath("Res/img/Player/IdleRight/Player_idle1.png"),
      new CreateImageByPath("Res/img/Player/IdleRight/Player_idle2.png")
    ], 0.3);
    static PlayerIdleLeft = new Animation([
      new CreateImageByPath("Res/img/Player/IdleLeft/Player_idle1.png"),
      new CreateImageByPath("Res/img/Player/IdleLeft/Player_idle2.png")
    ], 0.3);
    static PlayerAttackRight = new Animation([
      new CreateImageByPath("Res/img/Player/Attack_right/Player_attack1.png"),
      new CreateImageByPath("Res/img/Player/Attack_right/Player_attack2.png")
    ], 0.1);
    static PlayerAttackLeft = new Animation([
      new CreateImageByPath("Res/img/Player/Attack_left/Player_attack1.png"),
      new CreateImageByPath("Res/img/Player/Attack_left/Player_attack2.png")
    ], 0.1);
    static PlayerJumpRight = new Animation([
      new CreateImageByPath("Res/img/Player/Jump/Player_jump_right.png")
    ], 0.1);
    static PlayerJumpLeft = new Animation([
      new CreateImageByPath("Res/img/Player/Jump/Player_jump_left.png")
    ], 0.1);
  };

  // Source/Graphics/PlayerAnimationController.js
  var PlayerAnimationController = class {
    WalkRight = Animations.PlayerWalkRight;
    WalkLeft = Animations.PlayerWalkLeft;
    IdleRight = Animations.PlayerIdleRight;
    IdleLeft = Animations.PlayerIdleLeft;
    AttackRight = Animations.PlayerAttackRight;
    AttackLeft = Animations.PlayerAttackLeft;
    JumpRight = Animations.PlayerJumpRight;
    JumpLeft = Animations.PlayerJumpLeft;
    CurrentAnimation = Animations.PlayerIdleRight;
    Update() {
      this.CurrentAnimation.Update();
    }
    ChangeAnimation(animation) {
      if (animation == this.CurrentAnimation)
        return;
      this.CurrentAnimation.Reset();
      this.CurrentAnimation = animation;
    }
  };

  // Source/Entities/market.js
  var sell = document.querySelector(".sell");
  var buy = document.querySelector(".buy");
  var selector = document.querySelector(".selector");
  var sellBlock = document.querySelector(".sellBlock");
  var sellRes1 = document.querySelector(".sellRes1");
  var sellRes2 = document.querySelector(".sellRes2");
  var sellRes3 = document.querySelector(".sellRes3");
  var sellRes4 = document.querySelector(".sellRes4");
  var sellRes5 = document.querySelector(".sellRes5");
  var sellRes6 = document.querySelector(".sellRes6");
  var buyBlock = document.querySelector(".buyBlock");
  var buyRes1 = document.querySelector(".buyRes1");
  var buyRes2 = document.querySelector(".buyRes2");
  var buyRes3 = document.querySelector(".buyRes3");
  var buyRes4 = document.querySelector(".buyRes4");
  var buyRes5 = document.querySelector(".buyRes5");
  var buyRes6 = document.querySelector(".buyRes6");
  var coefficientsSell = {
    res1: 1,
    res2: 2,
    res3: 3,
    res4: 4,
    res5: 5,
    res6: 6
  };
  var coefficientsBuy = {
    res1: 2,
    res2: 4,
    res3: 6,
    res4: 8,
    res5: 10,
    res6: 12
  };
  function marketLogic() {
    sell.addEventListener("click", (event) => {
      sellBlock.style.display = "block";
      selector.style.display = "none";
    });
    buy.addEventListener("click", (event) => {
      buyBlock.style.display = "block";
      selector.style.display = "none";
    });
    const sellResButtons = [sellRes1, sellRes2, sellRes3, sellRes4, sellRes5, sellRes6];
    sellResButtons.forEach((button, index) => {
      button.addEventListener("click", (event) => {
        sellRes(`res${index + 1}`);
      });
    });
    const buyResButtons = [buyRes1, buyRes2, buyRes3, buyRes4, buyRes5, buyRes6];
    buyResButtons.forEach((button, index) => {
      button.addEventListener("click", (event) => {
        buyRes(`res${index + 1}`);
      });
    });
  }
  function sellRes(resKey) {
    let res = prompt("Enter the quantity you want to sell:");
    if (inventory_default[resKey] < res) {
      alert("You don't have enough resources!");
    } else {
      inventory_default[resKey] -= res;
      res = res * coefficientsSell[resKey];
      inventory_default.money += res * 10;
    }
  }
  function buyRes(resKey) {
    let res = prompt("Enter the quantity you want to buy:");
    if (inventory_default.money < res * coefficientsBuy[resKey] * 10) {
      alert("You don't have enough money!");
    } else {
      inventory_default[resKey] += res;
      res = res * coefficientsBuy[resKey] * 10;
      inventory_default.money -= res;
    }
  }
  var market_default = marketLogic;

  // Source/Entities/forge.js
  var resurse1 = document.querySelector(".resurse1");
  var resurse2 = document.querySelector(".resurse2");
  var resurse3 = document.querySelector(".resurse3");
  var createPick = document.querySelector(".createPick");
  function forgeLogic() {
    console.log(Player.Instance.damage);
    if (inventory_default.lvlPick == 1) {
      resurse1.innerHTML = "Coal 10";
      resurse2.innerHTML = "Iron 10";
    }
    createPick.addEventListener("click", (event) => {
      if (inventory_default.lvlPick == 1 && inventory_default.res1 >= 10 && inventory_default.res2 >= 10) {
        inventory_default.lvlPick += 1;
        inventory_default.res1 -= 10;
        inventory_default.res2 -= 10;
        resurse1.innerHTML = "Coal 10";
        resurse2.innerHTML = "Iron 30";
        resurse3.innerHTML = "Gold 20";
        Player.Instance.damage += 1;
      } else if (inventory_default.lvlPick == 2 && inventory_default.res1 >= 10 && inventory_default.res2 >= 30 && inventory_default.res3 >= 20) {
        inventory_default.lvlPick += 1;
        inventory_default.res1 -= 10;
        inventory_default.res2 -= 30;
        inventory_default.res3 -= 20;
        resurse1.innerHTML = "Coal 10";
        resurse2.innerHTML = "Gold 30";
        resurse3.innerHTML = "Tungsten 20";
        Player.Instance.damage += 1;
      } else if (inventory_default.lvlPick == 3 && inventory_default.res1 >= 10 && inventory_default.res3 >= 30 && inventory_default.res4 >= 20) {
        inventory_default.lvlPick += 1;
        inventory_default.res1 -= 10;
        inventory_default.res3 -= 30;
        inventory_default.res4 -= 20;
        resurse1.innerHTML = "Coal 10";
        resurse2.innerHTML = "Tungsten 30";
        resurse3.innerHTML = "Titanium 20";
        Player.Instance.damage += 1;
      } else if (inventory_default.lvlPick == 4 && inventory_default.res1 >= 10 && inventory_default.res4 >= 30 && inventory_default.res5 >= 20) {
        inventory_default.lvlPick += 1;
        inventory_default.res1 -= 10;
        inventory_default.res4 -= 30;
        inventory_default.res5 -= 20;
        resurse1.innerHTML = "Coal 10";
        resurse2.innerHTML = "Titanium 30";
        resurse3.innerHTML = "Jewel 20";
        Player.Instance.damage += 1;
      } else if (inventory_default.lvlPick == 5 && inventory_default.res1 >= 10 && inventory_default.res5 >= 30 && inventory_default.res6 >= 20) {
        inventory_default.lvlPick += 1;
        inventory_default.res1 -= 10;
        inventory_default.res5 -= 30;
        inventory_default.res6 -= 50;
        resurse1.innerHTML = "";
        resurse2.innerHTML = "";
        resurse3.innerHTML = "";
        Player.Instance.damage += 1;
      } else {
        alert("You don't have enough resources!");
      }
    });
  }
  var forge_default = forgeLogic;

  // Source/Entities/Player.js
  var lastPressTime = 0;
  var market = document.querySelector(".market");
  var sell2 = document.querySelector(".sell");
  var buy2 = document.querySelector(".buy");
  var sellBlock2 = document.querySelector(".sellBlock");
  var buyBlock2 = document.querySelector(".buyBlock");
  var forge = document.querySelector(".forge");
  var selector2 = document.querySelector(".selector");
  var Player = class _Player extends Entity {
    static Camera;
    static Instance;
    changeSceneFlag = false;
    bottomCollision = false;
    topCollision = false;
    leftCollision = false;
    rightCollision = false;
    isLadder = false;
    isAttack = false;
    ladderUpFlag = false;
    velocityY = 0;
    speed = 500;
    damage = 1;
    SM;
    Direction = 1;
    //1 - right, 2 - left
    PAC = new PlayerAnimationController();
    jumpForce = 700;
    attackDelay = 0.2;
    curAttackDelay = 0;
    State = PlayerStates.Idle;
    constructor(position, size, Image2, Layer2, Camera, SM2) {
      super(new Transform(position, size), Image2, Layer2);
      _Player.Camera = Camera;
      this.SM = SM2;
      _Player.Instance = this;
      market_default();
      forge_default();
    }
    Update(Entities) {
      this.InputUpdate();
      this.UpdateAttack();
      this.PAC.Update();
      if (!this.bottomCollision && !this.isLadder || this.velocityY > 0) {
        this.velocityY -= Physics.G * Time.DeltaTime;
      } else {
        if (this.velocityY < 0) {
          this.velocityY = 0;
        }
      }
      this.CollisionCheck(Entities);
      this.curAttackDelay -= Time.deltaTime;
      _Player.Camera = new Vector2(-this.transform.Position.X + 920, this.transform.Position.Y - 500);
    }
    InputUpdate() {
      let stride = Vector2.Zero;
      if (this.curAttackDelay <= 0 && !Input.GetKeyState(75)) {
        let walk = false;
        if (Input.GetKeyState(65) && !Input.GetKeyState(68) && !this.leftCollision) {
          stride = stride.Add(Vector2.Right.Scale(this.speed * Time.DeltaTime));
          walk = true;
          this.Direction = -1;
        }
        if (Input.GetKeyState(68) && !Input.GetKeyState(65) && !this.rightCollision) {
          stride = stride.Add(Vector2.Left.Scale(this.speed * Time.DeltaTime));
          walk = true;
          this.Direction = 1;
        }
        if (this.velocityY == 0 && !this.topCollision && (this.isLadder || this.bottomCollision)) {
          if (Input.GetKeyState(32)) {
            console.log("t");
            this.velocityY = this.jumpForce;
          }
        }
        if (this.isLadder) {
          if (Input.GetKeyState(83) && !this.bottomCollision) {
            stride = stride.Add(Vector2.Up.Scale(this.speed * Time.DeltaTime));
          }
        }
        if (Input.GetKeyState(87)) {
          if (this.isLadder && !this.ladderUpFlag && !this.topCollision)
            stride = stride.Add(Vector2.Down.Scale(this.speed * Time.DeltaTime));
          else
            this.ladderUpFlag = true;
        } else {
          this.ladderUpFlag = false;
        }
        if (walk) {
          this.State = PlayerStates.Walk;
          if (this.Direction == 1) {
            this.PAC.ChangeAnimation(this.PAC.WalkRight);
          } else {
            this.PAC.ChangeAnimation(this.PAC.WalkLeft);
          }
        } else {
          this.State = PlayerStates.Idle;
          if (this.Direction == 1) {
            this.PAC.ChangeAnimation(this.PAC.IdleRight);
          } else {
            this.PAC.ChangeAnimation(this.PAC.IdleLeft);
          }
        }
      }
      if (!this.bottomCollision && !this.isLadder) {
        if (this.Direction == 1)
          this.PAC.ChangeAnimation(this.PAC.JumpRight);
        else
          this.PAC.ChangeAnimation(this.PAC.JumpLeft);
      }
      if (this.velocityY < 0 || !this.topCollision)
        stride = stride.Add(Vector2.Down.Scale(this.velocityY * Time.deltaTime));
      stride = Vector2.Round(stride);
      _Player.Camera = _Player.Camera.Add(stride);
      this.transform.Position = this.transform.Position.Add(
        new Vector2(-stride.X, stride.Y)
      );
      if (Input.GetKeyState(88)) {
        this.CreateLadder();
      }
      if (Input.GetKeyState(69)) {
        this.SM.currentScene.TC.LoadedLayers.forEach((layer) => {
          const blockX = Math.floor(this.transform.Position.X / 100) * 100;
          const blockY = Math.floor(this.transform.Position.Y / 100) * 100;
          const blockIndex = layer.findIndex((entity) => entity.transform.Position.X === blockX && entity.transform.Position.Y === blockY);
          if (blockIndex !== -1) {
            const block = layer[blockIndex];
            if (block.Image === Images.chest) {
              let r = Random(1, 10);
              if (this.transform.Position.Y >= 10 * 100 && this.transform.Position.Y < 50 * 100) {
                inventory_default.res1 += r;
                inventory_default.res2 += r - 1;
                inventory_default.money += r;
              } else if (this.transform.Position.Y >= 50 * 100 && this.transform.Position.Y < 150 * 100) {
                inventory_default.res1 += r;
                inventory_default.res2 += r - 1;
                inventory_default.res3 += r - 2;
                inventory_default.money += r * 2;
              } else if (this.transform.Position.Y >= 150 * 100 && this.transform.Position.Y < 250 * 100) {
                inventory_default.res2 += r;
                inventory_default.res3 += r - 1;
                inventory_default.res4 += r - 2;
                inventory_default.money += r * 3;
              } else if (this.transform.Position.Y >= 250 * 100 && this.transform.Position.Y < 350 * 100) {
                inventory_default.res3 += r;
                inventory_default.res4 += r - 1;
                inventory_default.res5 += r - 2;
                inventory_default.money += r * 4;
              } else if (this.transform.Position.Y >= 350 * 100) {
                inventory_default.res4 += r;
                inventory_default.res5 += r - 1;
                inventory_default.res6 += r - 2;
                inventory_default.money += r * 5;
              }
              layer.splice(blockIndex, 1);
            }
          }
        });
      }
    }
    UpdateAttack() {
      if (Input.GetKeyState(75) && this.curAttackDelay <= 0 && (this.bottomCollision || this.isLadder)) {
        if (SceneManager.Instance.currentScene == SceneManager.Instance.mine) {
          let col = [];
          if (Input.GetKeyState(68)) {
            col = this.GetColliderDot(Vector2.Right.Scale(100));
            this.Direction = 1;
          } else if (Input.GetKeyState(65)) {
            col = this.GetColliderDot(Vector2.Left.Scale(100));
            this.Direction = -1;
          } else if (Input.GetKeyState(87)) {
            col = this.GetColliderDot(Vector2.Down.Scale(100));
          } else if (Input.GetKeyState(83)) {
            col = this.GetColliderDot(Vector2.Up.Scale(100));
          }
          let flag = false;
          if (col.length == 2)
            this.SM.currentScene.TC.LoadedLayers.forEach(
              (layer) => {
                layer.forEach((entity) => {
                  if (entity.Type === EntityTypes.SolidTile || entity.Type === EntityTypes.DestroyableTile) {
                    if (Collisions.AABBtoAABB(entity.GetCollider(), col)) {
                      flag = true;
                      if (this.Direction == 1)
                        this.PAC.ChangeAnimation(this.PAC.AttackRight);
                      else
                        this.PAC.ChangeAnimation(this.PAC.AttackLeft);
                      this.PAC.CurrentAnimation.Reset();
                      this.curAttackDelay = this.attackDelay;
                      entity.GetDamage(this.damage);
                      if (entity.curHp <= 0) {
                        entity.OnDestroy();
                      }
                    }
                  }
                });
              }
            );
          if (!flag) {
            this.State = PlayerStates.Idle;
            if (this.Direction == 1) {
              this.PAC.ChangeAnimation(this.PAC.IdleRight);
            } else {
              this.PAC.ChangeAnimation(this.PAC.IdleLeft);
            }
          }
        }
      }
    }
    CollisionCheck(Entities) {
      let bottomFlag = false;
      let topFlag = false;
      let leftFlag = false;
      let rightFlag = false;
      let ladderFlag = false;
      let offset = 10;
      let Left = [
        new Vector2(
          this.transform.Position.X,
          this.transform.Position.Y + offset
        ),
        new Vector2(
          this.transform.Position.X,
          this.transform.Position.Y + this.transform.Size.Y - offset
        )
      ];
      let Right = [
        new Vector2(
          this.transform.Position.X + this.transform.Size.X,
          this.transform.Position.Y + offset
        ),
        new Vector2(
          this.transform.Position.X + this.transform.Size.X,
          this.transform.Position.Y + this.transform.Size.Y - offset
        )
      ];
      let Top = [
        new Vector2(this.transform.Position.X + offset, this.transform.Position.Y),
        new Vector2(
          this.transform.Position.X + this.transform.Size.X - offset,
          this.transform.Position.Y
        )
      ];
      let Bottom = [
        new Vector2(
          this.transform.Position.X + offset * 1.5,
          this.transform.Position.Y + this.transform.Size.Y
        ),
        new Vector2(
          this.transform.Position.X + this.transform.Size.X - offset * 1.5,
          this.transform.Position.Y + this.transform.Size.Y
        )
      ];
      Entities.forEach((entity) => {
        if (!(entity === this)) {
          if (entity.Type === EntityTypes.SolidTile) {
            if (Collisions.AABBtoAABB(entity.GetCollider(), Left) || this.transform.Position.X <= -5e3) {
              this.leftCollision = true;
              leftFlag = true;
            }
            if (Collisions.AABBtoAABB(entity.GetCollider(), Right) || this.transform.Position.X >= 4900) {
              this.rightCollision = true;
              rightFlag = true;
            }
            if (Collisions.AABBtoAABB(entity.GetCollider(), Top)) {
              topFlag = true;
              this.topCollision = true;
              if (this.velocityY > 0) {
                this.velocityY = 0;
              }
            }
            if (Collisions.AABBtoAABB(entity.GetCollider(), Bottom) || this.transform.Position.Y >= 99e3) {
              bottomFlag = true;
              this.bottomCollision = true;
              this.velocityY = 0;
              if (this.transform.Position.Y <= 99e3)
                this.transform.Position.Y = entity.transform.Position.Y - this.transform.Size.Y;
              else
                this.transform.Position.Y = 99e3;
              let d = this.transform.Position.Y - (entity.transform.Position.Y - this.transform.Size.Y);
              if (d > 0) {
                d = Math.floor(d);
              } else if (d < 0) {
                d = Math.ceil(d);
              }
              this.transform.Position.Y += d;
              _Player.Camera.Y += d;
            }
          }
          if (entity.Type === EntityTypes.Ladder) {
            if (Collisions.AABBtoAABB(entity.GetCollider(), this.GetCollider())) {
              ladderFlag = true;
              this.isLadder = true;
            }
          }
        }
        this.CaveCheck(entity);
        this.MarketCheck(entity);
        this.ForgeCheck(entity);
      });
      if (!bottomFlag) {
        this.bottomCollision = false;
      }
      if (!topFlag) {
        this.topCollision = false;
      }
      if (!leftFlag) {
        this.leftCollision = false;
      }
      if (!rightFlag) {
        this.rightCollision = false;
      }
      if (!ladderFlag) {
        this.isLadder = false;
      }
    }
    CaveCheck(entity) {
      if (entity.Type === EntityTypes.Cave) {
        if (Input.GetKeyState(69)) {
          if (Collisions.AABBtoAABB(this.GetCollider(), entity.GetCollider())) {
            if (!this.changeSceneFlag) {
              SceneManager.Instance.ChangeScene();
            }
            this.changeSceneFlag = true;
          }
        } else {
          this.changeSceneFlag = false;
        }
      }
    }
    MarketCheck(entity) {
      if (entity.Type === EntityTypes.Market) {
        if (Collisions.AABBtoAABB(this.GetCollider(), entity.GetCollider())) {
          if (Input.GetKeyState(69) && Date.now() - lastPressTime >= 500) {
            if (market.style.display == "none" || market.style.display == "") {
              market.style.display = "block";
              sellBlock2.style.display = "none";
              buyBlock2.style.display = "none";
              forge.style.display = "none";
              selector2.style.display = "flex";
            } else {
              market.style.display = "none";
              sellBlock2.style.display = "block";
              buyBlock2.style.display = "block";
              forge.style.display = "none";
            }
            lastPressTime = Date.now();
          }
        } else {
          market.style.display = "none";
        }
      }
    }
    ForgeCheck(entity) {
      if (entity.Type === EntityTypes.Forge) {
        if (Collisions.AABBtoAABB(this.GetCollider(), entity.GetCollider())) {
          if (Input.GetKeyState(69) && Date.now() - lastPressTime >= 500) {
            if (forge.style.display == "none" || forge.style.display == "") {
              forge.style.display = "block";
              market.style.display = "none";
            } else {
              forge.style.display = "none";
              market.style.display = "none";
            }
            lastPressTime = Date.now();
          }
        } else {
          forge.style.display = "none";
        }
      }
    }
    CreateLadder() {
      let layer = SceneManager.Instance.mine.TC.GetLayerByPos(this.transform.Position.Y);
      let x = this.transform.Position.X + 40;
      let y = this.transform.Position.Y + 40;
      x /= SceneManager.Instance.mine.TC.tileSize;
      x = Math.floor(x);
      x *= SceneManager.Instance.mine.TC.tileSize;
      y /= SceneManager.Instance.mine.TC.tileSize;
      y = Math.floor(y);
      y *= SceneManager.Instance.mine.TC.tileSize;
      let flag = false;
      if (layer != null && SceneManager.Instance.currentScene == SceneManager.Instance.mine) {
        let col = [new Vector2(x, y).Add(50, 50), new Vector2(x, y).Add(new Vector2(50, 50))];
        layer.forEach((element) => {
          if (element.Type === EntityTypes.Ladder || element.Type === EntityTypes.DestroyableTile || element.Type === EntityTypes.SolidTile) {
            if (element.transform.Position.X == x && element.transform.Position.Y == y) {
              flag = true;
            }
          }
        });
        if (!flag)
          layer.push(
            new Tile(
              new Vector2(x, y),
              new Vector2(100, 100),
              Images.ladder,
              3,
              EntityTypes.Ladder,
              SceneManager.Instance.mine
            )
          );
      }
    }
    GetColliderDot(direction) {
      return [
        this.transform.Position.Add(this.transform.Size.Scale(0.5).Add(direction)),
        this.transform.Position.Add(this.transform.Size.Scale(0.5).Add(direction))
      ];
    }
    Draw(Context, Camera) {
      Context.drawImage(
        this.PAC.CurrentAnimation.CurrentFrame,
        this.transform.Position.X + Camera.X,
        this.transform.Position.Y - Camera.Y,
        this.transform.Size.X,
        this.transform.Size.Y
      );
    }
  };
  function Random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // Source/Entities/Cave.js
  var Cave = class extends Entity {
    constructor(position, size, Image2, Layer2, Type, Scene2) {
      super(new Transform(position, size), Image2, Layer2, Type, Scene2);
    }
    Draw(Context, Camera) {
      Context.drawImage(
        this.Image,
        this.transform.Position.X + Camera.X,
        this.transform.Position.Y - Camera.Y,
        this.transform.Size.X,
        this.transform.Size.Y
      );
    }
    GetCollider() {
      return [
        this.transform.Position.Add(new Vector2(100, 200)),
        this.transform.Position.Add(new Vector2(200, 300))
      ];
    }
  };

  // Source/Map/cave.js
  function cave() {
    for (let x = -62; x < 62; x++)
      if (x % 4 == 0 && x != 8) {
        tree(SceneManager.Instance.mine.Entities, x);
      }
    SceneManager.Instance.mine.Entities.push(
      new Cave(
        new Vector2(800, 400),
        new Vector2(300, 200),
        Images.cave,
        2,
        EntityTypes.Cave,
        SceneManager.Instance.mine
      )
    );
    for (let y = 6; y < 1e3; y++) {
      for (let x = -62; x < 62; x++) {
        if (y == 6) {
          if (x >= -50 && x <= 50) {
            lvl1_grass(SceneManager, x, y, 5);
          } else {
            lvl1_grass(SceneManager, x, y, 1e4);
          }
        } else if (y < 10) {
          if (x >= -50 && x <= 50) {
            lvl(Images.lvl1, SceneManager, x, y, 5);
          } else {
            lvl(Images.lvl1, SceneManager, x, y, 1e4);
          }
        } else {
          let r = Random2(1, 100);
          let rd = Random2(1, 2e3);
          if (rd == 1 && y > 15 && x > -40 && x < 40) {
            let yStart = y;
            let xStart = x;
            for (a = 0; a < 4; a++) {
              if (a == 0) {
                y = yStart;
              } else {
                y -= 1;
              }
              for (i = 0; i < 9; i++) {
                if (i == 0) {
                  x = xStart;
                } else {
                  x -= 1;
                }
                removeBlockAtCoordinates(x, y);
                if (a == 0 && i == 3) {
                  chest(SceneManager, x, y);
                } else {
                  cross(SceneManager, x, y);
                }
                if (y >= 10 && y < 50) {
                  lvlBg(Images.lvl1bg, SceneManager, x, y);
                } else if (y >= 50 && y < 150) {
                  lvlBg(Images.lvl2bg, SceneManager, x, y);
                } else if (y >= 150 && y < 250) {
                  lvlBg(Images.lvl3bg, SceneManager, x, y);
                } else if (y >= 250 && y < 350) {
                  lvlBg(Images.lvl4bg, SceneManager, x, y);
                } else if (y >= 350) {
                  lvlBg(Images.lvl5bg, SceneManager, x, y);
                }
              }
              x = xStart;
            }
            y = yStart;
          } else {
            if (y >= 10 && y < 50) {
              if (x >= -50 && x <= 50) {
                if (r < 2) {
                  lvlRes(Images.lvl1_res2, SceneManager, x, y, 6);
                } else if (r < 5) {
                  lvlRes(Images.lvl1_res1, SceneManager, x, y, 7);
                } else
                  lvl(Images.lvl1, SceneManager, x, y, 5);
              } else {
                lvl(Images.lvl1, SceneManager, x, y, 1e4);
              }
            } else if (y >= 50 && y < 150) {
              if (x >= -50 && x <= 50) {
                if (r < 2) {
                  lvlRes(Images.lvl2_res3, SceneManager, x, y, 18);
                } else if (r < 5) {
                  lvlRes(Images.lvl2_res1, SceneManager, x, y, 16);
                } else if (r < 10) {
                  lvlRes(Images.lvl2_res2, SceneManager, x, y, 17);
                } else
                  lvl(Images.lvl2, SceneManager, x, y, 15);
              } else {
                lvl(Images.lvl2, SceneManager, x, y, 1e4);
              }
            } else if (y >= 150 && y < 250) {
              if (x >= -50 && x <= 50) {
                if (r < 2) {
                  lvlRes(Images.lvl3_res4, SceneManager, x, y, 28);
                } else if (r < 5) {
                  lvlRes(Images.lvl3_res3, SceneManager, x, y, 27);
                } else if (r < 10) {
                  lvlRes(Images.lvl3_res2, SceneManager, x, y, 26);
                } else
                  lvl(Images.lvl3, SceneManager, x, y, 25);
              } else {
                lvl(Images.lvl3, SceneManager, x, y, 1e4);
              }
            } else if (y >= 250 && y < 350) {
              if (x >= -50 && x <= 50) {
                if (r < 2) {
                  lvlRes(Images.lvl4_res5, SceneManager, x, y, 38);
                } else if (r < 5) {
                  lvlRes(Images.lvl4_res4, SceneManager, x, y, 37);
                } else if (r < 10) {
                  lvlRes(Images.lvl4_res3, SceneManager, x, y, 36);
                } else
                  lvl(Images.lvl4, SceneManager, x, y, 35);
              } else {
                lvl(Images.lvl4, SceneManager, x, y, 1e4);
              }
            } else if (y >= 350) {
              if (x >= -50 && x <= 50) {
                if (r < 2) {
                  lvlRes(Images.lvl5_res6, SceneManager, x, y, 48);
                } else if (r < 5) {
                  lvlRes(Images.lvl5_res5, SceneManager, x, y, 47);
                } else if (r < 10) {
                  lvlRes(Images.lvl5_res4, SceneManager, x, y, 46);
                } else
                  lvl(Images.lvl5, SceneManager, x, y, 45);
              } else {
                lvl(Images.lvl5, SceneManager, x, y, 1e4);
              }
            }
          }
        }
      }
    }
  }
  function lvl(lvlX, SceneManager2, x, y, Hp) {
    SceneManager2.Instance.mine.TC.GetLayer(y).push(
      new Tile(
        new Vector2(0 + 100 * x, 100 * y),
        new Vector2(100, 100),
        lvlX,
        2,
        EntityTypes.SolidTile,
        SceneManager2.Instance.mine,
        Hp
      )
    );
  }
  function lvlBg(lvlX, SceneManager2, x, y) {
    SceneManager2.Instance.mine.TC.GetLayer(y).push(
      new Tile(
        new Vector2(0 + 100 * x, 100 * y),
        new Vector2(100, 100),
        lvlX,
        1,
        EntityTypes.BackGroundTile,
        SceneManager2.Instance.mine
      )
    );
  }
  function lvlRes(lvlX, SceneManager2, x, y, Hp) {
    SceneManager2.Instance.mine.TC.GetLayer(y).push(
      new Tile(
        new Vector2(0 + 100 * x, 100 * y),
        new Vector2(100, 100),
        lvlX,
        2,
        EntityTypes.SolidTile,
        SceneManager2.Instance.mine,
        Hp
      )
    );
  }
  function lvl1_grass(SceneManager2, x, y, Hp) {
    SceneManager2.Instance.mine.TC.GetLayer(y).push(
      new Tile(
        new Vector2(0 + 100 * x, 100 * y),
        new Vector2(100, 100),
        Images.lvl1_grass,
        2,
        EntityTypes.SolidTile,
        SceneManager2.Instance.mine,
        Hp
      )
    );
  }
  function chest(SceneManager2, x, y) {
    SceneManager2.Instance.mine.TC.GetLayer(y).push(
      new Tile(
        new Vector2(0 + 100 * x, 100 * y),
        new Vector2(100, 100),
        Images.chest,
        2,
        EntityTypes.BackGroundTile,
        SceneManager2.Instance.mine
      )
    );
  }
  function cross(SceneManager2, x, y) {
    SceneManager2.Instance.mine.TC.GetLayer(y).push(
      new Tile(
        new Vector2(0 + 100 * x, 100 * y),
        new Vector2(100, 100),
        Images.cross,
        2,
        EntityTypes.BackGroundTile,
        SceneManager2.Instance.mine
      )
    );
  }
  function tree(Entities, x) {
    Entities.push(
      new Tile(
        new Vector2(100 * x + 50, 300),
        new Vector2(200, 300),
        Images.tree,
        2,
        EntityTypes.Building,
        SceneManager.Instance.town
      )
    );
  }
  function Random2(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  function removeBlockAtCoordinates(x, y) {
    const layer = SceneManager.Instance.mine.TC.GetLayer(y);
    for (let i2 = 0; i2 < layer.length; i2++) {
      const block = layer[i2];
      if (block.transform.Position.X === x * 100 && block.transform.Position.Y === y * 100) {
        layer.splice(i2, 1);
        break;
      }
    }
  }
  var cave_default = cave;

  // Source/Map/village.js
  function village() {
    for (let x = -62; x < 62; x++) {
      if (x % 4 == 0 && (x < 4 || x > 16)) {
        tree2(SceneManager.Instance.town.Entities, x, 3);
      } else if (x == 7 || x == 10) {
        tree2(SceneManager.Instance.town.Entities, x, 3);
      } else if (x == 15) {
        tree2(SceneManager.Instance.town.Entities, x - 0.25, 3);
      }
    }
    SceneManager.Instance.town.Entities.push(
      new Cave(
        new Vector2(800, 400),
        new Vector2(300, 200),
        Images.cave,
        2,
        EntityTypes.Cave,
        SceneManager.Instance.town
      )
    );
    SceneManager.Instance.town.Entities.push(
      new Tile(
        new Vector2(350, 200),
        new Vector2(400, 400),
        Images.market,
        2,
        EntityTypes.Market,
        SceneManager.Instance.town
      )
    );
    SceneManager.Instance.town.Entities.push(
      new Tile(
        new Vector2(1150, 200),
        new Vector2(400, 400),
        Images.forge,
        2,
        EntityTypes.Forge,
        SceneManager.Instance.town
      )
    );
    for (let y = 3; y < 1e3; y++) {
      for (let x = -62; x < 62; x++) {
        if (y == 3 && x % 4 == 0 && x < 1 && x > -10) {
          let r = Random3(1, 3);
          switch (r) {
            case 1:
              home1(SceneManager.Instance.town.Entities, x - 0.65, y);
              break;
            case 2:
              home2(SceneManager.Instance.town.Entities, x - 0.65, y);
              break;
            case 3:
              home3(SceneManager.Instance.town.Entities, x - 0.65, y);
              break;
          }
        } else if (y == 3 && x % 4 == 0 && x > 12 && x < 25) {
          let r = Random3(1, 3);
          switch (r) {
            case 1:
              home1(SceneManager.Instance.town.Entities, x - 1, y);
              break;
            case 2:
              home2(SceneManager.Instance.town.Entities, x - 1, y);
              break;
            case 3:
              home3(SceneManager.Instance.town.Entities, x - 1, y);
              break;
          }
        } else if (y == 6) {
          SceneManager.Instance.town.TC.GetLayer(y).push(
            new Tile(
              new Vector2(100 * x, 100 * y),
              new Vector2(100, 100),
              Images.lvl1_grass,
              2,
              EntityTypes.SolidTile,
              SceneManager.Instance.town
            )
          );
        } else if (y > 6 && y < 15) {
          SceneManager.Instance.town.TC.GetLayer(y).push(
            new Tile(
              new Vector2(100 * x, 100 * y),
              new Vector2(100, 100),
              Images.lvl1,
              2,
              EntityTypes.SolidTile,
              SceneManager.Instance.town
            )
          );
        }
      }
    }
  }
  function home1(Entities, x, y) {
    Entities.push(
      new Tile(
        new Vector2(110 * x, 100 * (y - 1)),
        new Vector2(400, 400),
        Images.home1,
        2,
        EntityTypes.Building,
        SceneManager.Instance.town
      )
    );
  }
  function home2(Entities, x, y) {
    Entities.push(
      new Tile(
        new Vector2(110 * x, 100 * (y - 1)),
        new Vector2(400, 400),
        Images.home2,
        2,
        EntityTypes.Building,
        SceneManager.Instance.town
      )
    );
  }
  function home3(Entities, x, y) {
    Entities.push(
      new Tile(
        new Vector2(110 * x, 100 * (y - 1)),
        new Vector2(400, 400),
        Images.home3,
        2,
        EntityTypes.Building,
        SceneManager.Instance.town
      )
    );
  }
  function tree2(Entities, x, y) {
    Entities.push(
      new Tile(
        new Vector2(100 * x, 100 * y),
        new Vector2(200, 300),
        Images.tree,
        2,
        EntityTypes.Building,
        SceneManager.Instance.town
      )
    );
  }
  function Random3(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  var village_default = village;

  // Source/main.js
  var startGame = document.querySelector("#startGame");
  var startScreen = document.querySelector(".startScreen");
  var money = document.querySelector(".money");
  var res1 = document.querySelector(".res1");
  var res2 = document.querySelector(".res2");
  var res3 = document.querySelector(".res3");
  var res4 = document.querySelector(".res4");
  var res5 = document.querySelector(".res5");
  var res6 = document.querySelector(".res6");
  var game = new Game(
    Start,
    Update,
    () => {
    },
    () => {
    },
    () => {
    }
  );
  var SM = new SceneManager();
  var playerImg = CreateImageByPath("Res/img/player1.png");
  var player = new Player(
    new Vector2(920, 500),
    new Vector2(80, 80),
    playerImg,
    3,
    Vector2.Zero,
    SM
  );
  village_default(SM.town.TC);
  cave_default();
  window.onbeforeunload = function() {
    return "Are you sure?";
  };
  startGame.addEventListener("click", (event) => {
    startScreen.style.display = "none";
    let element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  });
  window.onload = () => game.Start();
  function Start() {
    Canvas.Instance.updateSize();
    Canvas.Instance.GetLayerContext(0).drawImage(Images.back, 0, 0);
  }
  function Update() {
    let entities = [];
    SceneManager.Instance.currentScene.Entities.forEach((element) => {
      entities.push(element);
    });
    SM.currentScene.TC.LoadedLayers.forEach((layer) => {
      layer.forEach((entity) => {
        entities.push(entity);
      });
    });
    SM.currentScene.TC.UpdateLoadted(Player.Camera.Y);
    player.Update(entities);
    Canvas.Instance.GetLayerContext(1).clearRect(0, 0, 1920, 1080);
    Canvas.Instance.GetLayerContext(2).clearRect(0, 0, 1920, 1080);
    Canvas.Instance.GetLayerContext(3).clearRect(0, 0, 1920, 1080);
    SM.currentScene.Draw();
    player.Draw(Canvas.Instance.GetLayerContext(player.Layer), Player.Camera);
    money.innerHTML = inventory_default.money;
    res1.innerHTML = inventory_default.res1;
    res2.innerHTML = inventory_default.res2;
    res3.innerHTML = inventory_default.res3;
    res4.innerHTML = inventory_default.res4;
    res5.innerHTML = inventory_default.res5;
    res6.innerHTML = inventory_default.res6;
  }
})();
