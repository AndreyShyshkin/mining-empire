import { Player } from "../Entities/Player";
import { TileController } from "../Entities/TileController";
import { Canvas } from "../Graphics/Canvas/Canvas";
export class Scene{
    Entities = [];
    TC = new TileController(100, 1920);
    Draw(){
        this.Entities.forEach(entity => {
            entity.Draw(Canvas.Instance.GetLayerContext(entity.Layer), Player.Camera);
        });
        this.TC.LoadedLayers.forEach(layer => {
            layer.forEach(entity => {
                entity.Draw(Canvas.Instance.GetLayerContext(entity.Layer), Player.Camera)
            })
        })
    }
}