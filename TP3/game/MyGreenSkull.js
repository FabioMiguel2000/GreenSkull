/**
 * MyGreenSkull
 * @constructor
 * @param scene - Reference to MyScene object
 * @param player - String indicating which player (goblin / orc) that has the green skull

 */

class MyGreenSkull extends CGFobject {
    constructor(scene, player) {
        super(scene);
        this.player = player;

        this.initBuffers();
    }

    initBuffers() {
        this.greenSkull = new CGFOBJModel(this.scene, './models/skullModel.obj');
        this.greenSkullMat = new CGFappearance(this.scene);
        this.greenSkullMat.setEmission(0, 0.05, 0, 1);
        this.greenSkullMat.setAmbient(0.0, 1, 0, 1);
        this.greenSkullMat.setDiffuse(0.0, 1, 0, 1);
        this.greenSkullMat.setSpecular(0.0, 1, 0, 1);

    }
    switchGreenSkull() {
        if (this.player == 'goblin')
            this.player = 'orc';
        else
            this.player = 'goblin';
    }
    playerWithGS(player) {
        this.player = player;
    }

    display() {

        this.scene.pushMatrix();
        this.greenSkullMat.apply();
        if (this.player == 'goblin') {
            this.scene.translate(-6, 4, 0.3);


        } else {
            this.scene.translate(6, 4, 0.3);


        }
        this.scene.scale(0.1, 0.1, 0.1);
        this.greenSkull.display();
        this.scene.popMatrix();
    }
}