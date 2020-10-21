/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTriangle extends CGFobject {
	constructor(scene,x1, y1, x2, y2, x3, y3) {
		super(scene);
        this.xCoordinates = [x1, x2, x3];
        this.yCoordinates = [y1, y2, y3];

		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
			this.xCoordinates[0], this.yCoordinates[0], 0,	//0
			this.xCoordinates[1], this.yCoordinates[1], 0,	//1
			this.xCoordinates[2], this.yCoordinates[2], 0,	//2

			this.xCoordinates[0], this.yCoordinates[0], 0,	//0
			this.xCoordinates[1], this.yCoordinates[1], 0,	//1
			this.xCoordinates[2], this.yCoordinates[2], 0,	//2
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,

			0, 0, -1,
			0, 0, -1,
			0, 0, -1

		]

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			2, 1, 0,

			0, 1, 2,
			2, 1, 0
		];

		this.texCoords = [
			0, 0.5,
			0, 1,
			0.5, 1,

			0, 0.5,
			0, 1,
			0.5, 1
		]

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}