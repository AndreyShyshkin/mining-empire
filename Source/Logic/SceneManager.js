import { Scene } from "./Scene";
export class SceneManager{
    town = new Scene();
    mine = new Scene();
    currentScene = this.town;
    static Instance;
    constructor(){
        SceneManager.Instance = this;
    }
    ChangeScene(){
        if(Object.is(this.currentScene, this.town)){
            this.currentScene = this.mine;
        }
        else{
            this.currentScene = this.town; 
        }
    }
}