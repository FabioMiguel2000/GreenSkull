/**
 * MyBoard
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyBoard extends CGFobject {
    constructor(scene) {
        super(scene);

        this.initBuffers();
    }

    initBuffers() {
        //Geometry for a tile of the board that will be replicated to display all tiles of the board

        this.square = new MyRectangle(this.scene, -1, -1, 1, 1);
        this.triangle = new MyTriangle(this.scene, 0, 0, 1.5, 1.5, 1.5, 0);
        this.greenSkull = new MyGreenSkull(this.scene, 'goblin');
        //his.greenSkull.switchGreenSkull();


        this.triangleMat = new CGFappearance(this.scene);
        this.triangleMat.setEmission(0, 0, 0, 1);
        this.triangleMat.setAmbient(1, 1, 1, 1);
        this.triangleMat.setDiffuse(1, 1, 1, 1);
        this.triangleMat.setSpecular(1, 1, 1, 1);

        this.squareMat = new CGFappearance(this.scene);
        this.squareMat.setEmission(0, 0, 0, 1);
        this.squareMat.setAmbient(0.4, 0.4, 0.4, 1);
        this.squareMat.setDiffuse(0.52, 0.37, 0.26, 1);
        this.squareMat.setSpecular(0.1, 0.1, 0.1, 1);

        this.tiles = [];
        this.pieces = [];


        for (var row = 1; row <= 10; row++) {
            for (var column = 1; column <= row; column++) {
                var tile = new MyTile(this.scene, row, column);
                if ((row == 7 && column == 7) || (row == 8 && column == 7) || (row == 8 && column == 8) || (row == 9 && column == 7) ||
                    (row == 9 && column == 8) || (row == 9 && column == 9) || (row == 10 && column == 7) || (row == 10 && column == 8) ||
                    (row == 10 && column == 9) || (row == 10 && column == 10)) {
                    var piece = new MyPiece(this.scene, 'orc', row, column);
                    tile.setPiece(piece);
                    this.pieces.push(piece);
                } else if ((row == 7 && column == 1) || (row == 8 && column == 1) || (row == 8 && column == 2) || (row == 9 && column == 1) ||
                    (row == 9 && column == 2) || (row == 9 && column == 3) || (row == 10 && column == 1) || (row == 10 && column == 2) ||
                    (row == 10 && column == 3) || (row == 10 && column == 4)) {
                    var piece = new MyPiece(this.scene, 'goblin', row, column);
                    tile.setPiece(piece);
                    this.pieces.push(piece);

                } else if ((row == 3 && column == 1) || (row == 3 && column == 3) || (row == 4 && column == 1) || (row == 4 && column == 4) ||
                    (row == 5 && column == 3) || (row == 6 && column == 3) || (row == 6 && column == 4) || (row == 7 && column == 4)) {
                    var piece = new MyPiece(this.scene, 'zombie', row, column);
                    tile.setPiece(piece);
                    this.pieces.push(piece);
                }

                this.tiles.push(tile)
            }
        }
    }

    display() {
        //Displays all the tiles in the board
        //(1, 1)
        // this.scene.pushMatrix();
        // this.scene.translate(0, 6, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(2, 1)
        // this.scene.pushMatrix();
        // this.scene.translate(-0.85, 4.5, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(2, 2)
        // this.scene.pushMatrix();
        // this.scene.translate(0.85, 4.5, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(3, 1)
        // this.scene.pushMatrix();
        // this.scene.translate(-1.7, 3, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(3, 2)
        // this.scene.pushMatrix();
        // this.scene.translate(0, 3, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(3, 3)
        // this.scene.pushMatrix();
        // this.scene.translate(1.7, 3, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(4, 1)
        // this.scene.pushMatrix();
        // this.scene.translate(-2.55, 1.5, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(4, 2)
        // this.scene.pushMatrix();
        // this.scene.translate(-0.85, 1.5, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(4, 3)
        // this.scene.pushMatrix();
        // this.scene.translate(0.85, 1.5, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(4, 4)
        // this.scene.pushMatrix();
        // this.scene.translate(2.55, 1.5, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(5, 1)
        // this.scene.pushMatrix();
        // this.scene.translate(-3.4, 0, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(5, 2)
        // this.scene.pushMatrix();
        // this.scene.translate(-1.7, 0, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(5, 3)
        // this.scene.pushMatrix();
        // this.scene.translate(0, 0, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(5, 4)
        // this.scene.pushMatrix();
        // this.scene.translate(1.7, 0, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(5, 5)
        // this.scene.pushMatrix();
        // this.scene.translate(3.4, 0, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(6, 1)
        // this.scene.pushMatrix();
        // this.scene.translate(-4.25, -1.5, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(6, 2)
        // this.scene.pushMatrix();
        // this.scene.translate(-2.55, -1.5, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(6, 3)
        // this.scene.pushMatrix();
        // this.scene.translate(-0.85, -1.5, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(6, 4)
        // this.scene.pushMatrix();
        // this.scene.translate(0.85, -1.5, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(6, 5)
        // this.scene.pushMatrix();
        // this.scene.translate(2.55, -1.5, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(6, 6)
        // this.scene.pushMatrix();
        // this.scene.translate(4.25, -1.5, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(7, 1)
        // this.scene.pushMatrix();
        // this.scene.translate(-5.1, -3, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(7, 2)
        // this.scene.pushMatrix();
        // this.scene.translate(-3.4, -3, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(7, 3)
        // this.scene.pushMatrix();
        // this.scene.translate(-1.7, -3, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(7, 4)
        // this.scene.pushMatrix();
        // this.scene.translate(0, -3, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(7, 5)
        // this.scene.pushMatrix();
        // this.scene.translate(1.7, -3, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(7, 6)
        // this.scene.pushMatrix();
        // this.scene.translate(3.4, -3, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(7, 7)
        // this.scene.pushMatrix();
        // this.scene.translate(5.1, -3, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(8, 1)
        // this.scene.pushMatrix();
        // this.scene.translate(-5.95, -4.5, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(8, 2)
        // this.scene.pushMatrix();
        // this.scene.translate(-4.25, -4.5, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(8, 3)
        // this.scene.pushMatrix();
        // this.scene.translate(-2.55, -4.5, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(8, 4)
        // this.scene.pushMatrix();
        // this.scene.translate(-0.85, -4.5, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(8, 5)
        // this.scene.pushMatrix();
        // this.scene.translate(0.85, -4.5, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(8, 6)
        // this.scene.pushMatrix();
        // this.scene.translate(2.55, -4.5, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(8, 7)
        // this.scene.pushMatrix();
        // this.scene.translate(4.25, -4.5, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(8, 8)
        // this.scene.pushMatrix();
        // this.scene.translate(5.95, -4.5, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(9, 1)
        // this.scene.pushMatrix();
        // this.scene.translate(-6.8, -6, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(9, 2)
        // this.scene.pushMatrix();
        // this.scene.translate(-5.1, -6, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(9, 3)
        // this.scene.pushMatrix();
        // this.scene.translate(-3.4, -6, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(9, 4)
        // this.scene.pushMatrix();
        // this.scene.translate(-1.7, -6, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(9, 5)
        // this.scene.pushMatrix();
        // this.scene.translate(0, -6, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(9, 6)
        // this.scene.pushMatrix();
        // this.scene.translate(1.7, -6, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(9, 7)
        // this.scene.pushMatrix();
        // this.scene.translate(3.4, -6, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(9, 8)
        // this.scene.pushMatrix();
        // this.scene.translate(5.1, -6, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(9, 9)
        // this.scene.pushMatrix();
        // this.scene.translate(6.8, -6, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(10, 1)
        // this.scene.pushMatrix();
        // this.scene.translate(-7.65, -7.5, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(10, 2)
        // this.scene.pushMatrix();
        // this.scene.translate(-5.95, -7.5, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(10, 3)
        // this.scene.pushMatrix();
        // this.scene.translate(-4.25, -7.5, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(10, 4)
        // this.scene.pushMatrix();
        // this.scene.translate(-2.55, -7.5, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(10, 5)
        // this.scene.pushMatrix();
        // this.scene.translate(-0.85, -7.5, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(10, 6)
        // this.scene.pushMatrix();
        // this.scene.translate(0.85, -7.5, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(10, 7)
        // this.scene.pushMatrix();
        // this.scene.translate(2.55, -7.5, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(10, 8)
        // this.scene.pushMatrix();
        // this.scene.translate(4.25, -7.5, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(10, 9)
        // this.scene.pushMatrix();
        // this.scene.translate(5.95, -7.5, 0);
        // this.tile.display();
        // this.scene.popMatrix();

        // //(10, 10)
        // this.scene.pushMatrix();
        // this.scene.translate(7.65, -7.5, 0);
        // this.tile.display();
        // this.scene.popMatrix();


        /*Tiles */
        for (var i = 0; i < this.tiles.length; i++) {
            this.tiles[i].display();
            if (this.tiles[i].piece != null) {
                this.tiles[i].displayPiece();
                //console.log(this.tiles[i].piece);
            }
        }



        /*Square Board */
        this.scene.pushMatrix();
        this.scene.translate(0, -1, -1.7);
        this.scene.scale(9, 9, 0.2);
        this.squareMat.apply();

        // Top
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 10);
        this.square.display();
        this.scene.popMatrix();

        // Down
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 8);
        this.scene.rotate(-180 * Math.PI / 180, 1, 0, 0);
        this.square.display();
        this.scene.popMatrix();

        // 
        this.scene.pushMatrix();
        this.scene.translate(-1, 0, 9);
        this.scene.rotate(-90 * Math.PI / 180, 0, 1, 0);
        this.square.display();
        this.scene.popMatrix();

        // 
        this.scene.pushMatrix();
        this.scene.translate(1, 0, 9);
        this.scene.rotate(90 * Math.PI / 180, 0, 1, 0);
        this.square.display();
        this.scene.popMatrix();

        // 
        this.scene.pushMatrix();
        this.scene.translate(0, -1, 9);
        this.scene.rotate(90 * Math.PI / 180, 1, 0, 0);
        this.square.display();
        this.scene.popMatrix();

        // 
        this.scene.pushMatrix();
        this.scene.translate(0, 1, 9);
        this.scene.rotate(-90 * Math.PI / 180, 1, 0, 0);
        this.square.display();
        this.scene.popMatrix();

        this.scene.popMatrix();

        // Triangles
        this.scene.pushMatrix();
        this.triangleMat.apply();
        this.scene.translate(-2, 7, 0.31);
        this.scene.rotate(180 * Math.PI / 180, 0, 0, 1);
        this.scene.scale(4, 8, 0);
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.triangleMat.apply();
        this.scene.translate(2, 7, 0.31);
        this.scene.rotate(180 * Math.PI / 180, 1, 0, 0);
        this.scene.scale(4, 8, 0);
        this.triangle.display();
        this.scene.popMatrix();

        //Green Skull
        this.scene.pushMatrix();
        this.greenSkull.display();
        this.scene.popMatrix();
    }
}