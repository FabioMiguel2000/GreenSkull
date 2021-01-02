/**
 * MyTile
 * @constructor
 * @param scene - Reference to MyScene object
 * @param row - Int indicating the row number of the tile
 * @param column - Int indicating the row number of the tile
 */

class MyTile extends CGFobject {
    constructor(scene, row, column) {
        super(scene);
        this.row = row;
        this.column = column;
        this.piece = null;
        this.tile = new MyCylinder(this.scene, 1, 1, 0.6, 6, 4);
        this.pickID = null;
        this.initBuffers();
    }

    initBuffers() {
        this.tileMat = new CGFappearance(this.scene);
        this.tileMat.setEmission(0.6, 0, 0, 1);
        this.tileMat.setAmbient(0.24725, 0.1995, 0.0745, 1);
        this.tileMat.setDiffuse(0.75164, 0.60648, 0.22648, 1);
        this.tileMat.setSpecular(0.628281, 0.555802, 0.366065, 1);
        this.tileMat.setShininess(51.2);
        this.updatePos(this.row, this.column);

    }
    setPickID(ID) {
        this.pickID = ID;
    }
    setPiece(piece) {
        this.piece = piece;
    }

    unsetPiece() {
        this.piece = null;
    }
    displayPiece() {
        this.piece.display();
    }

    updatePos(row, column) {
        this.posX = -0.85 * (row - 1) + 1.7 * (column - 1);
        this.posY = 7.5 - 1.5 * row;
    }

    display() {
        this.scene.pushMatrix();
        this.tileMat.apply();
        this.scene.translate(this.posX, this.posY, 0);
        this.tile.display();
        this.scene.popMatrix();
    }
}