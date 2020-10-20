/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 * @param bottomRadius - Radius of the bottom base
 * @param topRadius - Radius of the top base
 * @param height - Height of the cilinder
 * @param slices - number of lateral divisions
 * @param stacks - number of height divisions
 */
class MyCylinder extends CGFobject {
    constructor(scene, bottomRadius, topRadius, height, slices, stacks){
        super(scene);

        this.bottomRadius = bottomRadius;
        this.topRadius = topRadius;
        this.height = height;
        this.slices = slices;
        this.stacks = stacks;

        this.initBuffers();
    }

    initBuffers(){
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var angVar = 2*Math.PI/this.slices;
        var heightVar = this.height/this.stacks;
        var radVar = (this.topRadius - this.bottomRadius)/this.stacks;
        var yCoordVar = 1/this.stacks;
        var xCoordVar = 1/this.slices;

        var currentAng = 0;
        var currentHeight = 0;
        var currentRad = this.bottomRadius;
        var currentYCoord = 0;
        var currentXCoord = 0;

        //Number of vertexes per heigth division
        var divVerts = this.slices + 1;

        //Vertexes are defines
        for(var i = 0; i <= this.stacks; i++){

            for(var j = 0; j <= this.slices; j++){

                var normX = -Math.sin(currentAng);
                var normY = Math.cos(currentAng);

                this.vertices.push(currentRad * normX, currentRad * normY, currentHeight);
                this.normals.push(normX, normY, 0);
                this.texCoords.push(currentXCoord, currentYCoord);

                currentAng += angVar;
                currentXCoord += xCoordVar;
            }

            currentAng = 0;
            currentXCoord = 0;
            currentHeight += heightVar;
            currentRad += radVar;
            currentYCoord += yCoordVar;
        }

        var finalDiv = divVerts * this.stacks;

        //The bases are made
        for(var b = 2; b < divVerts; b++){
            this.indices.push(b - 1, 0, b);
            this.indices.push(finalDiv, b - 1 + finalDiv, b + finalDiv);
        }

        //The side faces are drawn
        for(var e = 0; e < this.stacks; e++){
            for(var f = 0; f < this.slices; f++){
                this.indices.push(divVerts * e + f, divVerts * e + f + 1, divVerts * (e + 1) + f);
                this.indices.push(divVerts * (e + 1) + f + 1, divVerts * (e + 1) + f, divVerts * e + f + 1);
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    /**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the rectangle
	 * @param {Array} coords - Array of texture coordinates
	 */
	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}
