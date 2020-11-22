/**
 * MyKeyframeAnimation
 * @constructor
 * @param keyframes - Array of the keyframes of the animation
 */
class MyKeyframeAnimation extends MyAnimation{
    constructor(scene, keyframes){
        super(scene);
        
        this.keyframes = keyframes;
        this.keyframeNr = keyframes.length;
        this.start = keyframes[0].instant;
        this.end = keyframes[this.keyframeNr - 1].instant;
        this.i = 0;
        this.prevKeyframe = keyframes[this.i];
        this.nextKeyframe = keyframes[this.i+1];

        this.transfMatrix = mat4.create();

        this.time = 0;

    }

    update(elapsedTime){
        this.time = this.time + elapsedTime;

        if((this.time >= this.start) && (this.time <= this.end)){
            if(this.time > this.nextKeyframe.instant){
                this.i++;
                this.prevKeyframe = this.nextKeyframe;
                this.nextKeyframe = this.keyframes[this.i+1];
            }

            this.transfMatrix = mat4.create();
            
            var timeFrac = (this.time - this.prevKeyframe.instant)/(this.nextKeyframe.instant - this.prevKeyframe.instant);

            /*translate*/
            var prevTranslate = this.prevKeyframe.translate;
            var nextTranslate = this.nextKeyframe.translate;

            var currentX = prevTranslate[0] + timeFrac * (nextTranslate[0] - prevTranslate[0]);
            var currentY = prevTranslate[1] + timeFrac * (nextTranslate[1] - prevTranslate[1]);
            var currentZ = prevTranslate[2] + timeFrac * (nextTranslate[2] - prevTranslate[2]);
            var currentTranslate = [currentX, currentY, currentZ];

            //Sets the transfMatrix to identity and then translates it by currentTranslate
            this.transfMatrix = mat4.translate(this.transfMatrix, this.transfMatrix, currentTranslate);
            /*Rotate*/
            var prevRotate = this.prevKeyframe.rotate;
            var nextRotate = this.nextKeyframe.rotate;

            var currentRotateX = (prevRotate[0] + timeFrac * (nextRotate[0] - prevRotate[0])) * DEGREE_TO_RAD;
            var currentRotateY = (prevRotate[1] + timeFrac * (nextRotate[1] - prevRotate[1])) * DEGREE_TO_RAD;
            var currentRotateZ = (prevRotate[2] + timeFrac * (nextRotate[2] - prevRotate[2])) * DEGREE_TO_RAD;

            this.transfMatrix = mat4.rotateX(this.transfMatrix, this.transfMatrix, currentRotateX);
            this.transfMatrix = mat4.rotateY(this.transfMatrix, this.transfMatrix, currentRotateY);
            this.transfMatrix = mat4.rotateZ(this.transfMatrix, this.transfMatrix, currentRotateZ);

            /*Scale*/
            var prevScale = this.prevKeyframe.scale;
            var nextScale = this.nextKeyframe.scale;

            var currentScaleX = prevScale[0] + timeFrac * (nextScale[0] - prevScale[0]);
            var currentScaleY = prevScale[1] + timeFrac * (nextScale[1] - prevScale[1]);
            var currentScaleZ = prevScale[2] + timeFrac * (nextScale[2] - prevScale[2]);
            var currentScale = [currentScaleX, currentScaleY, currentScaleZ];

            this.transfMatrix = mat4.scale(this.transfMatrix, this.transfMatrix, currentScale);
        }
    }

    apply(){
        this.scene.multMatrix(this.transfMatrix);
    }
}
