import { Animations } from "./Animations";

export class PlayerAnimationController{
    WalkRight = Animations.PlayerWalkRight;
    WalkLeft = Animations.PlayerWalkLeft;
    IdleRight = Animations.PlayerIdleRight;
    IdleLeft = Animations.PlayerIdleLeft;
    CurrentAnimation = Animations.PlayerIdleRight;
    Update(){
        this.CurrentAnimation.Update();
    }
    ChangeAnimation(animation){
        if(animation == this.CurrentAnimation)
        return;
        this.CurrentAnimation.Reset();
        this.CurrentAnimation = animation;
    }
}