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
        this.texture = new CGFtexture(this.scene, texture);
        this.sizeM = sizeM;
        this.sizeN = sizeN;

        this.spriteShader = new CGFshader(this.scene.gl ,"shaders/spriteSheet.vert" ,"shaders/spriteSheet.frag");

        var dimensions = [sizeM, sizeN];
        this.spriteShader.setUniformsValues('dimensions', dimensions);
    }

    activateCellMN(m, n){
        var spritePos = [m, n];
        this.spriteShader.setUniformsValues('spritePos', spritePos);
    }

    activateCellP(p){
        var spritePos = [p / this.sizeN, p % this.sizeN];
        this.spriteShader.setUniformsValues('spritePos', spritePos);
    }
}
