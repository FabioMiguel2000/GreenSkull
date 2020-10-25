/**
* MyInterface class, creating a GUI interface.
*/
class MyInterface extends CGFinterface {
    /**
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * Initializes the interface.
     * @param {CGFapplication} application
     */
    init(application) {
        super.init(application);
        // init GUI. For more information on the methods, check:
        //  http://workshop.chromeexperiments.com/examples/gui

        this.gui = new dat.GUI();
        
        //Button to enable or disable lights
        this.gui.add(this.scene, 'enableLights').name("Turn On Lights");

        //Button to enable or disable axis
        this.gui.add(this.scene, 'enableAxis').name("Display Axis");

        //Slider to scale scene
        this.gui.add(this.scene, 'scaleFactor', 0.1, 2.0).name('Scale');

        //Button to select the camera
        this.gui.add(this.scene, 'selectedCamera', this.scene.cameras).name('Selected View');

        this.initKeys();

        return true;
    }

    /**
     * initKeys
     */
    initKeys() {
        this.scene.gui=this;
        this.processKeyboard=function(){};
        this.activeKeys={};
    }

    processKeyDown(event) {
        this.activeKeys[event.code]=true;
    };

    processKeyUp(event) {
        this.activeKeys[event.code]=false;
    };

    isKeyPressed(keyCode) {
        return this.activeKeys[keyCode] || false;
    }
}
