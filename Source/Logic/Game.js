import { Time } from "./Time"
import { Input } from "./Input"
export class Game {
  ShouldStop = false
  IsPause = false
  constructor(onStart, onUpdate, onStop, onStartPause, onClearPause) {
    this.onStart = onStart
    this.onUpdate = onUpdate
    this.onStop = onStop
    this.onStartPause = onStartPause
    this.onClearPause = onClearPause
  }
  Start() {
    this.onStart()
    Time.Init()
    Input.Init()
    window.requestAnimationFrame(this.Update.bind(this))
  }
  Update() {
    if (!this.ShouldStop) {
      Time.Update()
      console.log(Time.DeltaTime)
      this.onUpdate()
      window.requestAnimationFrame(this.Update.bind(this))
    }
  }
}
