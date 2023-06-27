import { CreateImageByPath } from "../Logic/RenderImage";
export class Images{
    static tile1 = CreateImageByPath("Res/img/Grass.png");
    static tile2 = CreateImageByPath("Res/img/Tile2.png");
    static layer = CreateImageByPath("Res/img/Cobblestone.png");
    static layer1 = CreateImageByPath("Res/img/Cobblestone_blue.png");
    static layer2 = CreateImageByPath("Res/img/Cobblestone_red.png");
    static layer3 = CreateImageByPath("Res/img/Cobblestone_purple.png");
    static iron = CreateImageByPath("Res/img/Iron.png");
    static coal = CreateImageByPath("Res/img/Coal.png");
    static cross = CreateImageByPath("Res/img/Cross.png");
    static chest = CreateImageByPath("Res/img/Chest.png");
    static cave = CreateImageByPath("Res/img/cave.png");
    static forge = CreateImageByPath("Res/img/forge.png");
    static home1 = CreateImageByPath("Res/img/home1.png");
    static home2 = CreateImageByPath("Res/img/home2.png");
    static home3 = CreateImageByPath("Res/img/home3.png");
    static market = CreateImageByPath("Res/img/market.png");
}