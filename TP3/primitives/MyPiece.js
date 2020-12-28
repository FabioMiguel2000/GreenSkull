/**
 * MyPiece
 * @constructor
 * @param scene - Reference to MyScene object
 * @param type - String indicating which type of piece it is
 * @param row - Int indicating the row number of the piece
 * @param column - Int indicating the row number of the piece
 */

class MyPiece extends CGFobject {
    constructor(scene, type, row, column) {
        super(scene);
        this.type = type;
        this.row = row;
        this.column = column;
        this.piece = new MyCylinder(this.scene, 0.6, 0.6, 0.3, 16, 4);
        this.initBuffers();
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
        this.updatePos(this.row, this.column);

    }

    updatePos(row, column) {
        this.posY = 7.5 - row * 1.5;
        this.posX = column * 1.7 - row * 0.85 - 0.85;
    }

    display() {
        this.scene.pushMatrix();
        this.pieceMaterial.apply();
        this.scene.translate(this.posX, this.posY, 0.6);
        this.piece.display();
        this.scene.popMatrix();
    }
}