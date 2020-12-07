/**
 * MyBoard
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyBoard extends CGFobject{
    constructor(scene){
        super(scene);

        this.initBuffers();
    }

    initBuffers(){
        //Geometry for a tile of the board that will be replicated to display all tiles of the board
        this.tile = new MyCylinder(this.scene, 1, 1, 0.6, 6, 4);
    }

    display(){
        //Displays all the tiles in the board
        //(1, 1)
        this.scene.pushMatrix();
        this.scene.translate(0, 6, 0);
        this.tile.display();
        this.scene.popMatrix();
        
        //(2, 1)
        this.scene.pushMatrix();
        this.scene.translate(-0.85, 4.5, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(2, 2)
        this.scene.pushMatrix();
        this.scene.translate(0.85, 4.5, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(3, 1)
        this.scene.pushMatrix();
        this.scene.translate(-1.7, 3, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(3, 2)
        this.scene.pushMatrix();
        this.scene.translate(0, 3, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(3, 3)
        this.scene.pushMatrix();
        this.scene.translate(1.7, 3, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(4, 1)
        this.scene.pushMatrix();
        this.scene.translate(-2.55, 1.5, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(4, 2)
        this.scene.pushMatrix();
        this.scene.translate(-0.85, 1.5, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(4, 3)
        this.scene.pushMatrix();
        this.scene.translate(0.85, 1.5, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(4, 4)
        this.scene.pushMatrix();
        this.scene.translate(2.55, 1.5, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(5, 1)
        this.scene.pushMatrix();
        this.scene.translate(-3.4, 0, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(5, 2)
        this.scene.pushMatrix();
        this.scene.translate(-1.7, 0, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(5, 3)
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(5, 4)
        this.scene.pushMatrix();
        this.scene.translate(1.7, 0, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(5, 5)
        this.scene.pushMatrix();
        this.scene.translate(3.4, 0, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(6, 1)
        this.scene.pushMatrix();
        this.scene.translate(-4.25, -1.5, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(6, 2)
        this.scene.pushMatrix();
        this.scene.translate(-2.55, -1.5, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(6, 3)
        this.scene.pushMatrix();
        this.scene.translate(-0.85, -1.5, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(6, 4)
        this.scene.pushMatrix();
        this.scene.translate(0.85, -1.5, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(6, 5)
        this.scene.pushMatrix();
        this.scene.translate(2.55, -1.5, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(6, 6)
        this.scene.pushMatrix();
        this.scene.translate(4.25, -1.5, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(7, 1)
        this.scene.pushMatrix();
        this.scene.translate(-5.1, -3, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(7, 2)
        this.scene.pushMatrix();
        this.scene.translate(-3.4, -3, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(7, 3)
        this.scene.pushMatrix();
        this.scene.translate(-1.7, -3, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(7, 4)
        this.scene.pushMatrix();
        this.scene.translate(0, -3, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(7, 5)
        this.scene.pushMatrix();
        this.scene.translate(1.7, -3, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(7, 6)
        this.scene.pushMatrix();
        this.scene.translate(3.4, -3, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(7, 7)
        this.scene.pushMatrix();
        this.scene.translate(5.1, -3, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(8, 1)
        this.scene.pushMatrix();
        this.scene.translate(-5.95, -4.5, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(8, 2)
        this.scene.pushMatrix();
        this.scene.translate(-4.25, -4.5, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(8, 3)
        this.scene.pushMatrix();
        this.scene.translate(-2.55, -4.5, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(8, 4)
        this.scene.pushMatrix();
        this.scene.translate(-0.85, -4.5, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(8, 5)
        this.scene.pushMatrix();
        this.scene.translate(0.85, -4.5, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(8, 6)
        this.scene.pushMatrix();
        this.scene.translate(2.55, -4.5, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(8, 7)
        this.scene.pushMatrix();
        this.scene.translate(4.25, -4.5, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(8, 8)
        this.scene.pushMatrix();
        this.scene.translate(5.95, -4.5, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(9, 1)
        this.scene.pushMatrix();
        this.scene.translate(-6.8, -6, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(9, 2)
        this.scene.pushMatrix();
        this.scene.translate(-5.1, -6, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(9, 3)
        this.scene.pushMatrix();
        this.scene.translate(-3.4, -6, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(9, 4)
        this.scene.pushMatrix();
        this.scene.translate(-1.7, -6, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(9, 5)
        this.scene.pushMatrix();
        this.scene.translate(0, -6, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(9, 6)
        this.scene.pushMatrix();
        this.scene.translate(1.7, -6, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(9, 7)
        this.scene.pushMatrix();
        this.scene.translate(3.4, -6, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(9, 8)
        this.scene.pushMatrix();
        this.scene.translate(5.1, -6, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(9, 9)
        this.scene.pushMatrix();
        this.scene.translate(6.8, -6, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(10, 1)
        this.scene.pushMatrix();
        this.scene.translate(-7.65, -7.5, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(10, 2)
        this.scene.pushMatrix();
        this.scene.translate(-5.95, -7.5, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(10, 3)
        this.scene.pushMatrix();
        this.scene.translate(-4.25, -7.5, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(10, 4)
        this.scene.pushMatrix();
        this.scene.translate(-2.55, -7.5, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(10, 5)
        this.scene.pushMatrix();
        this.scene.translate(-0.85, -7.5, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(10, 6)
        this.scene.pushMatrix();
        this.scene.translate(0.85, -7.5, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(10, 7)
        this.scene.pushMatrix();
        this.scene.translate(2.55, -7.5, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(10, 8)
        this.scene.pushMatrix();
        this.scene.translate(4.25, -7.5, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(10, 9)
        this.scene.pushMatrix();
        this.scene.translate(5.95, -7.5, 0);
        this.tile.display();
        this.scene.popMatrix();

        //(10, 10)
        this.scene.pushMatrix();
        this.scene.translate(7.65, -7.5, 0);
        this.tile.display();
        this.scene.popMatrix();
    }
}