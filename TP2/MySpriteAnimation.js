/**
 * MySpriteAnimation
 * @constructor
 * @param scene - Reference to MySceneGraph
 * @param spritesheet - The sprite sheet that contains the animation
 * @param duration - Duration of the animation
 * @param startCell - The Position of the starting animation in the sprite sheet
 * @param endCell - The Position of the ending animation in the sprite sheet
 */
class MySpriteAnimation{
    constructor(scene, spritesheet, duration, startCell, endCell){
        this.scene = scene;
        this.spritesheet = spritesheet;
        this.duration = duration;
        this.startCell = startCell;
        this.endCell = endCell;
        this.square = new MyRectangle(this.scene, 0, 0, 1, 1);
        this.timePassed = 0;
        this.currentCell = startCell;
        this.durationPerCell = duration / (endCell - this.startCell);
        this.spritesheet.activateCellP(this.currentCell);

    }

    display(){
        this.scene.gl.enable(this.scene.gl.BLEND);
        this.scene.gl.blendFunc(this.scene.gl.SRC_ALPHA, this.scene.gl.ONE_MINUS_SRC_ALPHA);
        this.scene.gl.depthMask(false);

        this.scene.setActiveShader(this.spritesheet.spriteShader);
        this.spritesheet.appearance.apply();
        this.square.display();

        this.scene.defaultAppearance.apply();
        this.scene.setActiveShader(this.scene.defaultShader);      
        
        this.scene.gl.depthMask(true);
        this.scene.gl.disable(this.scene.gl.BLEND);

    }

    update(elapsedTime){
        this.timePassed = this.timePassed + elapsedTime;

        if(this.timePassed < this.duration && this.currentCell < this.endCell){
            this.currentCell = (Math.floor(this.timePassed / this.durationPerCell) + parseInt(this.startCell));
        }
        
        this.spritesheet.activateCellP(this.currentCell);
    }
}
