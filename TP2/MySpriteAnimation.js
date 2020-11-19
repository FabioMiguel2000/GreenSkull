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
        //this.spritesheet = new MySpriteSheet(this.scene, "scenes/images/snake-ss.png", 3, 4);
        //console.log(this.graph.spritesheets[spritesheetID]);

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
        this.scene.setActiveShader(this.spritesheet.spriteShader);
        this.spritesheet.appearance.apply();
        this.square.display();
        this.scene.defaultAppearance.apply();
        this.scene.setActiveShader(this.scene.defaultShader);

    }
    update(elapsedTime){
        this.timePassed = this.timePassed + elapsedTime;
        if(this.timePassed < this.duration && this.currentCell < this.endCell){
            this.currentCell = (Math.floor(this.timePassed / this.durationPerCell) + parseInt(this.startCell));
        }
        this.spritesheet.activateCellP(this.currentCell);
    }
}
