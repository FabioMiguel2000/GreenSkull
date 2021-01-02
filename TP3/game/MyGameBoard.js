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

        this.tiles = [];
        this.pieces = [];

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

        //Temp functions for before buildBoard is working properly
        /*var id = 1;
        for (var row = 1; row <= 10; row++) {
            for (var column = 1; column <= row; column++) {
                var tile = new MyTile(this.scene, row, column);
                if ((row == 7 && column == 7) || (row == 8 && column == 7) || (row == 8 && column == 8) || (row == 9 && column == 7) ||
                    (row == 9 && column == 8) || (row == 9 && column == 9) || (row == 10 && column == 7) || (row == 10 && column == 8) ||
                    (row == 10 && column == 9) || (row == 10 && column == 10)) {
                    var piece = new MyPiece(this.scene, 'orc', row, column);
                    piece.setTile(tile);
                    piece.setPickID(id);
                    id++;
                    tile.setPiece(piece);
                    this.pieces.push(piece);
                } else if ((row == 7 && column == 1) || (row == 8 && column == 1) || (row == 8 && column == 2) || (row == 9 && column == 1) ||
                    (row == 9 && column == 2) || (row == 9 && column == 3) || (row == 10 && column == 1) || (row == 10 && column == 2) ||
                    (row == 10 && column == 3) || (row == 10 && column == 4)) {
                    var piece = new MyPiece(this.scene, 'goblin', row, column);
                    piece.setTile(tile);
                    piece.setPickID(id);
                    id++;
                    tile.setPiece(piece);
                    this.pieces.push(piece);

                } else if ((row == 3 && column == 1) || (row == 3 && column == 3) || (row == 4 && column == 1) || (row == 4 && column == 4) ||
                    (row == 5 && column == 3) || (row == 6 && column == 3) || (row == 6 && column == 4) || (row == 7 && column == 4)) {
                    var piece = new MyPiece(this.scene, 'zombie', row, column);
                    piece.setTile(tile);
                    piece.setPickID(id);
                    id++;
                    tile.setPiece(piece);
                    this.pieces.push(piece);
                }

                this.tiles.push(tile)
            }
        }*/
    }

    display() {
        this.scene.pushMatrix();
        this.scene.rotate(-90 * Math.PI / 180, 1, 0, 0);

        /*Tiles */
        for (var i = 0; i < this.tiles.length; i++) {
            this.tiles[i].display();
            if (this.tiles[i].piece != null) {
                this.scene.registerForPick(this.tiles[i].piece.pickID, this.tiles[i].piece);

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


        this.scene.popMatrix();
    }

    setGreenSkull(player) {
        this.greenSkull.playerWithGS(player);
    }

    removePieceFromTile(row, column) {
        for (var i = 0; i < this.tiles.length; i++) {
            if (this.tiles[i].row == row && this.tiles[i].column == column) {
                this.tiles[i].unsetPiece();
            }
        }
    }

    addPieceToTile(piece, row, column) {
        for (var i = 0; i < this.tiles.length; i++) {
            if (this.tiles[i].row == row && this.tiles[i].column == column) {
                this.tiles[i].setPiece(piece);
            }
        }
    }
    getPieceFromTile(row, column) {
        for (var i = 0; i < this.tiles.length; i++) {
            if (this.tiles[i].row == row && this.tiles[i].column == column) {
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
            return -1;
        }
        startingTile.unsetPiece();
        if (destinationTile.piece != null) {
            return -1;
        }
        destinationTile.setPiece(piece);
        return 0;
    }

    //Function that receives the list containing the board configuration and places pieces in each space with one
    buildBoard(board) {
        for (var i = 0; i < board.length; i++) {
            //The row is i + 1 because board positions start at 1 unlike list positions that start at 0
            var row = i + 1;

            for (var j = 0; j < board[i].length; j++) {
                //It is also added 1 to the column
                var col = j + 1;

                var tile = new MyTile(this.scene, row, column);

                switch (board[i][j]) {
                    case 'empty':
                        break;

                    case 'goblin':
                        var piece = new MyPiece(this.scene, 'goblin', row, col);
                        this.pieces.push(piece);

                        this.tile.setPiece(piece);
                        break;

                    case 'orc':
                        var piece = new MyPiece(this.scene, 'orc', row, col);
                        this.pieces.push(piece);

                        this.tile.setPiece(piece);
                        break;

                    case 'zombie':
                        var piece = new MyPiece(this.scene, 'zombie', row, col);
                        this.pieces.push(piece);

                        this.tile.setPiece(piece);
                        break;

                    default:
                        console.log("Warning: unintended object in board, something must have gone wrong while getting the board");
                        break;
                }
                this.tiles.push(tile);
            }
        }
    }

}