const DEGREE_TO_RAD = Math.PI / 180;

/**
 * MyKeyframeAnimation
 * @constructor
 * @param object - Object to apply the transformation to
 * @param keyframes - Array of the keyframes of the animation
 */
class MyKeyframeAnimation extends MyAnimation{
    constructor(keyframes){
        super();

        this.keyframes = keyframes;
        this.keyframeNr = keyframes.length;
        this.start = keyframes[0].instant;
        this.end = keyframes[this.keyframeNr - 1].instant;
        this.i = 0;
        this.prevKeyframe = keyframes[i];
        this.nextKeyframe = keyframes[i+1];
        

        this.transfMatrix = mat4.create();
    }

    update(time){
        if((time >= this.start) && (time <= this.end)){
            if(time > this.nextKeyframe.instant){
                i++;
                this.prevKeyframe = this.nextKeyframe;
                this.nextKeyframe = this.keyframes[i+1];
            }
            
            var timeFrac = (time - this.prevKeyframe.instant)/(this.nextKeyframe.instant - this.prevKeyframe.instant);

            var prevTranslate = this.prevKeyframe.translate;
            var nextTranslate = this.nextKeyframe.translate;

            var currentTranslate = prevTranslate + timeFrac * (nextTranslate - prevTranslate);

            console.log(currentTranslate);

            //Sets the transfMatrix to identity and then translates it by currentTranslate
            mat4.fromTranslation(this.transfMatrix, currentTranslate);

            var prevRotate = this.prevKeyframe.rotate;
            var nextRotate = this.nextKeyframe.rotate;

            var currentRotateX = (prevRotate[0] + timeFrac * (nextRotate[0] - prevRotate[0])) * DEGREE_TO_RAD;
            var currentRotateY = (prevRotate[1] + timeFrac * (nextRotate[1] - prevRotate[1])) * DEGREE_TO_RAD;
            var currentRotateZ = (prevRotate[2] + timeFrac * (nextRotate[2] - prevRotate[2])) * DEGREE_TO_RAD;

            mat4.rotateX(this.transfMatrix, this.transfMatrix, currentRotateX);
            mat4.rotateY(this.transfMatrix, this.transfMatrix, currentRotateY);
            mat4.rotateZ(this.transfMatrix, this.transfMatrix, currentRotateZ);

            var prevScale = this.prevKeyframe.scale;
            var nextScale = this.nextKeyframe.scale;

            var currentScale = prevScale + timeFrac * (nextScale - prevScale);

            mat4.scale(this.transfMatrix, this.transfMatrix, currentScale);
        }
    }

    apply(scene){
        scene.pushMatrix(this.transfMatrix * scene.transfMatrix);
    }
}
