/**
 * MyNode
 * @constructor
 */
class MyNode{
    constructor(sceneGraph, nodeID){
        this.sceneGraph = sceneGraph;
        this.nodeID = nodeID;
        this.transMatrix = mat4.create();
        this.textureID = null;
        this.materialID = null;
        this.children = [];
        this.leaves = [];

    }

    pushChildren(childID){
        this.children.push(childID);
    }

    pushLeaf(leaf){
        this.leaves.push(leaf);
    }

    setTexture(textureID){
        this.textureID = textureID;
    }

    setMaterial(materialID){
        this.materialID = materialID;
    }

    setTrasMatrix(transMatrix){
        this.transMatrix = transMatrix;
    }

}

