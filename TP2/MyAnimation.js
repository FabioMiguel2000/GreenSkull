/**
 * MyAnimation
 * @constructor
 * @param object - Object to apply the transformation to
 * @param start - Time when the animation starts
 * @param startTransf - Transformation matrix when the animation starts
 * @param end - Time when the animation ends
 * @param endTransf - Transformation matrix when the animation ends
 */
abstract class MyAnimation{
    constructor(object, start, startTransf, end, endTransf){
        this.object = object;
        this.start = start;
        this.startTransf = startTransf;
        this.end = end;
        this.endTransf = endTransf;

        this.transfMatrix = mat4.create();
    }

    update(time){
        if(time >= start && time <= end){
            var timeFrac = (time - start) / (end - start);
            
            //Fazer com que o currentTranslate, currentRotate e currentScale sejam um intermédio entre 
            //startTransf e endTransf conforme o tempo passado em update
        }
    }
}
