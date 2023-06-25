export class Input {
    static activeKeys = []
    static Init() {
      document.onkeydown = Input.#onKeyDown
      document.onkeyup = Input.#onKeyUP
      window.addEventListener("blur", () => {
        Input.#onChangeFocus()
      })
    }
    static #onKeyDown(e) {
      Input.#SetKeyState(e, true)
    }
    static #onKeyUP(e) {
      Input.#SetKeyState(e, false)
    }
    static #onChangeFocus() {
      Input.activeKeys = []
    }
    static #SetKeyState(e, state) {
      if (e.keyCode == 9) {
        return
      }
      if (state == true) {
        if (!Input.activeKeys.includes(e.keyCode)) {
          Input.activeKeys.push(e.keyCode)
        }
      } else {
        if (Input.activeKeys.includes(e.keyCode)) {
          Input.activeKeys.splice(Input.activeKeys.indexOf(e.keyCode), 1)
        }
      }
    }
    static GetKeyState(keyCode) {
      return this.activeKeys.includes(keyCode)
    }
  }
  