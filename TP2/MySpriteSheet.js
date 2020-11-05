/**
 * MySpriteSheet
 * @constructor
 * @param scene - Reference to MySceneGraph
 * @param texture - Texture png that contains the spritesheet
 * @param sizeM - Number of rows on the spritesheet
 * @param sizeN - Number of columns on the spritesheet
 */
class MySpriteSheet{
    constructor(scene, texture, sizeM, sizeN){
        this.scene = scene;
        this.texture = texture;
        this.sizeM = sizeM;
        this.sizeN = sizeN;

        //Get the texture resolution and divide height by sizeM to get row height and length by sizeN to get column length
    }

    activateCellMN(m, n){
        
    }
}
