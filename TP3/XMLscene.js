/**
 * XMLscene class, representing the scene that is to be rendered.
 */
class XMLscene extends CGFscene {
    /**
     * @constructor
     * @param {MyInterface} myinterface 
     */
    constructor(myinterface) {
        super();

        this.interface = myinterface;
        this.lightValues = {};
    }

    /**
     * Initializes the scene, setting some WebGL defaults, initializing the camera and the axis.
     * @param {CGFApplication} application
     */
    init(application) {
        super.init(application);

        this.sceneInited = false;

        this.initCameras();

        this.enableTextures(true);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.axis = new CGFaxis(this);
        this.setUpdatePeriod(100);
        this.setPickEnabled(true);

        this.gameOrchestrator = new MyGameOrchestrator(this);

        this.loadingProgressObject = new MyRectangle(this, -1, -.1, 1, .1);
        this.loadingProgress = 0;

        this.defaultAppearance = new CGFappearance(this);

        this.enableAxis = true;
        this.scaleFactor = 1;
        //this.selectedCamera = 0;
        this.lastTime = 0;
        this.time = 0;
        this.cameraRotationPercentage = 0;
        this.rotating = false;

        /* TP3*/
        this.pickedPiece = null;
        this.gameStarted = false;
        this.enableRotation = true;
        this.gameEnded = false;

        this.startGame = function() {
            this.setGameCamera();
            this.gameStarted = true;
            this.gameOrchestrator.initBuffers();
        };
        this.restartGame = function() {
            this.setDefaultCamera();
            this.gameStarted = false;
            this.gameOrchestrator = new MyGameOrchestrator(this);
        };
        this.undo = function() {
            if (this.gameStarted) {
                this.gameOrchestrator.undoMove();
            }
        };
    }

    /**
     * Initializes the scene cameras.
     */
    initCameras() {
            this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));

        }
        /**
         * Initializes the scene lights with the values read from the XML file.
         */
    initLights() {
        var i = 0;
        // Lights index.

        // Reads the lights from the scene graph.
        for (var key in this.graph.lights) {
            if (i >= 8)
                break; // Only eight lights allowed by WebCGF on default shaders.

            if (this.graph.lights.hasOwnProperty(key)) {
                var graphLight = this.graph.lights[key];

                this.lights[i].setPosition(...graphLight[1]);
                this.lights[i].setAmbient(...graphLight[2]);
                this.lights[i].setDiffuse(...graphLight[3]);
                this.lights[i].setSpecular(...graphLight[4]);

                this.lights[i].setVisible(true);
                if (graphLight[0])
                    this.lights[i].enable();
                else
                    this.lights[i].disable();

                this.lights[i].update();

                i++;
            }
        }
    }

    loadPanel() {
        if (typeof this.gameOrchestrator != "undefined") {
            if (!this.gameStarted) {
                document.getElementById("goblinScore").innerText = "";
                document.getElementById("orcScore").innerText = "";
                document.getElementById("zombieScore").innerText = "";
                document.getElementById("greenSkull").innerText = "";
                document.getElementById("playerTurn").innerText = "";
                document.getElementById("information").innerText = "Click 'Start Game' to play";

            } else if (this.gameEnded) {
                document.getElementById("goblinScore").innerText = "Goblin Score: " + this.gameOrchestrator.goblinScore + "\n";
                document.getElementById("orcScore").innerText = "Orc Score: " + this.gameOrchestrator.orcScore + "\n";
                document.getElementById("zombieScore").innerText = "Zombie Score: " + this.gameOrchestrator.zombieScore + "\n";
                document.getElementById("greenSkull").innerText = "";
                document.getElementById("playerTurn").innerText = "The game has ended!\n";
                document.getElementById("information").innerText = this.winText;

            } else {
                document.getElementById("goblinScore").innerText = "Goblin Score: " + this.gameOrchestrator.goblinScore + "\n";
                document.getElementById("orcScore").innerText = "Orc Score: " + this.gameOrchestrator.orcScore + "\n";
                document.getElementById("zombieScore").innerText = "Zombie Score: " + this.gameOrchestrator.zombieScore + "\n";
                document.getElementById("greenSkull").innerText = "Green Skull: " + this.gameOrchestrator.gameBoard.getGreenSkull() + "\n";
                document.getElementById("playerTurn").innerText = "Player Turn: " + this.gameOrchestrator.currentPlayer + "\n";
                document.getElementById("information").innerText = "";

            }
        }

    }

    setActiveCamera() {
        this.camera = this.cameras[this.selectedCamera];
        this.interface.setActiveCamera(this.camera);
    }

    setGameCamera() {
        this.camera = this.cameras['gameCamera'];
        this.camera.orbit([0, 1, 0], -(90 / 180) * Math.PI);
        this.interface.setActiveCamera(this.camera);
    }

    rotateGameCamera(elapsedTime) {
        var cameraRotateFrag = elapsedTime / 4;
        if (this.gameStarted) {
            if (this.cameraRotationPercentage >= 0.96) {
                this.camera.orbit([0, 1, 0], (180 * (1 - this.cameraRotationPercentage) / 180) * Math.PI);
                this.cameraRotationPercentage = 0;
                this.setPickEnabled(true);
                this.rotating = false;
            } else {
                this.camera.orbit([0, 1, 0], (180 * cameraRotateFrag / 180) * Math.PI);

                this.cameraRotationPercentage += cameraRotateFrag;
            }
        }
    }

    setDefaultCamera() {
        this.camera = this.cameras['defaultCamera'];
        this.interface.setActiveCamera(this.camera);
    }

    onGraphLoaded() {
        this.axis = new CGFaxis(this, this.graph.referenceLength);

        this.gl.clearColor(...this.graph.background);

        this.setGlobalAmbientLight(...this.graph.ambient);

        this.initLights();

        this.interface.addLightsGroup(this.graph.lights);

        this.cameras = this.graph.cameras;

        this.setActiveCamera();

        this.interface.initGameOptions();

        this.sceneInited = true;

    }


    // Note: update(t) is called periodically (as per setUpdatePeriod() in init())
    update(t) {
        t = t / 1000;
        if (this.lastTime == 0) {
            this.lastTime = t;
        }
        var elapsedTime = t - this.lastTime; //Calculates the time passed since last update()
        this.time = this.time + elapsedTime;
        this.lastTime = t;
        this.animations = this.graph.animations;
        this.spriteAnimations = this.graph.spriteAnimations;

        for (var key in this.animations) {
            this.animations[key].update(elapsedTime);
        }

        for (var key in this.spriteAnimations) {
            this.spriteAnimations[key].update(elapsedTime);
        }

        if (this.rotating) {
            this.setPickEnabled(false);
            this.rotateGameCamera(elapsedTime);
        }
    }

    selectPieceAnimation() {
        var selectAnimation = this.animations["Piece Select"];
        this.pickedPiece.setAnimation(selectAnimation);
        selectAnimation.apply();
    }


    logPicking() {
        if (this.pickMode == false) {
            if (this.pickResults != null && this.pickResults.length > 0) {
                for (var i = 0; i < this.pickResults.length; i++) {
                    var obj = this.pickResults[i][0];
                    if (obj) {
                        var customId = this.pickResults[i][1];
                        //console.log("Picked object: " + obj + ", with pick id " + customId);

                        if (this.pickedPiece == null && customId < 30) {
                            this.pickedPiece = obj;
                            //this.selectPieceAnimation();

                        } else if (this.pickedPiece != null) {
                            var tile;

                            if (customId < 30) {
                                tile = obj.tile;
                            } else {
                                tile = obj;
                            }

                            this.gameOrchestrator.movePiece(this.pickedPiece, tile);
                            this.pickedPiece = null;
                        }
                    }
                }
                this.pickResults.splice(0, this.pickResults.length);
            }
        }
    }

    endGame(winText) {
        this.gameEnded = true;
        this.setPickEnabled(false);
        this.winText = winText;
    }

    /**
     * Displays the scene.
     */
    display() {
        this.loadPanel();
        this.logPicking();
        this.clearPickRegistration();

        // ---- BEGIN Background, camera and axis setup

        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();

        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        this.pushMatrix();
        this.clearPickRegistration();

        this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);

        var i = 0;
        for (var key in this.lightValues) {
            if (this.lightValues.hasOwnProperty(key)) {
                if (this.lightValues[key]) {
                    this.lights[i].setVisible(true);
                    this.lights[i].enable();
                } else {
                    this.lights[i].setVisible(false);
                    this.lights[i].disable();
                }
                this.lights[i].update();
                i++;
            }
        }

        if (this.sceneInited) {
            // Draw axis
            if (this.enableAxis) {
                this.axis.display();
            }

            this.defaultAppearance.apply();

            // Displays the scene (MySceneGraph function).
            this.graph.displayScene();
        } else {
            // Show some "loading" visuals
            this.defaultAppearance.apply();

            this.rotate(-this.loadingProgress / 10.0, 0, 0, 1);

            this.loadingProgressObject.display();
            this.loadingProgress++;
        }


        this.gameOrchestrator.display();

        this.popMatrix();

        // ---- END Background, camera and axis setup
    }
}