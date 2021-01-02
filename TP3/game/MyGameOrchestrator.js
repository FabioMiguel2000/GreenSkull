/**
 * MyGameOrchestrator
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyGameOrchestrator extends CGFobject {
    constructor(scene) {
        super(scene);
        //this.gameSequence = new MyGameSequence(this.scene);
        this.gameBoard = new MyGameBoard(this.scene);
        //var filename = getUrlVars()['file'] || "GreenSkull.xml";
        //this.theme = new MySceneGraph(filename, scene);
        var port = 8081;
        this.prolog = new MyPrologInterface(port);

        this.initBuffers();

    }

    initBuffers() {
        //this.prolog.hellofunc();
        var stringState = this.prolog.loadInitialState();
        console.log(stringState);
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
        var piecesTaken = items[2][0].split(',');
        console.log(piecesTaken);

        for (var row = 0; row < gameState.length; row++) {
            var rowArray = gameState[row].split(',');

            for (var col = 0; col < rowArray.length; col++) {
                var tile = new MyTile(this.scene, row + 1, col + 1);
                switch (rowArray[col]) {
                    case 'goblin':
                        var piece = new MyPiece(this.scene, 'goblin', row + 1, col + 1);
                        piece.setTile(tile);
                        //piece.setPickID(id);
                        tile.setPiece(piece);
                        this.gameBoard.pieces.push(piece);
                        break;
                    case 'orc':
                        var piece = new MyPiece(this.scene, 'orc', row + 1, col + 1);
                        piece.setTile(tile);
                        //piece.setPickID(id);
                        tile.setPiece(piece);
                        this.gameBoard.pieces.push(piece);
                        break;
                    case 'zombie':
                        var piece = new MyPiece(this.scene, 'zombie', row + 1, col + 1);
                        piece.setTile(tile);
                        //piece.setPickID(id);
                        tile.setPiece(piece);
                        this.gameBoard.pieces.push(piece);
                        break;
                    default:
                        break;
                }
                this.gameBoard.tiles.push(tile);

            }
        }
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
    prologArrayToJSArray(prologArray) {

        var numbersBoard = [];
        var i = 0;
        for (let rows = 0; rows < 11; rows++) {
            var numbersLine = [];
            var column = 0;
            while (column != 11) {
                if (prologArray[i] != "[" && prologArray[i] != "," && prologArray[i] != "]") {
                    numbersLine.push(prologArray[i]);
                    column++;
                }
                i++;
            }
            numbersBoard.push(numbersLine);
        }

        var board = [];
        for (var i = 0; i < numbersBoard.length; i++) {
            var line = [];
            for (var j = 0; j < numbersBoard[i].length; j++) {
                line.push(new MyPiece(this.scene, j, i, numbersBoard[i][j]));
            }
            board.push(line);
        }

        return board;
    };

}