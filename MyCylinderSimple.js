/**
 * MyCylinderSimple (like MyCilinder but it doesn't use stacks and it works well)
 * @constructor
 * @param scene - Reference to MyScene object
 * @param bottomRadius - Radius of the bottom base
 * @param topRadius - Radius of the top base
 * @param height - Height of the cilinder
 * @param slices - number of lateral divisions
 */
class MyCylinderSimple extends CGFobject {
    constructor(scene, bottomRadius, topRadius, height, slices){
        super(scene);

        this.bottomRadius = bottomRadius;
        this.topRadius = topRadius;
        this.height = height;
        this.slices = slices;

        this.initBuffers();
    }

    initBuffers(){
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var angVar = 2*Math.PI/this.slices;

        var currentAng = 0;

        //Number of vertexes per edge
        //Temp value
        var edgeVerts = 2;

        this.vertices.push(0, this.bottomRadius, 0);
        this.vertices.push(0, this.topRadius, this.height);

        this.normals.push(0, this.bottomRadius, 0);
        this.normals.push(0, this.topRadius, 0);

        this.texCoords.push(0, 1);
        this.texCoords.push(0, 0);

        currentAng += angVar;

        for(var i = 0; i < this.slices; i++){

            var sa=Math.sin(currentAng);
            var ca=Math.cos(currentAng);

            this.vertices.push(this.bottomRadius*-sa, this.bottomRadius*ca, 0);//1
            this.vertices.push(this.topRadius*-sa, this.topRadius*ca, this.height);//2
            
            this.normals.push(-sa, ca, 0);//1
            this.normals.push(-sa, ca, 0);//2
  
            //Texture Coordinates
            this.texCoords.push(i * (1 / this.slices) + 1 / this.slices, 1);
            this.texCoords.push(i * (1 / this.slices) + 1 / this.slices, 0);

            this.indices.push((2*i+2), (2*i+1) , (2*i+0) );
            this.indices.push((2*i+2), (2*i+3) , (2*i+1) );
            

            currentAng += angVar;
        }

        var currentVert = edgeVerts;

        //The bottom base is made
        while(currentVert + edgeVerts < this.vertices.length){
            this.indices.push(currentVert, 0, currentVert + edgeVerts);
            currentVert += edgeVerts;
        }

        currentVert = 3;

        //The top base is made
        while(currentVert + edgeVerts < this.vertices.length){
            this.indices.push(1, currentVert, currentVert + edgeVerts);
            currentVert += edgeVerts;
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