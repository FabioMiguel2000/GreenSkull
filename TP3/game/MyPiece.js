/**
 * MyPiece
 * @constructor
 * @param scene - Reference to MyScene object
 * @param type - String indicating which type of piece it is
 * @param row - Int indicating the row number of the piece
 * @param col - Int indicating the row number of the piece
 */

class MyPiece extends CGFobject {
    constructor(scene, type, row, col) {
        super(scene);
        this.pickID = null;
        this.type = type;
        this.row = row;
        this.col = col;
        this.tile = null;
        this.piece = new MyCylinder(this.scene, 0.6, 0.6, 0.3, 16, 4);
        this.initBuffers();
        this.animation = null;
    }

    initBuffers() {
        this.pieceMaterial = new CGFappearance(this.scene);
        switch (this.type) {
            case 'goblin':
                this.pieceMaterial.setEmission(0, 0, 0, 1);
                this.pieceMaterial.setAmbient(0.8, 0.2, 0.8, 1);
                this.pieceMaterial.setDiffuse(0.8, 0.2, 0.8, 1);
                this.pieceMaterial.setSpecular(0.8, 0.2, 0.8, 1);
                break;
            case 'orc':
                this.pieceMaterial.setEmission(0, 0, 0, 1);
                this.pieceMaterial.setAmbient(1, 1, 1, 1);
                this.pieceMaterial.setDiffuse(1, 1, 1, 1);
                this.pieceMaterial.setSpecular(1, 1, 1, 1);
                break;
            case 'zombie':
                this.pieceMaterial.setEmission(0, 0, 0, 1);
                this.pieceMaterial.setAmbient(0.3, 0.9, 0.1, 1);
                this.pieceMaterial.setDiffuse(0.3, 0.9, 0.1, 1);
                this.pieceMaterial.setSpecular(0.3, 0.9, 0.1, 1);
                break;
            default:
                break;
        }
        this.updatePos(this.row, this.col);

    }

    setAnimation(animation) {
        //console.log(animation);
        this.animation = animation;
    }
    setPickID(ID) {
        this.pickID = ID;
    }
    setTile(tile) {
        this.tile = tile;
        this.updatePos(tile.row, tile.col);
    }
    unsetTile() {
        this.tile = null;
    }
    updatePos(row, col) {
        this.row = row;
        this.col = col;
        this.posY = 7.5 - row * 1.5;
        this.posX = col * 1.7 - row * 0.85 - 0.85;
    }

    display() {
        this.scene.pushMatrix();
        this.pieceMaterial.apply();
        this.scene.translate(this.posX, this.posY, 0.6);
        this.piece.display();
        this.scene.popMatrix();
    }
}
