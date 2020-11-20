/**
 * MySpriteText
 * @constructor
 * @param scene - Reference to MySceneGraph
 * @param text - String to renderize
 */
class MySpriteText{
    constructor(scene, text){
        this.scene = scene;
        this.text = text;
        this.rectangle = new MyRectangle(this.scene, 0, 0, 1, 1);
        this.spritesheet = new MySpriteSheet(scene, "scenes/images/Berlinfont.png", 16, 16);
    }

    getCharacterPosition(character){
        // The texture used has the same position as ascci 
        var ascci = character.charCodeAt(0);
        if(ascci >= 0 && ascci <= 255){
            return ascci;
        }
        else{
            console.log("MySpriteText: cannot get character position for character: " + character);
            return -1;
        }
    }

    display(){
        for(var i = 0; i < this.text.length; i++){
            this.spritesheet.activateCellP(this.getCharacterPosition(this.text.charAt(i)));
            this.scene.setActiveShader(this.spritesheet.spriteShader);
            this.spritesheet.appearance.apply();
            if(i != 0)
                this.scene.translate(1,0,0);
            this.rectangle.display();
            this.scene.defaultAppearance.apply();
            this.scene.setActiveShader(this.scene.defaultShader);
        }
    }

}