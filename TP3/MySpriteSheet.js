/**
 * MySpriteSheet
 * @constructor
 * @param scene - Reference to MySceneGraph
 * @param texture - Texture png that contains the spritesheet
 * @param sizeM - Number of columns on the spritesheet
 * @param sizeN - Number of row on the spritesheet
 */
class MySpriteSheet{
    constructor(scene, texture, sizeM, sizeN){
        this.scene = scene;
        this.sizeM = sizeM;
        this.sizeN = sizeN;

        this.texture = new CGFtexture(this.scene, texture);
        this.initAppearance();

        this.spriteShader = new CGFshader(this.scene.gl ,"shaders/spriteSheet.vert" ,"shaders/spriteSheet.frag");
        this.spriteShader.setUniformsValues({x : -1, y : -1,sizezeM : this.sizeM, sizeN : this.sizeN});
        //this.spriteShader.setUniformsValues({uSampler2: 1});
    }
    initAppearance(){
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
        this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
        this.appearance.setSpecular(0.0, 0.0, 0.0, 1);
        this.appearance.setShininess(120);
        this.appearance.setTexture(this.texture);
    }

    activateCellMN(m, n){
        var auxX = m/this.sizeM;
        var auxY = n/this.sizeN;

        this.spriteShader.setUniformsValues({ax : auxX, ay : auxY, sizeM : this.sizeM, sizeN : this.sizeN});
    }

    activateCellP(p){
        var m = p % this.sizeM;
        var n = Math.floor(p / this.sizeM);
        var auxX = m/this.sizeM;
        var auxY = n/this.sizeN;
        this.spriteShader.setUniformsValues({ax : auxX, ay : auxY, sizeM : this.sizeM, sizeN : this.sizeN});



    }
    

}
