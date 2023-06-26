import { Scene } from "./Scene";
export class SceneMagager{
    town = new Scene();
    mine = new Scene();
    currentScene = this.town;
}