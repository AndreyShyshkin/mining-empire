export class Time{
    static #prevTime;
    static #curTime;
    static #deltaTime = (Time.#curTime - Time.#prevTime)/1000;
    static Init(){
        Time.#prevTime = performance.now();
        Time.#curTime = performance.now();
    }
    static Update(){
        Time.#curTime = performance.now();
        Time.#deltaTime = (Time.#curTime - Time.#prevTime)/1000;
        Time.#prevTime = Time.#curTime;
    }
    static get DeltaTime(){
        return Time.#deltaTime;
    }
}