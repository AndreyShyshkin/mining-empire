import { Time } from "./Time";
import createGround from "../Map/surface";

export class Game{
    onStart;
    onUpdate;
    onStop;
    onStartPause;
    onClearPause;
    ShouldStop = false;
    constructor(onStart, onUpdate, onStop, onStartPause, onClearPause,){
        this.onStart = onStart;
        this.onUpdate = onUpdate;
        this.onStop = onStop;
        this.onStartPause = onStartPause;
        this.onClearPause = onClearPause;
    }
    Start(){
        createGround();
        this.onStart();
        Time.Init();
        window.requestAnimationFrame(this.Update.bind(this));
    }
    Update(){
        if(!this.ShouldStop){
            Time.Update();
            this.onUpdate();
            window.requestAnimationFrame(this.Update.bind(this));
        }
    }
}