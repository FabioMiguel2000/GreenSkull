/**
 * MyGameMove
 * @constructor
 * @param scene - Reference to MyScene object
 * @param movedPiece - MyPiece object that is about to move
 * @param originTile - MyTile object, indicating the origination Tile
 * @param destinationTile - MyTile object, indicating the destination Tile
 * @param type - Defines if the move is a normal move or a jump
 * @param player - Player that executed the move
 * @param previousGameBoardState - Game state prior to the move being executed
 */

class MyGameMove extends CGFobject {
    constructor(scene, movedPiece, originTile, destinationTile, type, player, previousGameBoardState) {
        super(scene);
        this.movedPiece = movedPiece;
        this.originTile = originTile;
        this.destinationTile = destinationTile;
        this.type = type;
        this.player = player;
        this.previousGameBoardState = previousGameBoardState;

        this.initBuffers();
    }

    initBuffers() {

    }
    animate() {

    }
}