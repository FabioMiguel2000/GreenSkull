attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float sizeM;
uniform float sizeN;
uniform float ax;
uniform float ay;


varying vec2 vTextureCoord;

void main(){
	
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);

    vTextureCoord = aTextureCoord;

    vTextureCoord[0] = (vTextureCoord[0]/sizeM) + ax;

    vTextureCoord[1] = (vTextureCoord[1]/sizeN) + ay;


	
}
