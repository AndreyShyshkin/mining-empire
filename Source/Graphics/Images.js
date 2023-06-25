import { CreateImageByPath } from "../Logic/RenderImage";
export class Images{
    static img = CreateImageByPath("Res/img/1085818.jpg");
    static tile1 = CreateImageByPath("Res/img/Grass.png");
    static tile2 = CreateImageByPath("Res/img/Tile2.png");
    static iron = CreateImageByPath("Res/img/Iron.png");
    static coal = CreateImageByPath("Res/img/Coal.png");
    static cross = CreateImageByPath("Res/img/Cross.png");
    static chest = CreateImageByPath("Res/img/Chest.png");
}