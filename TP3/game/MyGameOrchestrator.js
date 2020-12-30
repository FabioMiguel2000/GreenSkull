/**
 * MyGameOrchestrator
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyGameOrchestrator extends CGFobject {
    constructor(scene) {
        super(scene);

        this.prologInterface = new MyPrologInterface(8081);

        this.prologInterface.getRequest("loadInitial",
            function(data){ this.gameState = JSON.parse(data.target.response); },
            function() {}) ;

        console.log(this.gameState);

        var board = this.gameState[0];

        //this.gameSequence = new MyGameSequence(this.scene);
        this.gameBoard = new MyGameBoard(this.scene, board);
        /*var filename = getUrlVars()['file'] || "GreenSkull.xml";
        this.theme = new MySceneGraph(filename, scene);
        var port;
        this.prolog = new MyPrologInterface(port);*/

        this.initBuffers();

    }

    initBuffers() {

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
