class MyTorus extends CGFobject {
    /**
     * @method constructor
     * @param  {CGFscene} scene - MyScene object
     * @param  {integer} inner - inner side radius of the torus
     * @param  {integer} outer - outer side radius of the torus
     * @param  {integer} slices - around inner side radius
     * @param  {integer} loops - loops around the circular axis
     */
    constructor(scene, inner, outer, slices, loops) {
        super(scene);
        this.inner = inner;
        this.outer = outer;
        this.slices = slices;
        this.loops = loops;
        this.initBuffers();

    }

    initBuffers() {

        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var phi = 0;
        var theta = 0;
        var phiInc = (2 * Math.PI) / this.stacks;
        var thetaInc = (2 * Math.PI) / this.slices;
        var latVertices = this.longDivs + 1;
        var currentT = 0;         //Vertical
        var currentS = 0;         //Horizontal
        var incrementT = 1 / this.latDivs;
        var incrementS = 1 / this.longDivs;

        for (let latitude = 0; latitude <= this.stacks; latitude++) {
            var sinPhi = Math.sin(phi);
            var cosPhi = Math.cos(phi);

            theta = 0;
            currentS = 0;
            for (let longitude = 0; longitude <= this.slices; longitude++) {
                var cosTheta = Math.cos(theta);
                var sinTheta = Math.sin(theta);
                var x = (this.radius + (this.radius * cosPhi))*cosTheta;
                var y = (this.radius + (this.radius * cosPhi))*sinTheta;
                var z = this.radius * sinPhi;
                this.vertices.push(x, y, z);


                //--- Normals
                this.normals.push(x, y, z);
                theta += thetaInc;

                //--- Texture Coordinates
                this.texCoords.push(currentS, currentT);
                currentS += incrementS;
                // May need some additional code also in the beginning of the function.

            }
            currentT += incrementT;
            phi += phiInc;
        }
        for (let latitude = 0; latitude < this.stacks; latitude++) {
            for (let longitude = 0; longitude < this.slices; longitude++) {
                var first = (latitude * (this.slices + 1)) + longitude;
                var second = first + this.slices + 1;
    
                this.indices.push(first, second + 1, second);
                this.indices.push(first, first + 1, second + 1);
            }
        }
        
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

}
