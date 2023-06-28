import { Time } from "../Logic/Time";
export class Animation{
    FrameDuration;
    CurrentFrameTime
    Frames  = [];
    CurrentFrame;
    constructor(Frames, FrameDuration){
        this.Frames = Frames;
        this.FrameDuration= FrameDuration;
        this.CurrentFrameTime = FrameDuration;
        this.CurrentFrame = Frames[0];
    }
    Update(){
        this.CurrentFrameTime -= Time.deltaTime;
        if(this.CurrentFrameTime <= 0){
            this.NextFrame();
            this.CurrentFrameTime = this.FrameDuration;
        }
    }
    NextFrame(){
        let i = this.Frames.indexOf(this.CurrentFrame);
        if(i < this.Frames.length - 1){
            this.CurrentFrame = this.Frames[i + 1]; 
        }
        else{
            this.CurrentFrame = this.Frames[0];
        }
    }
    Reset(){
        this.CurrentFrameTime = 0;
        this.CurrentFrame = this.Frames[0];
    }
}