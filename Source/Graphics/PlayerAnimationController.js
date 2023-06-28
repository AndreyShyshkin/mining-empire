import { Animations } from "./Animations";

export class PlayerAnimationController{
    WalkRight = Animations.PlayerWalkRight;
    WalkLeft = Animations.PlayerWalkLeft;
    IdleRight = Animations.PlayerIdleRight;
    IdleLeft = Animations.PlayerIdleLeft;
    AttackRight = Animations.PlayerAttackRight;
    AttackLeft = Animations.PlayerAttackLeft;
    JumpRight = Animations.PlayerJumpRight;
    JumpLeft = Animations.PlayerJumpLeft;
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