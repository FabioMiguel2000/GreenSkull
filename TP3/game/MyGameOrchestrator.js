/**
 * MyGameOrchestrator
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyGameOrchestrator extends CGFobject {
    constructor(scene) {
        super(scene);
        this.gameSequence = new MyGameSequence(this.scene);
        this.gameBoard = new MyGameBoard(this.scene);
        //var filename = getUrlVars()['file'] || "GreenSkull.xml";
        //this.theme = new MySceneGraph(filename, scene);
        var port = 8081;
        this.prolog = new MyPrologInterface(port);

        this.initBuffers();

    }

    movePiece(pieceToMove, destTile) {
        /*console.log("Piece to move: " + pieceToMove.pickID);
        console.log("Destination tile: " + destTile.pickID);*/
        var row = pieceToMove.row;
        var col = pieceToMove.column;
        if (this.gameBoard.movePiece(pieceToMove, pieceToMove.tile, destTile) == -1) {
            console.log("Piece not moved!");
        } else {
            console.log("Piece at position (" + row + ", " + col + ") moved to (" + destTile.row + ", " + destTile.column + ")");
        }
    }


    initBuffers() {
        this.loadInitialState();
    }
    loadInitialState() {
        let request = 'loadInitial';
        var stringState = this.prolog.loadState(request);
        let depth = 0;
        let item = '';
        let items = [];
        for (let i = 0; i < stringState.length; i++) {
            if (stringState[i] === '[') {
                depth++;
                if (depth === 2) {
                    items.push([]);
                }
            } else if (stringState[i] === ']') {
                if (depth === 3) {
                    items[items.length - 1].push(item);
                    item = '';
                }
                depth--;
            } else if (depth === 3) {
                item += stringState[i]
            }
        }
        var gameState = items[0];
        var greenSkull = items[1][0];
        /*var piecesTaken = items[2][0].split(',');
        console.log(piecesTaken);*/
        var idPiece = 1;
        var idTiles = 31;

        for (var row = 0; row < gameState.length; row++) {
            var rowArray = gameState[row].split(',');

            for (var col = 0; col < rowArray.length; col++) {
                var tile = new MyTile(this.scene, row + 1, col + 1);
                switch (rowArray[col]) {
                    case 'goblin':
                        var piece = new MyPiece(this.scene, 'goblin', row + 1, col + 1);
                        piece.setTile(tile);
                        piece.setPickID(idPiece);
                        idPiece++;
                        tile.setPiece(piece);
                        this.gameBoard.pieces.push(piece);
                        break;
                    case 'orc':
                        var piece = new MyPiece(this.scene, 'orc', row + 1, col + 1);
                        piece.setTile(tile);
                        piece.setPickID(idPiece);
                        idPiece++;
                        tile.setPiece(piece);
                        this.gameBoard.pieces.push(piece);
                        break;
                    case 'zombie':
                        var piece = new MyPiece(this.scene, 'zombie', row + 1, col + 1);
                        piece.setTile(tile);
                        piece.setPickID(idPiece);
                        idPiece++;
                        tile.setPiece(piece);
                        this.gameBoard.pieces.push(piece);
                        break;
                    default:
                        break;
                }
                tile.setPickID(idTiles);
                idTiles++;
                this.gameBoard.tiles.push(tile);

            }
        }
        //console.log(this.gameBoard.tiles[0]);
        this.gameBoard.setGreenSkull(greenSkull);
    }



    update(time) {
        //this.animator.update(time);
    }
    display() {
        /*
        this.theme.display();

        this.animator.display();*/


        this.gameBoard.display();

    }


}