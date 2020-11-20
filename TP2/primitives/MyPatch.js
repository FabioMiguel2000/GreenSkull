/**
 * MyPatch
 * @constructor
 * @param scene - Reference to MyScene object
 * @param divU - Number of divisions in U direction
 * @param divV - Number of divisions in V direction
 * @param degreeU - Degree of the curve in U direction
 * @param degreeV - Degree of the curve in V direction
 * @param cp - Array with the control points of the surface
 */

class MyPatch extends CGFobject {
    constructor(scene, divU, divV, degreeU, degreeV, cp){
        super(scene);

        if(divU < 1 || divV < 1 || divU % 1 != 0 || divV % 1 != 0){
            console.log("The number of divisions has to be a positive integer");
            return;
        }

        if(degreeU < 1 || degreeV < 1 || degreeU % 1 != 0 || degreeV % 1 != 0){
            console.log("The degree has to be a positive integer");
            return;
        }

        this.divU = divU;
        this.divV = divV;
        this.degreeU = degreeU;
        this.degreeV = degreeV;
        this.cp = cp;

        this.initBuffers();
    }

    initBuffers(){
        var controlPoints = [];

        for(var i = 0; i <= this.degreeU; i++){
            var uPoints = [];

            for(var j = 0; j <= this.degreeV; j++){
                var cpNr = i * (this.degreeV + 1) + j;

                uPoints.push([this.cp[cpNr][0], this.cp[cpNr][1], this.cp[cpNr][2], 1]);
            }
            controlPoints.push(uPoints);
        }

        var patchSur = new CGFnurbsSurface(this.degreeU, this.degreeV, controlPoints);

        this.patch = new CGFnurbsObject(this.scene, this.divU, this.divV, patchSur);
    }

    display(){
        this.patch.display();
    }
}
