/**
 * MyNode
 * @constructor
 */
class MyNode{
    constructor(scene, nodeID){
        super(scene);
        this.nodeID = nodeID;
        this.transMatrix = mat4.create();
        this.textureID = null;
        this.materialID = null;
        this.childrens = [];
        this.leaves = [];

    }

    pushChildren(childrenID){
        this.childrens.push(childrenID);
    }

    pushLeaf(leaf){
        this.leaves.push(leaf);
    }


}

