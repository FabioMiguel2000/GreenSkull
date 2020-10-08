/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 * @param x1 - x coordinate corner 1
 * @param y1 - y coordinate corner 1
 * @param x2 - x coordinate corner 2
 * @param y2 - y coordinate corner 2
 * @param x3 - x coordinate corner 3
 * @param y3 - y coordinate corner 3
 */
class MyTriangle extends CGFobject {
	constructor(scene, x1, y1, x2, y2, x3, y3) {
		super(scene);
		this.x1 = x1;
        this.x2 = x2;
        this.x3 = x3;
		this.y1 = y1;
        this.y2 = y2;
        this.y3 = y3;

		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
            this.x1, this.y1, 0,
            this.x2, this.y2, 0,
            this.x3, this.y3, 0,
        ];

        this.indices = [0, 1, 2];

        this.normals = [
			0, 0, 1,
			0, 0, 1,
            0, 0, 1
        ]

        var a = Math.sqrt(Math.pow(this.x1 - this.x2, 2) + Math.pow(this.y1 - this.y2, 2));
        var b = Math.sqrt(Math.pow(this.x2 - this.x3, 2) + Math.pow(this.y2 - this.y3, 2));
        var c = Math.sqrt(Math.pow(this.x1 - this.x3, 2) + Math.pow(this.y1 - this.y3, 2));

        this.texCoords = [
            0, 0,
            0, 1,
            (Math.pow(a, 2) - Math.pow(b, 2) + Math.pow(c, 2))/2*Math.pow(a, 2), 1
        ]

        this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
    }
}