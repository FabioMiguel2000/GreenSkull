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

        this.currentPlayer = 'orc';
        this.piecesTaken = [];

    }

    movePiece(pieceToMove, destTile) {
        var row = pieceToMove.row;
        var col = pieceToMove.col;
        var destRow = destTile.row;
        var destCol = destTile.col;
        var moveType;

        if (destTile.piece == null) {
            moveType = 'normal';
        } else {
            moveType = 'jump';
        }
        var request = "move(" + this.getStringState() + "," + this.currentPlayer + "," + moveType + "," +
            row + "," + col + "," + destRow + "," + destCol + ")";

        var response = this.prolog.loadState(request);
        //console.log(response);

        if (response != 'no') {

            if(moveType == 'normal'){
                var newMove = new MyGameMove(this.scene, pieceToMove, pieceToMove.tile, destTile, moveType, 
                    this.currentPlayer, this.getStringState());

                if (this.gameBoard.movePiece(pieceToMove, pieceToMove.tile, destTile) == -1) {
                    console.log("Piece not moved!");
                    return;
                } else {
                    console.log("Piece at position (" + row + ", " + col + ") moved to (" +
                        destRow + ", " + destCol + ")");
                    this.gameSequence.addGameMove(newMove);
                    this.stringState = response;
                }
            }

            else if(moveType == 'jump'){
                var jumpDestTile = this.gameBoard.jumpPiece(pieceToMove, pieceToMove.tile, destTile, this.currentPlayer);

                var newMove = new MyGameMove(this.scene, pieceToMove, previousTile, jumpDestTile, moveType,
                    this.currentPlayer, this.getStringState());

                if (jumpDestTile == -1) {
                    console.log("Piece not moved!");
                    return;
                } else {
                    console.log("Piece at position (" + row + ", " + col + ") moved to (" +
                        jumpDestTile.row + ", " + jumpDestTile.col + ")");
                    this.gameSequence.addGameMove(newMove);

                    this.stringState = response;
                }
            }

            this.swapPlayer(moveType);
        }
    }

    getStringState() {
        var str = '[[';
        var index = 0;
        for (var row = 1; row <= 10; row++) {
            str += '['
            for (var col = 1; col <= row; col++) {
                if (this.gameBoard.tiles[index].piece == null) {
                    str += 'empty';
                } else {
                    str += this.gameBoard.tiles[index].piece.type;

                }
                if (col != row)
                    str += ',';
                index++;
            }
            str += ']';
            if (row != 10)
                str += ',';
        }
        str += '],';
        str += this.gameBoard.greenSkull.player + ',[';
        str += this.piecesTaken.toString();
        str += ']]';
        return str;

    }

    swapPlayer(moveType){
        var playerWithGS = this.gameBoard.getGreenSkull();

        if(this.currentPlayer == 'zombie'){

            //At this point, the green skull was already swapped, so if a jump was made by the player who had the 
            //green skull, they pass both their turn and the green skull to the other player
            if(moveType == 'jump'){
                this.currentPlayer = playerWithGS;                
            }

            else if(moveType == 'normal'){
                if(playerWithGS == 'orc'){
                    this.currentPlayer = 'goblin';
                }
                else if(playerWithGS == 'goblin'){
                    this.currentPlayer = 'orc';
                }
            }
        }

        else if(playerWithGS == this.currentPlayer){
            this.currentPlayer = 'zombie';
        }

        else{
            if(this.currentPlayer == 'orc'){
                this.currentPlayer = 'goblin';
            }
            else if(this.currentPlayer == 'goblin'){
                this.currentPlayer = 'orc';
            }
        }

        console.log(this.currentPlayer);
    }

    initBuffers() {
        this.gameBoard.startGame();
        this.loadInitialState();
    }

    undoMove() {
        var lastMove = this.gameSequence.undoGameMove();
        if (lastMove != -1) {
            var piece = lastMove.movedPiece;
            lastMove.destinationTile.unsetPiece();
            lastMove.originTile.setPiece(piece);
            piece.setTile(lastMove.originTile);
            this.currentPlayer = lastMove.player;
            if (lastMove.type == 'jump') {
                console.log('undo jump move')
                var capturedPiece = this.gameBoard.removeLastCaptured();
                capturedPiece.tile.setPiece(capturedPiece);
            }
        }
    }
    loadInitialState() {
        let request = 'loadInitial';
        this.stringState = this.prolog.loadState(request);
        this.updateGameState(this.stringState);
    }

    updateGameState(stringState) {
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
        this.gameBoard.clearGameBoard();
        /*if(items[2][0] != '' && items[2][0].search(',') > 0){
            this.gameBoard.capturedPieces = items[2][0].split(',');
        }
        else if(items[2][0] != '' && items[2][0].search(',') < 0){
            this.gameBoard.capturedPieces
        }*/
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
