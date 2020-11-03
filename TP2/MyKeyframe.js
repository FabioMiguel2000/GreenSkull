/**
 * MyKeyframe
 * @constructor
 * @param instant - Instant when the object is in the state described by keyframe
 * @param translate - Translate vector for this instant
 * @param rotate - Rotation vector for this instant
 * @param scale - Scale vector for this instant
 */
class MyKeyframe{
    constructor(instant, translate, rotate, scale){
        this.instant = instant;
        this.translate = translate;
        this.rotate = rotate;
        this.scale = scale;
    }
}