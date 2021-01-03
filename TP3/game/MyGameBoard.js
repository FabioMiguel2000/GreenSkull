/**
 * MyBoard
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyGameBoard extends CGFobject {
    constructor(scene) {
        super(scene);

        this.square = new MyRectangle(this.scene, -1, -1, 1, 1);
        this.triangle = new MyTriangle(this.scene, 0, 0, 1.5, 1.5, 1.5, 0);
        this.greenSkull = new MyGreenSkull(this.scene, 'goblin');
        this.gameStarted = false;
        this.tiles = [];
        this.pieces = [];
        this.capturedPieces = [];

        this.initBuffers();
    }

    initBuffers() {
        //Geometry for a tile of the board that will be replicated to display all tiles of the board

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

        this.loadEmptyBoard();

    }
    startGame() {
        this.clearGameBoard();
        this.gameStarted = true;

    }

    clearGameBoard() {
        this.tiles = [];
        this.pieces = [];
    }

    display() {

        this.scene.pushMatrix();
        this.scene.rotate(-90 * Math.PI / 180, 1, 0, 0);

        /*Tiles */

        for (var i = 0; i < this.tiles.length; i++) {
            this.scene.registerForPick(this.tiles[i].pickID, this.tiles[i]);
            this.tiles[i].display();

            if (this.tiles[i].piece != null) {
                this.scene.registerForPick(this.tiles[i].piece.pickID, this.tiles[i].piece);
                this.tiles[i].displayPiece();

            }
        }
        this.scene.clearPickRegistration();


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
        if (this.gameStarted) {
            this.scene.pushMatrix();
            this.greenSkull.display();
            this.scene.popMatrix();
        }


        this.scene.popMatrix();
    }
    getGreenSkull() {
        return this.greenSkull.getPlayer();
    }

    setGreenSkull(player) {
        this.greenSkull.playerWithGS(player);
    }

    getTile(row, col) {
        for (var i = 0; i < this.tiles.length; i++) {
            if (this.tiles[i].row == row && this.tiles[i].col == col) {
                return this.tiles[i];
            }
        }
        return null;
    }

    removePieceFromTile(row, col) {
        for (var i = 0; i < this.tiles.length; i++) {
            if (this.tiles[i].row == row && this.tiles[i].col == col) {
                this.tiles[i].unsetPiece();
            }
        }
    }

    addPieceToTile(piece, row, col) {
        for (var i = 0; i < this.tiles.length; i++) {
            if (this.tiles[i].row == row && this.tiles[i].col == col) {
                this.tiles[i].setPiece(piece);
            }
        }
    }

    getPieceFromTile(row, col) {
        for (var i = 0; i < this.tiles.length; i++) {
            if (this.tiles[i].row == row && this.tiles[i].col == col) {
                return this.tiles[i].piece;
            }
        }
        return null;
    }

    getTileFromPiece(piece) {
        return piece.tile;
    }

    movePiece(piece, startingTile, destinationTile) {
        if (startingTile.piece != piece) {
            console.log("No piece on starting Tile");
            return -1;
        }

        if (destinationTile.piece != null) {
            console.log("Destination tile not empty");
            return -1;
        }

        startingTile.unsetPiece();
        destinationTile.setPiece(piece);
        piece.setTile(destinationTile);

        return 0;
    }

    jumpPiece(piece, startingTile, jumpTile, player) {
        if (startingTile.piece != piece) {
            console.log("No piece on starting Tile");
            return -1;
        }

        if (jumpTile.piece == null) {
            console.log("No piece to jump over");
            return -1;
        }

        var destTile = this.getJumpDestTile(jumpTile, startingTile);

        startingTile.unsetPiece();
        this.capturedPieces.push(jumpTile.piece);
        jumpTile.unsetPiece();
        destTile.setPiece(piece);
        piece.setTile(destTile);

        if((this.getGreenSkull() == player) || (player == 'zombie')){
            console.log("here");
            this.greenSkull.switchGreenSkull();
        }

        //Returns destination tile for the MyGameOrchestrator to use
        return destTile;
    }

    getJumpDestTile(jumpTile, startingTile) {
        var rowDiff = jumpTile.row - startingTile.row;
        var colDiff = jumpTile.col - startingTile.col;

        var destRow;
        var destCol;

        switch (rowDiff) {
            case 1:
                switch (colDiff) {
                    case 1:
                        destRow = jumpTile.row + 1;
                        destCol = jumpTile.col + 1;
                        break;

                    case 0:
                        destRow = jumpTile.row + 1;
                        destCol = jumpTile.col;
                        break;

                    default:
                        return -1;
                }
                break;

            case 0:
                switch (colDiff) {
                    case 1:
                        destRow = jumpTile.row;
                        destCol = jumpTile.col + 1;
                        break;

                    case -1:
                        destRow = jumpTile.row;
                        destCol = jumpTile.col - 1;
                        break;

                    default:
                        return -1;
                }
                break;

            case -1:
                switch (colDiff) {
                    case 0:
                        destRow = jumpTile.row - 1;
                        destCol = jumpTile.col;
                        break;

                    case -1:
                        destRow = jumpTile.row - 1;
                        destCol = jumpTile.col - 1;
                        break;

                    default:
                        return -1;
                }
                break;
        }

        return this.getTile(destRow, destCol);
    }

    loadEmptyBoard() {
        for (var row = 1; row <= 10; row++) {

            for (var col = 1; col <= row; col++) {

                var tile = new MyTile(this.scene, row, col);

                this.tiles.push(tile);
            }
        }
    }
}