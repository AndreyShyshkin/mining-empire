import { Scene } from "./Scene";
export class SceneMagager{
    town = new Scene();
    mine = new Scene();
    currentScene = this.town;
    ChangeScene(){
        if(this.currentScene == this.town){
            this.currentScene = this.mine;
        }
        else{
            this.currentScene = this.town; 
        }
    }
}