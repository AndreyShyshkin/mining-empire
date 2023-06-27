(() => {
  // Source/Graphics/Canvas/Layer.js
  var Layer = class {
    constructor(parent) {
      this.Canvas = document.createElement("canvas");
      this.Canvas.setAttribute(
        "style",
        "position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
      );
      parent.append(this.Canvas);
      this.Canvas.width = 1920;
      this.Canvas.height = 1080;
      this.Context = this.Canvas.getContext("2d");
    }
  };

  // Source/Graphics/Canvas/Canvas.js
  var Canvas = class _Canvas {
    static Instance = new _Canvas(2);
    Layers = [];
    constructor(LayersCount) {
      this.LayersCount = LayersCount;
      this.canvas = document.querySelector("#game");
      this.WScale = 16;
      this.HScale = 9;
      this.updateSize();
      for (let i2 = 0; i2 < LayersCount; i2++) {
        this.Layers.push(new Layer(this.canvas));
      }
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
    ToSting() {
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
    constructor(transform, Image2, Layer2) {
      this.transform = transform;
      this.Image = Image2;
      this.Layer = Layer2;
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
      for (let y = cameraPosH; y < cameraPosH + this.cameraHeight; y += this.tileSize) {
        if (y > 0 && Math.floor(y / this.tileSize) < this.Layers.length) {
          this.LoadedLayers.push(this.Layers[Math.floor(y / this.tileSize)]);
        }
      }
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

  // Source/Entities/Player.js
  var SM = new SceneManager();
  var Player = class _Player extends Entity {
    static Camera;
    bottomCollision = false;
    topCollision = false;
    leftCollision = false;
    rightCollision = false;
    velocityY = 0;
    speed = 500;
    SM;
    jumpForce = 600;
    constructor(position, size, Image2, Layer2, Camera, SM3) {
      super(new Transform(position, size), Image2, Layer2);
      _Player.Camera = Camera;
      this.SM = SM3;
    }
    Update(Entities) {
      this.InputUpdate();
      if (!this.bottomCollision) {
        this.velocityY -= Physics.G * Time.DeltaTime;
      }
      this.CollisionCheck(Entities);
    }
    InputUpdate() {
      let stride = Vector2.Zero;
      if (Input.GetKeyState(65) && !this.leftCollision) {
        stride = stride.Add(Vector2.Right.Scale(this.speed * Time.DeltaTime));
      }
      if (Input.GetKeyState(68) && !this.rightCollision) {
        stride = stride.Add(Vector2.Left.Scale(this.speed * Time.DeltaTime));
      }
      if (this.bottomCollision) {
        if (Input.GetKeyState(87) || Input.GetKeyState(32)) {
          this.velocityY = this.jumpForce;
        }
      }
      if (!this.bottomCollision && false) {
        if (Input.GetKeyState(83) || Input.GetKeyState(17)) {
          stride = stride.Add(Vector2.Up.Scale(this.speed * Time.DeltaTime));
        }
      }
      if (Input.GetKeyState(66)) {
        if (SceneManager.Instance.currentScene == SceneManager.Instance.mine) {
          let col = [];
          if (Input.GetKeyState(39)) {
            col = this.GetColliderDot(Vector2.Right.Scale(100));
          } else if (Input.GetKeyState(37)) {
            col = this.GetColliderDot(Vector2.Left.Scale(100));
          } else if (Input.GetKeyState(38)) {
            col = this.GetColliderDot(Vector2.Down.Scale(100));
          } else if (Input.GetKeyState(40)) {
            col = this.GetColliderDot(Vector2.Up.Scale(100));
          }
          if (col.length == 2)
            this.SM.currentScene.TC.LoadedLayers.forEach((layer) => {
              layer.forEach((entity) => {
                if (Collisions.AABBtoAABB(entity.GetCollider(), col)) {
                  layer.splice(layer.indexOf(entity), 1);
                }
              });
            });
        }
      }
      stride = stride.Add(Vector2.Down.Scale(this.velocityY * Time.deltaTime));
      stride = Vector2.Round(stride);
      _Player.Camera = _Player.Camera.Add(stride);
      this.transform.Position = this.transform.Position.Add(
        new Vector2(-stride.X, stride.Y)
      );
    }
    CollisionCheck(Entities) {
      let bottomFlag = false;
      let topFlag = false;
      let leftFlag = false;
      let rightFlag = false;
      Entities.forEach((entity) => {
        if (!(entity === this)) {
          let offset = 10;
          let Left = [
            new Vector2(this.transform.Position.X, this.transform.Position.Y + offset),
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
              this.transform.Position.X + offset,
              this.transform.Position.Y + this.transform.Size.Y
            ),
            new Vector2(
              this.transform.Position.X + this.transform.Size.X - offset,
              this.transform.Position.Y + this.transform.Size.Y
            )
          ];
          if (Collisions.AABBtoAABB(entity.GetCollider(), Left)) {
            this.leftCollision = true;
            leftFlag = true;
          }
          if (Collisions.AABBtoAABB(entity.GetCollider(), Right)) {
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
          if (Collisions.AABBtoAABB(entity.GetCollider(), Bottom)) {
            bottomFlag = true;
            this.bottomCollision = true;
            this.velocityY = 0;
          }
        }
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
    }
    GetColliderDot(direction) {
      return [
        this.transform.Position.Add(this.transform.Size.Scale(0.5).Add(direction)),
        this.transform.Position.Add(this.transform.Size.Scale(0.5).Add(direction))
      ];
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
  };

  // Source/Logic/RenderImage.js
  function CreateImageByPath(path) {
    let img = new Image();
    img.src = path;
    return img;
  }

  // Source/Entities/Tile.js
  var Tile = class extends Entity {
    constructor(position, size, Image2, Layer2) {
      super(new Transform(position, size), Image2, Layer2);
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
  };

  // Source/Graphics/Images.js
  var Images = class {
    static tile1 = CreateImageByPath("Res/img/Grass.png");
    static tile2 = CreateImageByPath("Res/img/Tile2.png");
    static iron = CreateImageByPath("Res/img/Iron.png");
    static coal = CreateImageByPath("Res/img/Coal.png");
    static cross = CreateImageByPath("Res/img/Cross.png");
    static chest = CreateImageByPath("Res/img/Chest.png");
    static cave = CreateImageByPath("Res/img/cave.png");
    static forge = CreateImageByPath("Res/img/forge.png");
    static home1 = CreateImageByPath("Res/img/home1.png");
    static home2 = CreateImageByPath("Res/img/home2.png");
    static home3 = CreateImageByPath("Res/img/home3.png");
    static market = CreateImageByPath("Res/img/market.png");
  };

  // Source/Map/cave.js
  function cave() {
    for (let y = 6; y < 1e3; y++) {
      for (let x = -50; x < 50; x++) {
        if (y == 6) {
          SceneManager.Instance.mine.TC.GetLayer(y).push(
            new Tile(
              new Vector2(0 + 100 * x, 100 * y),
              new Vector2(100, 100),
              Images.tile1,
              1
            )
          );
        } else if (y < 10) {
          SceneManager.Instance.mine.TC.GetLayer(y).push(
            new Tile(
              new Vector2(0 + 100 * x, 100 * y),
              new Vector2(100, 100),
              Images.tile2,
              1
            )
          );
        } else {
          let r = Random(1, 100);
          let rd = Random(1, 1e3);
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
                if (a == 0 && i == 3) {
                  SceneManager.Instance.mine.TC.GetLayer(y).push(
                    new Tile(
                      new Vector2(0 + 100 * x, 100 * y),
                      new Vector2(100, 100),
                      Images.chest,
                      1
                    )
                  );
                } else {
                  SceneManager.Instance.mine.TC.GetLayer(y).push(
                    new Tile(
                      new Vector2(0 + 100 * x, 100 * y),
                      new Vector2(100, 100),
                      Images.cross,
                      1
                    )
                  );
                }
              }
              x = xStart;
            }
            y = yStart;
          } else {
            if (y >= 10 && y < 50) {
              if (r < 5) {
                SceneManager.Instance.mine.TC.GetLayer(y).push(
                  new Tile(
                    new Vector2(0 + 100 * x, 100 * y),
                    new Vector2(100, 100),
                    Images.coal,
                    1
                  )
                );
              } else if (r < 7) {
                SceneManager.Instance.mine.TC.GetLayer(y).push(
                  new Tile(
                    new Vector2(0 + 100 * x, 100 * y),
                    new Vector2(100, 100),
                    Images.iron,
                    1
                  )
                );
              } else
                SceneManager.Instance.mine.TC.GetLayer(y).push(
                  new Tile(
                    new Vector2(0 + 100 * x, 100 * y),
                    new Vector2(100, 100),
                    Images.tile2,
                    1
                  )
                );
            } else if (y >= 50) {
              if (r < 5) {
                SceneManager.Instance.mine.TC.GetLayer(y).push(
                  new Tile(
                    new Vector2(0 + 100 * x, 100 * y),
                    new Vector2(100, 100),
                    Images.iron,
                    1
                  )
                );
              } else if (r < 7) {
                SceneManager.Instance.mine.TC.GetLayer(y).push(
                  new Tile(
                    new Vector2(0 + 100 * x, 100 * y),
                    new Vector2(100, 100),
                    Images.coal,
                    1
                  )
                );
              } else
                SceneManager.Instance.mine.TC.GetLayer(y).push(
                  new Tile(
                    new Vector2(0 + 100 * x, 100 * y),
                    new Vector2(100, 100),
                    Images.tile2,
                    1
                  )
                );
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
  var cave_default = cave;

  // Source/Map/village.js
  function village() {
    for (let y = 5; y < 1e3; y++) {
      for (let x = -10; x < 30; x++) {
        if (y == 5 && x % 2 == 0 && x < 6) {
          let r = Random2(1, 3);
          switch (r) {
            case 1:
              home1(SceneManager.Instance.town.Entities, x, y);
              break;
            case 2:
              home2(SceneManager.Instance.town.Entities, x, y);
              break;
            case 3:
              home3(SceneManager.Instance.town.Entities, x, y);
              break;
          }
        } else if (y == 5 && x % 2 == 0 && x > 14) {
          let r = Random2(1, 3);
          switch (r) {
            case 1:
              home1(SceneManager.Instance.town.Entities, x, y);
              break;
            case 2:
              home2(SceneManager.Instance.town.Entities, x, y);
              break;
            case 3:
              home3(SceneManager.Instance.town.Entities, x, y);
              break;
          }
        } else if (y == 5 && x == 6) {
          SceneManager.Instance.town.Entities.push(
            new Tile(
              new Vector2(0 + 100 * x, 100 * (y - 1) + 50),
              new Vector2(200, 200),
              Images.cave,
              1
            )
          );
        } else if (y == 5 && x == 12) {
          SceneManager.Instance.town.Entities.push(
            new Tile(
              new Vector2(0 + 100 * x, 100 * (y - 1)),
              new Vector2(200, 200),
              Images.market,
              1
            )
          );
        } else if (y == 5 && x == 14) {
          SceneManager.Instance.town.Entities.push(
            new Tile(
              new Vector2(0 + 100 * x, 100 * (y - 1)),
              new Vector2(200, 200),
              Images.forge,
              1
            )
          );
        } else if (y == 6) {
          SceneManager.Instance.town.TC.GetLayer(y).push(
            new Tile(
              new Vector2(0 + 100 * x, 100 * y),
              new Vector2(100, 100),
              Images.tile1,
              1
            )
          );
        } else if (y > 6 && y < 15) {
          SceneManager.Instance.town.TC.GetLayer(y).push(
            new Tile(
              new Vector2(0 + 100 * x, 100 * y),
              new Vector2(100, 100),
              Images.tile2,
              1
            )
          );
        }
      }
    }
  }
  function home1(Entities, x, y) {
    Entities.push(
      new Tile(
        new Vector2(0 + 100 * x, 100 * (y - 1)),
        new Vector2(200, 200),
        Images.home1,
        1
      )
    );
  }
  function home2(Entities, x, y) {
    Entities.push(
      new Tile(
        new Vector2(0 + 100 * x, 100 * (y - 1)),
        new Vector2(200, 200),
        Images.home2,
        1
      )
    );
  }
  function home3(Entities, x, y) {
    Entities.push(
      new Tile(
        new Vector2(0 + 100 * x, 100 * (y - 1)),
        new Vector2(200, 200),
        Images.home3,
        1
      )
    );
  }
  function Random2(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  var village_default = village;

  // Source/main.js
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
  var SM2 = new SceneManager();
  var playerImg = CreateImageByPath("Res/img/player1.png");
  var player = new Player(
    new Vector2(900, 450),
    new Vector2(80, 80),
    playerImg,
    1,
    Vector2.Zero,
    SM2
  );
  village_default(SM2.town.TC);
  cave_default();
  window.onload = () => game.Start();
  function Start() {
    Canvas.Instance.updateSize();
  }
  var changeSceneFlag = false;
  function UpdateInput() {
    if (Input.GetKeyState(90)) {
      if (!changeSceneFlag) {
        SM2.ChangeScene();
      }
      changeSceneFlag = true;
    } else {
      changeSceneFlag = false;
    }
  }
  function Update() {
    console.log(SM2.currentSceneName);
    let tiles = [];
    SM2.currentScene.TC.LoadedLayers.forEach((layer) => {
      layer.forEach((entity) => {
        tiles.push(entity);
      });
    });
    UpdateInput();
    SM2.currentScene.TC.UpdateLoadted(Player.Camera.Y);
    player.Update(tiles);
    Canvas.Instance.GetLayerContext(1).clearRect(0, 0, 1920, 1080);
    SM2.currentScene.Draw();
    player.Draw(Canvas.Instance.GetLayerContext(player.Layer), Player.Camera);
  }
})();
