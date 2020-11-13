#ifdef GL_ES
precision highp float;
#endif

uniform vec2 dimensions;
uniform vec2 spritePos;
uniform sampler2D uSampler;

varying vec2 vTextureCoord;
varying vec2 spriteCoords

void main() {
	spriteCoords = [(vTextureCoord[0] + spritePos[0])/dimensions[0], (vTextureCoord[1] + spritePos[1])/dimensions[1]];
	gl_FragColor = texture2D(uSampler, vTextureCoord);
}
