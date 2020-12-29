/**
 * MyGameMove
 * @constructor
 * @param scene - Reference to MyScene object
 * @param movedPiece - MyPiece object that is about to move
 * @param originTile - MyTile object, indicating the origination Tile
 * @param destinationTile - MyTile object, indicating the destination Tile
 * 
 */

class MyGameMove extends CGFobject {
    constructor(scene, movedPiece, originTile, destinationTile, previousGameBoardState) {
        super(scene);
        this.movedPiece = movedPiece;
        this.originTile = originTile;
        this.destinationTile = destinationTile;
        this.previousGameBoardState = previousGameBoardState;

        this.initBuffers();
    }

    initBuffers() {

    }
    animate() {

    }
}