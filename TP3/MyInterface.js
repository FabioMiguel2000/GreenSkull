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
        //this.gui.add(this.scene, 'enableLights').name("Turn On Lights");
        this.gui.add(this.scene, 'enableAxis').name("Display Axis");
        this.gui.add(this.scene, 'scaleFactor', 0.1, 2.0).name('Scale');
        // add a group of controls (and open/expand by defult)

        this.initKeys();

        return true;
    }

    /**
     * initKeys
     */
    initKeys() {
        this.scene.gui = this;
        this.processKeyboard = function() {};
        this.activeKeys = {};
    }

    processKeyDown(event) {
        this.activeKeys[event.code] = true;
    };

    processKeyUp(event) {
        this.activeKeys[event.code] = false;
    };

    isKeyPressed(keyCode) {
        return this.activeKeys[keyCode] || false;
    }

    addLightsGroup(lights) {
        var group = this.gui.addFolder("Lights");
        group.open();

        // add two check boxes to the group. The identifiers must be members variables of the scene initialized in scene.init as boolean
        // e.g. this.option1=true; this.option2=false;

        for (var key in lights) {
            if (lights.hasOwnProperty(key)) {
                this.scene.lightValues[key] = lights[key][0];
                group.add(this.scene.lightValues, key);
            }
        }
    }
    initGameOptions() {
        var group = this.gui.addFolder("Options");
        group.open();

        group.add(this.scene, 'startGame').name('Start Game');
        group.add(this.scene, 'undo').name('Undo Move');
        group.add(this.scene, 'endGame').name('End Game');


    }

    /*initCameras() {
        this.gui.add(this.scene, 'selectedCamera', Object.keys(this.scene.cameras)).name('Selected Camera').onChange(this.scene.setActiveCamera.bind(this.scene));
    }*/
}