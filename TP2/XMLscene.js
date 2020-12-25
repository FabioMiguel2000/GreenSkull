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

        this.loadingProgressObject = new MyRectangle(this, -1, -.1, 1, .1);
        this.loadingProgress = 0;

        this.defaultAppearance = new CGFappearance(this);

        this.enableAxis = true;
        //this.enableLights = true;
        this.scaleFactor = 1;
        this.selectedCamera = 0;
        this.cameras = { 'defaultCamera': 0, 'demoOrtho': 1 };

        //Animation testing
        /*var keyframes = [];
        var keyframe1 = new MyKeyframe(0, [1, 0, 0], [0, 0, 0], [1, 1, 1]);
        var keyframe2 = new MyKeyframe(5, [-5, 0, 0], [0, 90, 0], [1, 1, 1.5]);
        var keyframe3 = new MyKeyframe(15, [-5, 0, 2], [180, 90, 0], [0.9, 0.9, 1.2]);
        keyframes.push(keyframe1);
        keyframes.push(keyframe2);
        keyframes.push(keyframe3);
        
        this.cylinder = new MyCylinder(this, 2, 3, 5, 16, 8);

        this.anim = new MyKeyframeAnimation(keyframes);*/
        this.lastTime = 0;
        this.time = 0;
    }

    /**
     * Initializes the scene cameras.
     */
    initCameras() {
            this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));

            /*var defaultCamera = this.graph.cameras[0]; 

            this.camera = this.graph.cameras[defaultCamera]; 

            this.interface.setActiveCamera(this.camera);*/

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

    /** Handler called when the graph is finally loaded. 
     * As loading is asynchronous, this may be called already after the application has started the run loop
     */
    onGraphLoaded() {
        this.axis = new CGFaxis(this, this.graph.referenceLength);

        this.gl.clearColor(...this.graph.background);

        this.setGlobalAmbientLight(...this.graph.ambient);

        this.initLights();

        this.sceneInited = true;

        this.interface.addLightsGroup(this.graph.lights);

        this.updateCamera(this.selectedCamera);
    }
    updateCamera(i) {
        var cameraID = this.graph.camerasIDs[i];
        var cam = this.graph.cameras[cameraID];
        this.camera = cam;
        this.interface.setActiveCamera(this.camera);
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
    }

    /**
     * Displays the scene.
     */
    display() {
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

        //this.updateCamera(this.selectedCamera);

        //this.anim.apply(this);
        //this.cylinder.display();

        this.popMatrix();
        // ---- END Background, camera and axis setup
    }
}