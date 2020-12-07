/**
 * MyPlane
 * @constructor
 * @param scene - Reference to MyScene object
 * @param divU - Number of divisions in U direction
 * @param divV - Number of divisions in V direction
 */

class MyPlane extends CGFobject {
    constructor(scene, divU, divV){
        super(scene);

        if(divU < 1 || divV < 1 || divU % 1 != 0 || divV % 1 != 0){
            console.log("The number of divisions has to be a positive integer");
            return;
        }

        this.divU = divU;
        this.divV = divV;

        this.initBuffers();
    }

    initBuffers(){
        var controlPoints = [];
        var U0Points = [];
        var U1Points = [];

        U0Points.push([0.0, 0.0, 0.0, 1 ]);
        U0Points.push([1.0, 0.0, 0.0, 1 ]);
        controlPoints.push(U0Points);

        U1Points.push([0.0, 0.0, 1.0, 1 ]);
        U1Points.push([1.0, 0.0, 1.0, 1 ]);
        controlPoints.push(U1Points);

        var planeSur = new CGFnurbsSurface(1, 1, controlPoints);

        this.plane = new CGFnurbsObject(this.scene, this.divU, this.divV, planeSur);
    }

    display(){
        this.plane.display();
    }
}
