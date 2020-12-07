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
        var hPb = (4/3) * this.base;
        var hQm = (4/3) * (this.middle - this.base);
        var hPm = (4/3) * (this.base + hQm);

        //console.log(hQm);

        var Sur1CP = [];

        var Sur1Q1 = [];
        Sur1Q1.push([-this.base, 0, 0, 1]);
        Sur1Q1.push([-this.base, hPb, 0, 1]);
        Sur1Q1.push([this.base, hPb, 0, 1]);
        Sur1Q1.push([this.base, 0, 0, 1]);
        Sur1CP.push(Sur1Q1);

        var Sur1Q2 = [];
        Sur1Q2.push([-this.base - hQm, 0, this.height/3, 1]);
        Sur1Q2.push([-this.base - hQm, hPm, this.height/3, 1]);
        Sur1Q2.push([this.base + hQm, hPm, this.height/3, 1]);
        Sur1Q2.push([this.base + hQm, 0, this.height/3, 1]);
        Sur1CP.push(Sur1Q2);

        var Sur1Q3 = [];
        Sur1Q3.push([-this.base - hQm, 0, this.height * 2/3, 1]);
        Sur1Q3.push([-this.base - hQm, hPm, this.height * 2/3, 1]);
        Sur1Q3.push([this.base + hQm, hPm, this.height * 2/3, 1]);
        Sur1Q3.push([this.base + hQm, 0, this.height * 2/3, 1]);
        Sur1CP.push(Sur1Q3);

        var Sur1Q4 = [];
        Sur1Q4.push([-this.base, 0, this.height, 1]);
        Sur1Q4.push([-this.base, hPb, this.height, 1]);
        Sur1Q4.push([this.base, hPb, this.height, 1]);
        Sur1Q4.push([this.base, 0, this.height, 1]);
        Sur1CP.push(Sur1Q4);

        //console.log(Sur1CP);

        //Creates the first half of the barrel
        var Sur1 = new CGFnurbsSurface(3, 3, Sur1CP);
        this.barrelTopHalf = new CGFnurbsObject(this.scene, this.stacks, this.slices/2, Sur1);

        var Sur2CP = [];

        var Sur2Q1 = [];
        Sur2Q1.push([this.base, 0, 0, 1]);
        Sur2Q1.push([this.base, -hPb, 0, 1]);
        Sur2Q1.push([-this.base, -hPb, 0, 1]);
        Sur2Q1.push([-this.base, 0, 0, 1]);
        Sur2CP.push(Sur2Q1);

        var Sur2Q2 = [];
        Sur2Q2.push([this.base + hQm, 0, this.height/3, 1]);
        Sur2Q2.push([this.base + hQm, -hPm, this.height/3, 1]);
        Sur2Q2.push([-this.base - hQm, -hPm, this.height/3, 1]);
        Sur2Q2.push([-this.base - hQm, 0, this.height/3, 1]);
        Sur2CP.push(Sur2Q2);

        var Sur2Q3 = [];
        Sur2Q3.push([this.base + hQm, 0, this.height * 2/3, 1]);
        Sur2Q3.push([this.base + hQm, -hPm, this.height * 2/3, 1]);
        Sur2Q3.push([-this.base - hQm, -hPm, this.height * 2/3, 1]);
        Sur2Q3.push([-this.base - hQm, 0, this.height * 2/3, 1]);
        Sur2CP.push(Sur2Q3);

        var Sur2Q4 = [];
        Sur2Q4.push([this.base, 0, this.height, 1]);
        Sur2Q4.push([this.base, -hPb, this.height, 1]);
        Sur2Q4.push([-this.base, -hPb, this.height, 1]);
        Sur2Q4.push([-this.base, 0, this.height, 1]);
        Sur2CP.push(Sur2Q4);

        //console.log(Sur2CP);

        //Creates the first half of the barrel
        var Sur2 = new CGFnurbsSurface(3, 3, Sur2CP);
        this.barrelBottomHalf = new CGFnurbsObject(this.scene, this.stacks, this.slices/2, Sur2);
    }

    display(){
        this.barrelTopHalf.display();
        this.barrelBottomHalf.display();
    }
}
