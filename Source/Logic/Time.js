export class Time {
    static deltaTime = (Time.curTime - Time.prevTime) / 1000
    static Init() {
      Time.prevTime = performance.now()
      Time.curTime = performance.now()
      window.addEventListener("focus", () => Time.OnFocus())
    }
    static Update() {
      Time.curTime = performance.now()
      Time.deltaTime = (Time.curTime - Time.prevTime) / 1000
      Time.prevTime = Time.curTime
    }
    static OnFocus() {
      Time.prevTime = performance.now()
      Time.curTime = performance.now()
      Time.Update()
    }
    static get DeltaTime() {
      return Time.deltaTime
    }
  }
  