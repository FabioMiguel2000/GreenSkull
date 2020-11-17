/**
 * MyDefbarrel
 * @constructor
 * @param scene - Reference to MyScene object
 * @param base - Radius of the bases
 * @param middle - Radius in the middle of the barrel
 * @param height - Height of the barrel
 * @param slices - number of lateral divisions
 * @param stacks - number of height divisions
 */
class MyDefbarrel extends CGFobject {
    constructor(scene, base, middle, height, slices, stacks){
        super(scene);

        //Since each surface is half of the cilinder, slices need to be an even number
        if(slices < 2 || slices % 2 != 0){
            console.log("Slices needs to be a positive even number!");
            return;
        }

        this.base = base;
        this.middle = middle;
        this.height = height;
        this.slices = slices;
        this.stacks = stacks;

        this.initBuffers();
    }

    initBuffers(){
        var Sur1CP = [];

        var Sur1BottomPoints = [];
        Sur1BottomPoints.push([this.base, 0, 0, 1]);
        Sur1BottomPoints.push([this.base, (4/3) * this.base, 0, 1]);
        Sur1BottomPoints.push([-this.base, -(4/3) * this.base, 0, 1]);
        Sur1BottomPoints.push([-this.base, 0, 0, 1]);

        var Sur1MidPoints = [];
        Sur1MidPoints.push([this.mid, 0, this.height/2, 1]);
        Sur1MidPoints.push([this.mid, (4/3) * this.mid, this.height/2, 1]);
    }
}