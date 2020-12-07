/**
 * MyKey
 * @constructor
 * @param  - Array of the keyframes of the animation
 */

class MyKey{
    constructor(instant, translate, rotate, scale){
        this.instant = instant;
        this.rotate = rotate;
        this.translate = translate;
        this.scale = scale;
    }
    getInstant(){
        return this.instant;
    }
    getRotate(){
        return this.rotate;
    }
    getTranslate(){
        return this.translate;
    }
    getScale(){
        return this.scale;
    }
    setInstant(instant){
        this.instant = instant;
    }
    setRotate(rotate){
        this.rotate = rotate;
    }
    setTranslate(translate){
        this.translate = translate;
    }
    setScale(scale){
        this.scale = scale;
    }
}