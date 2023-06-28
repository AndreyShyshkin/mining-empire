import { CreateImageByPath } from "../Logic/RenderImage";
import { Animation } from "./Animation";
export class Animations{
    static PlayerWalkRight = new Animation([
        new CreateImageByPath("Res/img/Player/WalkRight/Player_run1.png"),
        new CreateImageByPath("Res/img/Player/WalkRight/Player_run2.png"),
        new CreateImageByPath("Res/img/Player/WalkRight/Player_run3.png"),
        new CreateImageByPath("Res/img/Player/WalkRight/Player_run4.png"),
        new CreateImageByPath("Res/img/Player/WalkRight/Player_run5.png"),
        new CreateImageByPath("Res/img/Player/WalkRight/Player_run6.png"),
    ], 0.15);    
    static PlayerWalkLeft = new Animation([
        new CreateImageByPath("Res/img/Player/WalkLeft/Player_run1.png"),
        new CreateImageByPath("Res/img/Player/WalkLeft/Player_run2.png"),
        new CreateImageByPath("Res/img/Player/WalkLeft/Player_run3.png"),
        new CreateImageByPath("Res/img/Player/WalkLeft/Player_run4.png"),
        new CreateImageByPath("Res/img/Player/WalkLeft/Player_run5.png"),
        new CreateImageByPath("Res/img/Player/WalkLeft/Player_run6.png"),
    ], 0.15);
    static PlayerIdleRight = new Animation([
        new CreateImageByPath("Res/img/Player/IdleRight/Player_idle1.png"),
        new CreateImageByPath("Res/img/Player/IdleRight/Player_idle2.png"),
    ], 0.30);  
    static PlayerIdleLeft = new Animation([
        new CreateImageByPath("Res/img/Player/IdleLeft/Player_idle1.png"),
        new CreateImageByPath("Res/img/Player/IdleLeft/Player_idle2.png"),
    ], 0.30);      
    static PlayerAttackRight = new Animation([
        new CreateImageByPath("Res/img/Player/Attack_right/Player_attack1.png"),
        new CreateImageByPath("Res/img/Player/Attack_right/Player_attack2.png"),
    ], 0.10);      
    static PlayerAttackLeft = new Animation([
        new CreateImageByPath("Res/img/Player/Attack_left/Player_attack1.png"),
        new CreateImageByPath("Res/img/Player/Attack_left/Player_attack2.png"),
    ], 0.10);      
    static PlayerJumpRight = new Animation([
        new CreateImageByPath("Res/img/Player/Jump/Player_jump_right.png"),
    ], 0.10);      
    static PlayerJumpLeft = new Animation([
        new CreateImageByPath("Res/img/Player/Jump/Player_jump_left.png"),
    ], 0.10);  
}