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
		this.xCoordinates = [x1, x2, x3];
        this.yCoordinates = [y1, y2, y3];

		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
            this.xCoordinates[0], this.yCoordinates[0], 0,
			this.xCoordinates[1], this.yCoordinates[1], 0,	
			this.xCoordinates[2], this.yCoordinates[2], 0,
			this.xCoordinates[0], this.yCoordinates[0], 0,
			this.xCoordinates[1], this.yCoordinates[1], 0,
			this.xCoordinates[2], this.yCoordinates[2], 0
        ];

        this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,

			0, 0, -1,
			0, 0, -1,
			0, 0, -1
        ]

        this.indices = [
            0, 1, 2,
            4, 3, 5
        ]


        var a = Math.sqrt(Math.pow(this.x1 - this.x2, 2) + Math.pow(this.y1 - this.y2, 2));
        var b = Math.sqrt(Math.pow(this.x2 - this.x3, 2) + Math.pow(this.y2 - this.y3, 2));
        var c = Math.sqrt(Math.pow(this.x1 - this.x3, 2) + Math.pow(this.y1 - this.y3, 2));

        this.texCoords = [
            0, 0,
            0, 1,
            (Math.pow(a, 2) - Math.pow(b, 2) + Math.pow(c, 2))/2*Math.pow(a, 2), 1,
            0, 0,
            0, 1,
            (Math.pow(a, 2) - Math.pow(b, 2) + Math.pow(c, 2))/2*Math.pow(a, 2), 1
        ]

        this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
    }
}
