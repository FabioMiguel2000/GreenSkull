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
class MyCylinder extends CGFObject {
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

        //Number of vertexes per edge
        var edgeVerts = this.stacks + 1;

        //First edge of the cilinder is made; no triangles are drawn since you need more points to make them
        for(var i = 0; i <= this.stacks; i++){            

            this.vertices.push(0, currentRad, currentHeight);
            this.normals.push(0, 1, 0);
            this.texCoords.push(currentXCoord, currentYCoord);

            currentHeight += heightVar;
            currentRad += radVar;
            currentYCoord += yCoordVar;
        }

        //The rest of the cilinder is made
        //Slices loop
        for(var j = 0; j < this.slices; j++){

            currentAng += angVar;
            currentXCoord += xCoordVar;
            currentHeight = 0;
            currentRad = this.bottomRadius;
            currentYCoord = 0;
            
            var sinA = Math.sin(currentAng);
            var cosA = Math.sin(currentAng);

            this.vertices.push(currentRad * -sinA, currentRad * cosA, currentHeight);
            this.normals.push(-sinA, cosA, 0);
            this.texCoords.push(currentXCoord, currentYCoord);

            //Stacks loop
            for(var k = 0; k < this.stacks; k++){
                currentHeight += heightVar;
                currentRad += radVar;
                currentYCoord += yCoordVar;

                this.vertices.push(currentRad * -sinA, currentRad * cosA, currentHeight);
                this.normals.push(-sinA, cosA, 0);
                this.texCoords.push(currentXCoord, currentYCoord);
                
                //A rectangle that's part of the cilinder is drawn
                this.indices.push(edgeVerts * (j + 1) + k, edgeVerts * j + k, edgeVerts * i + k + 1);
                this.indices.push(edgeVerts * (j + 1) + k, edgeVerts * j + k, edgeVerts * i + k + 1);
            }

            currentAng += angVar;
            currentXCoord += xCoordVar;
            currentHeight = 0;
            currentRad = this.bottomRadius;
            currentYCoord = 0;
        }

       var currentVert = edgeVerts;

        //The bottom base is made
        while(currentVert + edgeVerts < this.vertices.length){
            this.indices.push(0, currentVert, currentVert + edgeVerts);
            currentVert += edgeVerts;
        }

        currentVert = edgeVerts + this.stacks;

        //The top base is made
        while(currentVert + edgeVerts < this.vertices.length){
            this.indices.push(this.stacks, currentVert, currentVert + edgeVerts);
            currentVert += edgeVerts;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
