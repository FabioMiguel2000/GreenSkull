/**
 * MyGameSequence
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyGameSequence extends CGFobject {
    constructor(scene) {
        super(scene);
        this.gameMoves = [];

        this.initBuffers();
    }

    initBuffers() {

    }
    animate() {

    }
    addGameMove(gameMove) {
        this.gameMoves.push(gameMove);
    }
    undoGameMove() {
        if (this.gameMoves.length < 1) {
            return -1;
        }
        return this.gameMoves.pop();

    }
}