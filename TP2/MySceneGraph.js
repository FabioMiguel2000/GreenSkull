const DEGREE_TO_RAD = Math.PI / 180;

// Order of the groups in the XML document.
var INITIALS_INDEX = 0;
var VIEWS_INDEX = 1;
var ILLUMINATION_INDEX = 2;
var LIGHTS_INDEX = 3;
var TEXTURES_INDEX = 4;
var SPRITESHEET_INDEX = 5;
var MATERIALS_INDEX = 6;
var ANIMATIONS_INDEX = 7;
var NODES_INDEX = 8;

/**
 * MySceneGraph class, representing the scene graph.
 */
class MySceneGraph {
    /**
     * Constructor for MySceneGraph class.
     * Initializes necessary variables and starts the XML file reading process.
     * @param {string} filename - File that defines the 3D scene
     * @param {XMLScene} scene
     */
    constructor(filename, scene) {
        this.loadedOk = null;

        // Establish bidirectional references between scene and graph.
        this.scene = scene;
        scene.graph = this;

        this.nodes = [];

        this.idRoot = "Root"; // The id of the root element.

        this.axisCoords = [];
        this.axisCoords['x'] = [1, 0, 0];
        this.axisCoords['y'] = [0, 1, 0];
        this.axisCoords['z'] = [0, 0, 1];

        // File reading 
        this.reader = new CGFXMLreader();

        /*
         * Read the contents of the xml file, and refer to this class for loading and error handlers.
         * After the file is read, the reader calls onXMLReady on this object.
         * If any error occurs, the reader calls onXMLError on this object, with an error message
         */
        this.reader.open('scenes/' + filename, this);
    }

    /*
     * Callback to be executed after successful reading
     */
    onXMLReady() {
        this.log("XML Loading finished.");
        var rootElement = this.reader.xmlDoc.documentElement;

        // Here should go the calls for different functions to parse the various blocks
        var error = this.parseXMLFile(rootElement);

        if (error != null) {
            this.onXMLError(error);
            return;
        }

        this.loadedOk = true;

        // As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
        this.scene.onGraphLoaded();
    }

    /*
     * Callback to be executed on any read error, showing an error on the console.
     * @param {string} message
     */
    onXMLError(message) {
        console.error("XML Loading Error: " + message);
        this.loadedOk = false;
    }

    /**
     * Callback to be executed on any minor error, showing a warning on the console.
     * @param {string} message
     */
    onXMLMinorError(message) {
        console.warn("Warning: " + message);
    }

    /**
     * Callback to be executed on any message.
     * @param {string} message
     */
    log(message) {
        console.log("   " + message);
    }

    /**
     * Parses the XML file, processing each block.
     * @param {XML root element} rootElement
     */
    parseXMLFile(rootElement) {
        if (rootElement.nodeName != "lsf")
            return "root tag <lsf> missing";

        var nodes = rootElement.children;

        // Reads the names of the nodes to an auxiliary buffer.
        var nodeNames = [];

        for (var i = 0; i < nodes.length; i++) {
            nodeNames.push(nodes[i].nodeName);
        }

        var error;

        // Processes each node, verifying errors.

        console.log(nodeNames[0]);

        // <initials>
        var index;
        if ((index = nodeNames.indexOf("initials")) == -1) {
            return "tag <initials> missing";
        } else {
            if (index != INITIALS_INDEX) {
                this.onXMLMinorError("tag <initials> out of order " + index);
            }

            //Parse initials block
            if ((error = this.parseInitials(nodes[index])) != null)
                return error;
        }

        // <views>
        if ((index = nodeNames.indexOf("views")) == -1)
            return "tag <views> missing";
        else {
            if (index != VIEWS_INDEX)
                this.onXMLMinorError("tag <views> out of order");

            //Parse views block
            if ((error = this.parseViews(nodes[index])) != null)
                return error;
        }

        // <illumination>
        if ((index = nodeNames.indexOf("illumination")) == -1)
            return "tag <illumination> missing";
        else {
            if (index != ILLUMINATION_INDEX)
                this.onXMLMinorError("tag <illumination> out of order");

            //Parse illumination block
            if ((error = this.parseIllumination(nodes[index])) != null)
                return error;
        }

        // <lights>
        if ((index = nodeNames.indexOf("lights")) == -1)
            return "tag <lights> missing";
        else {
            if (index != LIGHTS_INDEX)
                this.onXMLMinorError("tag <lights> out of order");

            //Parse lights block
            if ((error = this.parseLights(nodes[index])) != null)
                return error;
        }
        // <textures>
        if ((index = nodeNames.indexOf("textures")) == -1)
            return "tag <textures> missing";
        else {
            if (index != TEXTURES_INDEX)
                this.onXMLMinorError("tag <textures> out of order");

            //Parse textures block
            if ((error = this.parseTextures(nodes[index])) != null)
                return error;
        }

        // <spritesheets>
        if ((index = nodeNames.indexOf("spritesheets")) == -1)
            return "tag <spritesheets> missing";
        else {
            if (index != SPRITESHEET_INDEX)
                this.onXMLMinorError("tag <spritesheets> out of order");

            //Parse spriesheets block
            if ((error = this.parseSpritesheets(nodes[index])) != null)
                return error;
        }

        // <materials>
        if ((index = nodeNames.indexOf("materials")) == -1)
            return "tag <materials> missing";
        else {
            if (index != MATERIALS_INDEX)
                this.onXMLMinorError("tag <materials> out of order");

            //Parse materials block
            if ((error = this.parseMaterials(nodes[index])) != null)
                return error;
        }

        //  <animations>
        if ((index = nodeNames.indexOf("animations")) == -1) {
            return "tag <animations> missing";
        } else {
            if (index != ANIMATIONS_INDEX)
                this.onXMLMinorError("tag <animations> out of order");
            //Parse animations block
            if ((error = this.parseAnimations(nodes[index])) != null)
                return error;
        }

        // <nodes>
        if ((index = nodeNames.indexOf("nodes")) == -1)
            return "tag <nodes> missing";
        else {
            if (index != NODES_INDEX)
                this.onXMLMinorError("tag <nodes> out of order");

            //Parse nodes block
            if ((error = this.parseNodes(nodes[index])) != null)
                return error;
        }
        this.log("all parsed");
    }

    /**
     * Parses the <initials> block. 
     * @param {initials block element} initialsNode
     */
    parseInitials(initialsNode) {
        var children = initialsNode.children;
        var nodeNames = [];

        for (var i = 0; i < children.length; i++)
            nodeNames.push(children[i].nodeName);

        var rootIndex = nodeNames.indexOf("root");
        var referenceIndex = nodeNames.indexOf("reference");

        // Get root of the scene.
        if (rootIndex == -1)
            return "No root id defined for scene.";

        var rootNode = children[rootIndex];
        var id = this.reader.getString(rootNode, 'id');
        if (id == null)
            return "No root id defined for scene.";

        this.idRoot = id;

        // Get axis length        
        if (referenceIndex == -1)
            this.onXMLMinorError("no axis_length defined for scene; assuming 'length = 1'");

        var refNode = children[referenceIndex];
        var axis_length = this.reader.getFloat(refNode, 'length');
        if (axis_length == null)
            this.onXMLMinorError("no axis_length defined for scene; assuming 'length = 1'");

        this.referenceLength = axis_length || 1;

        this.log("Parsed initials");

        return null;
    }

    /**
     * Parses the <views> block.
     * @param {view block element} viewsNode
     */
    parseViews(viewsNode) {
        var children = viewsNode.children;

        this.cameras = [];


        for (var i = 0; i < children.length; i++) {

            if (children[i].nodeName != "perspective" && children[i].nodeName != "ortho") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            var cameraId = this.reader.getString(children[i], 'id');

            if (cameraId == null)
                return "no ID defined for views";

            // Checks for repeated IDs.
            if (this.cameras[cameraId] != null)
                return "ID must be unique for each primitive (conflict: ID = " + viewId + ")";

            var camera;
            var grandChildren;

            // Checks if view is perspective
            if (children[i].nodeName == "perspective") {

                var near = this.reader.getFloat(children[i], 'near');
                var far = this.reader.getFloat(children[i], 'far');
                var angle = this.reader.getFloat(children[i], 'angle');

                var angleRad = angle * DEGREE_TO_RAD;

                grandChildren = children[i].children;

                // Checks position
                if (grandChildren[0].nodeName != "from")
                    this.onXMLMinorError("unknown tag <" + grandChildren[0].nodeName + ">");

                var fromX = this.reader.getFloat(grandChildren[0], 'x');
                var fromY = this.reader.getFloat(grandChildren[0], 'y');
                var fromZ = this.reader.getFloat(grandChildren[0], 'z');

                // Checks target
                if (grandChildren[1].nodeName != "to")
                    this.onXMLMinorError("unknown tag <" + grandChildren[1].nodeName + ">");

                var toX = this.reader.getFloat(grandChildren[1], 'x');
                var toY = this.reader.getFloat(grandChildren[1], 'y');
                var toZ = this.reader.getFloat(grandChildren[1], 'z');

                camera = new CGFcamera(angleRad, near, far, vec3.fromValues(fromX, fromY, fromZ), vec3.fromValues(toX, toY, toZ)); // Creates camera
            }

            // Checks if view is ortho
            if (children[i].nodeName == "ortho") {
                var near = this.reader.getFloat(children[i], 'near');
                var far = this.reader.getFloat(children[i], 'far');
                var left = this.reader.getFloat(children[i], 'left');
                var right = this.reader.getFloat(children[i], 'right');
                var top = this.reader.getFloat(children[i], 'top');
                var bottom = this.reader.getFloat(children[i], 'bottom');

                grandChildren = children[i].children;

                // Checks position
                if (grandChildren[0].nodeName != "from")
                    this.onXMLMinorError("unknown tag <" + grandChildren[0].nodeName + ">");

                var fromX = this.reader.getFloat(grandChildren[0], 'x');
                var fromY = this.reader.getFloat(grandChildren[0], 'y');
                var fromZ = this.reader.getFloat(grandChildren[0], 'z');

                // Checks target
                if (grandChildren[1].nodeName != "to")
                    this.onXMLMinorError("unknown tag <" + grandChildren[1].nodeName + ">");

                var toX = this.reader.getFloat(grandChildren[1], 'x');
                var toY = this.reader.getFloat(grandChildren[1], 'y');
                var toZ = this.reader.getFloat(grandChildren[1], 'z');

                if (grandChildren[2].nodeName != "up")
                    this.onXMLMinorError("unknown tag <" + grandChildren[2].nodeName + ">");

                var upX = this.reader.getFloat(grandChildren[2], 'x');
                var upY = this.reader.getFloat(grandChildren[2], 'y');
                var upZ = this.reader.getFloat(grandChildren[2], 'z');

                camera = new CGFcameraOrtho(left, right, bottom, top, near, far, vec3.fromValues(fromX, fromY, fromZ), vec3.fromValues(toX, toY, toZ), vec3.fromValues(upX, upY, upZ)); // Creates camera
            }
            this.cameras[cameraId] = camera;

        }
        this.scene.selectedCamera = this.reader.getString(viewsNode, 'default');
        if (!this.cameras[this.scene.selectedCamera]) {
            return this.onXMLError("Default view not found");
        }
        this.log("Parsed views");
        return null;
    }

    /**
     * Parses the <illumination> node.
     * @param {illumination block element} illuminationsNode
     */
    parseIllumination(illuminationsNode) {

        var children = illuminationsNode.children;

        this.ambient = [];
        this.background = [];

        var nodeNames = [];

        for (var i = 0; i < children.length; i++)
            nodeNames.push(children[i].nodeName);

        var ambientIndex = nodeNames.indexOf("ambient");
        var backgroundIndex = nodeNames.indexOf("background");

        var color = this.parseColor(children[ambientIndex], "ambient");
        if (!Array.isArray(color))
            return color;
        else
            this.ambient = color;

        color = this.parseColor(children[backgroundIndex], "background");
        if (!Array.isArray(color))
            return color;
        else
            this.background = color;

        this.log("Parsed Illumination.");

        return null;
    }

    /**
     * Parses the <light> node.
     * @param {lights block element} lightsNode
     */
    parseLights(lightsNode) {
        var children = lightsNode.children;

        this.lights = [];
        var numLights = 0;

        var grandChildren = [];
        var nodeNames = [];

        // Any number of lights.
        for (var i = 0; i < children.length; i++) {

            // Storing light information
            var global = [];
            var attributeNames = [];
            var attributeTypes = [];

            //Check type of light
            if (children[i].nodeName != "light") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            } else {
                attributeNames.push(...["enable", "position", "ambient", "diffuse", "specular"]);
                attributeTypes.push(...["boolean", "position", "color", "color", "color"]);
            }

            // Get id of the current light.
            var lightId = this.reader.getString(children[i], 'id');
            if (lightId == null)
                return "no ID defined for light";

            // Checks for repeated IDs.
            if (this.lights[lightId] != null)
                return "ID must be unique for each light (conflict: ID = " + lightId + ")";

            grandChildren = children[i].children;
            // Specifications for the current light.

            nodeNames = [];
            for (var j = 0; j < grandChildren.length; j++) {
                nodeNames.push(grandChildren[j].nodeName);
            }

            for (var j = 0; j < attributeNames.length; j++) {
                var attributeIndex = nodeNames.indexOf(attributeNames[j]);

                if (attributeIndex != -1) {
                    if (attributeTypes[j] == "boolean")
                        var aux = this.parseBoolean(grandChildren[attributeIndex], "value", "enabled attribute for light of ID" + lightId);
                    else if (attributeTypes[j] == "position")
                        var aux = this.parseCoordinates4D(grandChildren[attributeIndex], "light position for ID" + lightId);
                    else
                        var aux = this.parseColor(grandChildren[attributeIndex], attributeNames[j] + " illumination for ID" + lightId);

                    if (typeof aux === 'string')
                        return aux;

                    global.push(aux);
                } else
                    return "light " + attributeNames[i] + " undefined for ID = " + lightId;
            }
            this.lights[lightId] = global;
            numLights++;
        }

        if (numLights == 0)
            return "at least one light must be defined";
        else if (numLights > 8)
            this.onXMLMinorError("too many lights defined; WebGL imposes a limit of 8 lights");

        this.log("Parsed lights");
        return null;
    }

    /**
     * Parses the <textures> block. 
     * @param {textures block element} texturesNode
     */
    parseTextures(texturesNode) {
            var children = texturesNode.children;

            this.textures = [];

            for (var i = 0; i < children.length; i++) {
                //For each texture in textures block, check ID and file URL
                if (children[i].nodeName != "texture") {
                    this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                    continue;
                }
                var textureId = this.reader.getString(children[i], 'id');
                if (textureId == null)
                    return "no ID defined for texture";

                // Checks for repeated IDs.
                if (this.textures[textureId] != null)
                    return "ID must be unique for each texture (conflict: ID = " + textureId + ")";

                var path = this.reader.getString(children[i], 'path');
                if (path == null)
                    return "no path defined for texture id " + textureId;

                var texture = new CGFtexture(this.scene, path);
                this.textures[textureId] = texture;
            }


            //this.onXMLMinorError("To do: Parse textures.");
            this.log("Parsed textures");
            return null;

        }
        /**
         * Parses the <spritesheets> block. 
         * @param {spritesheets block element} spritesheetsNode
         */
    parseSpritesheets(spritesheetsNode) {
        var children = spritesheetsNode.children;

        this.spritesheets = [];

        for (var i = 0; i < children.length; i++) {
            //For each spritesheet in spritesheets block, check ID and file URL
            if (children[i].nodeName != "spritesheet") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }
            var spritesheetId = this.reader.getString(children[i], 'id');
            if (spritesheetId == null)
                return "no ID defined for spritesheet";
            // Checks for repeated IDs.
            if (this.spritesheets[spritesheetId] != null)
                return "ID must be unique for each spritesheet (conflict: ID = " + spritesheetId + ")";

            var path = this.reader.getString(children[i], 'path');
            if (path == null)
                return "no path defined for spritesheet id " + spritesheetId;

            var sizeM = this.reader.getFloat(children[i], 'sizeM');
            if (sizeM == null)
                return "no sizeM defined for spritesheet id " + spritesheetId;

            var sizeN = this.reader.getFloat(children[i], 'sizeN');
            if (sizeN == null)
                return "no sizeN defined for spritesheet id " + spritesheetId;


            var spritesheet = new MySpriteSheet(this.scene, path, sizeM, sizeN);
            this.spritesheets[spritesheetId] = spritesheet;
            //console.log(spritesheet);
        }


        //this.onXMLMinorError("To do: Parse textures.");
        this.log("Parsed Spritesheet");
        return null;

    }

    /**
     * Parses the <materials> node.
     * @param {materials block element} materialsNode
     */
    parseMaterials(materialsNode) {
        var children = materialsNode.children;

        this.materials = [];

        var grandChildren = [];

        // Any number of materials.
        for (var i = 0; i < children.length; i++) {

            if (children[i].nodeName != "material") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            // Get id of the current material.
            var materialId = this.reader.getString(children[i], 'id');
            if (materialId == null)
                return "no ID defined for material";

            // Checks for repeated IDs.
            if (this.materials[materialId] != null)
                return "ID must be unique for each material (conflict: ID = " + materialId + ")";

            var materialShininess = this.reader.getFloat(children[i], 'shininess');
            if (materialShininess < 0 || materialShininess > 10) {
                return "Material " + materialId + " with shininess value out of range (0 - 10)";
            }
            var material = new CGFappearance(this.scene);
            material.setShininess(materialShininess);

            grandChildren = children[i].children;

            for (var j = 0; j < grandChildren.length; j++) {
                switch (grandChildren[j].nodeName) {
                    case 'emission':
                        var r = this.reader.getFloat(grandChildren[j], 'r');
                        var g = this.reader.getFloat(grandChildren[j], 'g');
                        var b = this.reader.getFloat(grandChildren[j], 'b');
                        var a = this.reader.getFloat(grandChildren[j], 'a');
                        material.setEmission(r, g, b, a);
                        break;
                    case 'ambient':
                        var r = this.reader.getFloat(grandChildren[j], 'r');
                        var g = this.reader.getFloat(grandChildren[j], 'g');
                        var b = this.reader.getFloat(grandChildren[j], 'b');
                        var a = this.reader.getFloat(grandChildren[j], 'a');
                        material.setAmbient(r, g, b, a);
                        break;
                    case 'diffuse':
                        var r = this.reader.getFloat(grandChildren[j], 'r');
                        var g = this.reader.getFloat(grandChildren[j], 'g');
                        var b = this.reader.getFloat(grandChildren[j], 'b');
                        var a = this.reader.getFloat(grandChildren[j], 'a');
                        material.setDiffuse(r, g, b, a);
                        break;
                    case 'specular':
                        var r = this.reader.getFloat(grandChildren[j], 'r');
                        var g = this.reader.getFloat(grandChildren[j], 'g');
                        var b = this.reader.getFloat(grandChildren[j], 'b');
                        var a = this.reader.getFloat(grandChildren[j], 'a');
                        material.setSpecular(r, g, b, a);
                        break;
                    default:
                        return "Invalid tag <" + grandChildren[j].nodeName + "> in material id " + materialId;
                }
            }
            this.materials[materialId] = material;
        }
        //console.log(this.materials);
        this.log("Parsed materials");
        return null;
    }

    /**
     * Parses the <animations> node.
     * @param {animations block element} animationsNode
     */
    parseAnimations(animationsNode) {
        var children = animationsNode.children;

        this.animations = [];
        for (var i = 0; i < children.length; i++) {
            var keyframes = [];
            if (children[i].nodeName != "animation") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }
            var animationId = this.reader.getString(children[i], 'id');
            if (animationId == null)
                return "no ID defined for animation";
            if (this.animations[animationId] != null)
                return "ID must be unique for each animation (conflict: ID = " + animationId + ")";
            var grandChildren = children[i].children;


            for (var j = 0; j < grandChildren.length; j++) {
                if (grandChildren[i].nodeName != "keyframe") {
                    this.onXMLMinorError("unknown tag <" + grandChildren[i].nodeName + ">");
                    continue;
                }
                var instant = this.reader.getFloat(grandChildren[j], 'instant');
                if (instant == null)
                    return "no instant defined for keyframe with animation id = " + animationId;
                var translate;
                var rotate = [0, 0, 0];
                var scale;
                var grandgrandChildren = grandChildren[j].children;
                for (var k = 0; k < grandgrandChildren.length; k++) {
                    switch (grandgrandChildren[k].nodeName) {
                        case 'translation':
                            var x = this.reader.getFloat(grandgrandChildren[k], 'x');
                            var y = this.reader.getFloat(grandgrandChildren[k], 'y');
                            var z = this.reader.getFloat(grandgrandChildren[k], 'z');
                            translate = [x, y, z];
                            break;
                        case 'rotation':

                            var axis = this.reader.getString(grandgrandChildren[k], 'axis');
                            var angle = this.reader.getFloat(grandgrandChildren[k], 'angle');
                            switch (axis) {
                                case 'x':
                                    rotate[0] = angle;
                                    break;
                                case 'y':
                                    rotate[1] = angle;
                                    break;
                                case 'z':
                                    rotate[2] = angle;
                                    //console.log(rotate);

                                    break;
                                default:
                                    return "Invalid axis = " + axis + " in animation id " + animationId;
                            }
                            break;
                        case 'scale':
                            var sx = this.reader.getFloat(grandgrandChildren[k], 'sx');
                            var sy = this.reader.getFloat(grandgrandChildren[k], 'sy');
                            var sz = this.reader.getFloat(grandgrandChildren[k], 'sz');
                            scale = [sx, sy, sz];
                            break;
                        default:
                            return "Invalid tag <" + grandgrandChildren[k].nodeName + "> in animation id " + animationId;
                    }
                }
                var keyframe = new MyKey(instant, translate, rotate, scale);
                keyframes.push(keyframe);
            }
            var myKeyframeAnimation = new MyKeyframeAnimation(this.scene, keyframes);
            this.animations[animationId] = myKeyframeAnimation;
        }
        //console.log(this.animations);
        this.log("Parsed animations");
        return null;
    }

    /**
     * Parses the <nodes> block.
     * @param {nodes block element} nodesNode
     */
    parseNodes(nodesNode) {
        var children = nodesNode.children;

        this.nodes = [];
        this.spriteAnimations = [];

        var grandChildren = [];
        var grandgrandChildren = [];
        var nodeNames = [];

        this.scene.pushMatrix();

        // Any number of nodes.
        for (var i = 0; i < children.length; i++) {

            //console.log(grandChildren[i]);
            if (children[i].nodeName != "node") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            // Get id of the current node.
            var nodeID = this.reader.getString(children[i], 'id');
            if (nodeID == null)
                return "no ID defined for nodeID";

            // Checks for repeated IDs.
            if (this.nodes[nodeID] != null)
                return "ID must be unique for each node (conflict: ID = " + nodeID + ")";

            var currentNode = new MyNode(this, nodeID);

            grandChildren = children[i].children;

            nodeNames = [];
            for (var j = 0; j < grandChildren.length; j++) {
                nodeNames.push(grandChildren[j].nodeName);
            }

            var transformationsIndex = nodeNames.indexOf("transformations");
            var animationsIndex = nodeNames.indexOf("animationref");
            var materialIndex = nodeNames.indexOf("material");
            var textureIndex = nodeNames.indexOf("texture");
            var descendantsIndex = nodeNames.indexOf("descendants");


            //console.log(transformationsIndex);

            // Transformations
            if (transformationsIndex != null) {

                grandgrandChildren = grandChildren[transformationsIndex].children;

                var transfMatrix = mat4.create();

                for (var k = 0; k < grandgrandChildren.length; k++) {
                    switch (grandgrandChildren[k].nodeName) {
                        case 'translation':
                            var coordinates = this.parseCoordinates3D(grandgrandChildren[k],
                                "Getting coordinates for a translation of node " + nodeID);

                            if (!Array.isArray(coordinates)) return coordinates;

                            transfMatrix = mat4.translate(transfMatrix, transfMatrix, coordinates);
                            break;

                        case 'rotation':
                            var axis = this.reader.getString(grandgrandChildren[k], "axis");
                            if (axis == null) {
                                return "Couldn't get the axis of a rotation in " + nodeID;
                            }

                            var angle = this.reader.getFloat(grandgrandChildren[k], "angle");
                            if (angle == null) {
                                return "Couldn't get the angle of a rotation in " + nodeID;
                            }

                            //Defining the axis to rotate
                            var axisVector = [0, 0, 0];
                            if (axis == 'x') {
                                axisVector[0] = 1;
                            } else if (axis == 'y') {
                                axisVector[1] = 1;
                            } else if (axis == 'z') {
                                axisVector[2] = 1;
                            }

                            transfMatrix = mat4.rotate(transfMatrix, transfMatrix, angle * DEGREE_TO_RAD, axisVector);
                            break;

                        case 'scale':
                            /*
                            var coordinates = this.parseCoordinates3D(grandgrandChildren[k], 
                                "Getting scale factor for a scaling in " + nodeID);

                            if (!Array.isArray(coordinates)) return coordinates;

                            //Check if the coordinates are valid
                            if (coordinates[0] == 0) {
                                return "Value of x must be different from 0."
                            }
                            if (coordinates[1] == 0) {
                                return "Value of y must be different from 0."
                            }
                            if (coordinates[2] == 0) {
                                return "Value of z must be different from 0."
                            }*/
                            var sx = this.reader.getFloat(grandgrandChildren[k], 'sx');
                            var sy = this.reader.getFloat(grandgrandChildren[k], 'sy');
                            var sz = this.reader.getFloat(grandgrandChildren[k], 'sz');

                            if (sx == null || sy == null || sz == null) {
                                return "Undefined scaling variable";
                            }
                            if (isNaN(sx) || isNaN(sy) || isNaN(sz)) {
                                return "Non-numeric value for scaling variable";
                            }

                            transfMatrix = mat4.scale(transfMatrix, transfMatrix, [sx, sy, sz]);
                            break;
                    }
                }

                currentNode.setTrasMatrix(transfMatrix);
            }
            // Animation
            // Note: animation declaration in xml is optional
            if (animationsIndex != -1) {
                var animationId = this.reader.getString(grandChildren[animationsIndex], "id");
                currentNode.setAnimation(animationId);
            }

            // Material
            if (materialIndex == null) {
                return "Unable to parse material with node ID " + nodeID;
            }
            if (materialIndex == -1) {
                return "Material not defined with node ID " + nodeID;
            }

            var materialID = this.reader.getString(grandChildren[materialIndex], 'id');

            if (materialID == null) {
                return "Null Material ID defined for node ID " + nodeID;
            }
            //  id="null" maintains material from parent node
            if (materialID != "null" && this.materials[materialID] == null) {
                return "No existing material declared with ID " + materialID + " for node ID " + nodeID;
            }


            currentNode.setMaterial(materialID);

            // Texture
            if (textureIndex == null) {
                return "Unable to parse texture with node ID " + nodeID;
            }
            if (textureIndex == -1) {
                return "Texture not defined within node ID " + nodeID;
            }

            var textureID = this.reader.getString(grandChildren[textureIndex], 'id');

            if (textureID == null) {
                return "Null Texture ID defined for node ID " + nodeID;
            }
            //  id="null" maintains texture from parent node
            //  id="clear" clears texture declaration received from parent node
            if (textureID != "null" && textureID != "clear" && this.textures[textureID] == null) {
                return "No existing texture declared with ID " + textureID + " for node ID " + nodeID;
            }
            currentNode.setTexture(textureID);

            // Descendants
            if (descendantsIndex != null) {
                grandgrandChildren = grandChildren[descendantsIndex].children;

                for (var k = 0; k < grandgrandChildren.length; k++) {
                    switch (grandgrandChildren[k].nodeName) {
                        case 'noderef':
                            var childID;
                            if ((childID = this.reader.getString(grandgrandChildren[k], "id")) == null) {
                                return "No id found on child in " + nodeID;
                            } else if (childID == nodeID) {
                                return "Child node can't be the same as parent node in " + nodeID;
                            }
                            currentNode.pushChildren(childID);
                            break;

                        case 'leaf':
                            var shape;
                            if ((shape = this.reader.getString(grandgrandChildren[k], "type")) == null) {
                                return "Primitive has no type in " + nodeID;
                            }

                            switch (shape) {
                                case 'triangle':

                                    var x1 = this.reader.getFloat(grandgrandChildren[k], 'x1');
                                    if (!(x1 != null && !isNaN(x1)))
                                        return "Unable to parse x1 of a triangle in " + nodeID;

                                    var x2 = this.reader.getFloat(grandgrandChildren[k], 'x2');
                                    if (!(x2 != null && !isNaN(x2)))
                                        return "Unable to parse x2 of a triangle in " + nodeID;

                                    var x3 = this.reader.getFloat(grandgrandChildren[k], 'x3');
                                    if (!(x3 != null && !isNaN(x3)))
                                        return "Unable to parse x3 of a triangle in " + nodeID;

                                    var y1 = this.reader.getFloat(grandgrandChildren[k], 'y1');
                                    if (!(y1 != null && !isNaN(y1)))
                                        return "Unable to parse y1 of a triangle in " + nodeID;

                                    //y2
                                    var y2 = this.reader.getFloat(grandgrandChildren[k], 'y2');
                                    if (!(y2 != null && !isNaN(y2)))
                                        return "Unable to parse y2 of a triangle in " + nodeID;

                                    var y3 = this.reader.getFloat(grandgrandChildren[k], 'y3');
                                    if (!(y3 != null && !isNaN(y3)))
                                        return "Unable to parse y3 of a triangle in " + nodeID;

                                    var triangle = new MyTriangle(this.scene, x1, y1, x2, y2, x3, y3);

                                    currentNode.pushLeaf(triangle);
                                    break;

                                case 'rectangle':

                                    var x1 = this.reader.getFloat(grandgrandChildren[k], 'x1');
                                    if (!(x1 != null && !isNaN(x1)))
                                        return "Unable to parse x1 of a rectangle in " + nodeID;

                                    var y1 = this.reader.getFloat(grandgrandChildren[k], 'y1');
                                    if (!(y1 != null && !isNaN(y1)))
                                        return "Unable to parse y1 of a rectangle in " + nodeID;

                                    var x2 = this.reader.getFloat(grandgrandChildren[k], 'x2');
                                    if (!(x2 != null && !isNaN(x2) && x2 > x1))
                                        return "Unable to parse x2 of a rectangle in " + nodeID;

                                    var y2 = this.reader.getFloat(grandgrandChildren[k], 'y2');
                                    if (!(y2 != null && !isNaN(y2) && y2 > y1))
                                        return "Unable to parse y2 of a rectangle in " + nodeID;

                                    var rectangle = new MyRectangle(this.scene, x1, y1, x2, y2);

                                    currentNode.pushLeaf(rectangle);
                                    break;

                                case 'cylinder':

                                    var bottomRadius = this.reader.getFloat(grandgrandChildren[k], 'bottomRadius');
                                    if (!(bottomRadius != null && !isNaN(bottomRadius)))
                                        return "Unable to parse bottomRadius of a cylinder in " + nodeID;

                                    var topRadius = this.reader.getFloat(grandgrandChildren[k], 'topRadius');
                                    if (!(topRadius != null && !isNaN(topRadius)))
                                        return "Unable to parse topRadius of a cylinder in " + nodeID;

                                    var height = this.reader.getFloat(grandgrandChildren[k], 'height');
                                    if (!(height != null && !isNaN(height)))
                                        return "Unable to parse height of a cylinder in " + nodeID;

                                    var slices = this.reader.getFloat(grandgrandChildren[k], 'slices');
                                    if (!(slices != null && !isNaN(slices)))
                                        return "Unable to parse slices of a cylinder in " + nodeID;

                                    var stacks = this.reader.getFloat(grandgrandChildren[k], 'stacks');
                                    if (!(stacks != null && !isNaN(stacks)))
                                        return "Unable to parse stacks of a cylinder in " + nodeID;

                                    var cylinder = new MyCylinder(this.scene, bottomRadius, topRadius, height, slices, stacks);

                                    currentNode.pushLeaf(cylinder);
                                    break;

                                case 'sphere':

                                    var radius = this.reader.getFloat(grandgrandChildren[k], 'radius');
                                    if (!(radius != null && !isNaN(radius)))
                                        return "Unable to parse radius of a sphere in " + nodeID;

                                    var slices = this.reader.getFloat(grandgrandChildren[k], 'slices');
                                    if (!(slices != null && !isNaN(slices)))
                                        return "Unable to parse slices of a sphere in " + nodeID;

                                    var stacks = this.reader.getFloat(grandgrandChildren[k], 'stacks');
                                    if (!(stacks != null && !isNaN(stacks)))
                                        return "Unable to parse stacks of a sphere in " + nodeID;

                                    var sphere = new MySphere(this.scene, radius, slices, stacks);

                                    currentNode.pushLeaf(sphere);
                                    break;

                                case 'torus':

                                    var inner = this.reader.getFloat(grandgrandChildren[k], 'inner');
                                    if (!(inner != null && !isNaN(inner)))
                                        return "Unable to parse inner of a torus in " + nodeID;

                                    var outer = this.reader.getFloat(grandgrandChildren[k], 'outer');
                                    if (!(outer != null && !isNaN(outer)))
                                        return "Unable to parse outer of a torus in " + nodeID;

                                    var slices = this.reader.getFloat(grandgrandChildren[k], 'slices');
                                    if (!(slices != null && !isNaN(slices)))
                                        return "Unable to parse slices of a torus in " + nodeID;

                                    var loops = this.reader.getFloat(grandgrandChildren[k], 'loops');
                                    if (!(loops != null && !isNaN(loops)))
                                        return "Unable to parse loops of a torus in " + nodeID;

                                    var torus = new MyTorus(this.scene, inner, outer, slices, loops);

                                    currentNode.pushLeaf(torus);
                                    break;

                                case 'spriteanim':
                                    var ssid = this.reader.getString(grandgrandChildren[k], 'ssid');
                                    if (ssid == null)
                                        return "Unable to parse ssid of sprite animation in " + nodeID;
                                    var spritesheet = this.spritesheets[ssid];
                                    var duration = this.reader.getString(grandgrandChildren[k], 'duration');
                                    if (duration == null)
                                        return "Unable to parse duration of sprite animation in " + nodeID;
                                    var startCell = this.reader.getString(grandgrandChildren[k], 'startCell');
                                    if (startCell == null)
                                        return "Unable to parse startCell of sprite animation in " + nodeID;
                                    var endCell = this.reader.getString(grandgrandChildren[k], 'endCell');
                                    if (endCell == null)
                                        return "Unable to parse endCell of sprite animation in " + nodeID;

                                    var spriteAnimation = new MySpriteAnimation(this.scene, spritesheet, duration, startCell, endCell);

                                    this.spriteAnimations.push(spriteAnimation);
                                    currentNode.pushLeaf(spriteAnimation);
                                    break;

                                case 'spritetext':
                                    var text = this.reader.getString(grandgrandChildren[k], 'text');
                                    if (text == null)
                                        return "Unable to parse text of sprite text in " + nodeID;
                                    var spriteText = new MySpriteText(this.scene, text);
                                    currentNode.pushLeaf(spriteText);
                                    break;

                                case 'plane':

                                    var divU = this.reader.getFloat(grandgrandChildren[k], 'npartsU');
                                    if (!(divU != null && !isNaN(divU)))
                                        return "Unable to parse U axis divisions of a plane in " + nodeID;

                                    var divV = this.reader.getFloat(grandgrandChildren[k], 'npartsV');
                                    if (!(divV != null && !isNaN(divV)))
                                        return "Unable to parse V axis divisions of a plane in " + nodeID;

                                    var plane = new MyPlane(this.scene, divU, divV);

                                    currentNode.pushLeaf(plane);
                                    break;

                                case 'patch':

                                    var divU = this.reader.getFloat(grandgrandChildren[k], 'npartsU');
                                    if (!(divU != null && !isNaN(divU)))
                                        return "Unable to parse U axis divisions of a patch in " + nodeID;

                                    var divV = this.reader.getFloat(grandgrandChildren[k], 'npartsV');
                                    if (!(divV != null && !isNaN(divV)))
                                        return "Unable to parse V axis divisions of a patch in " + nodeID;

                                    var nPointsU = this.reader.getFloat(grandgrandChildren[k], 'npointsU');
                                    if (!(nPointsU != null && !isNaN(nPointsU)))
                                        return "Unable to parse number of U points of a patch in " + nodeID;

                                    var nPointsV = this.reader.getFloat(grandgrandChildren[k], 'npointsV');
                                    if (!(nPointsV != null && !isNaN(nPointsV)))
                                        return "Unable to parse number of V points of a patch in " + nodeID;


                                    var cp = grandgrandChildren[k].children;

                                    var controlPoints = [];

                                    for (var n = 0; n < cp.length; n++) {

                                        var x = this.reader.getFloat(cp[n], 'x');
                                        if (!(x != null && !isNaN(x)))
                                            return "Unable to parse control points of a patch in " + nodeID;

                                        var y = this.reader.getFloat(cp[n], 'y');
                                        if (!(y != null && !isNaN(y)))
                                            return "Unable to parse control points of a patch in " + nodeID;

                                        var z = this.reader.getFloat(cp[n], 'z');
                                        if (!(z != null && !isNaN(z)))
                                            return "Unable to parse control points of a patch in " + nodeID;

                                        var point = [x, y, z];
                                        controlPoints.push(point);
                                    }

                                    /*Since the degree is passed instead of the number of points, the values
                                    to pass for each degree paramenter should be nPoints - 1 */
                                    var patch = new MyPatch(this.scene, divU, divV,
                                        nPointsU - 1, nPointsV - 1, controlPoints);

                                    currentNode.pushLeaf(patch);
                                    break;

                                case 'defbarrel':

                                    var baseRadius = this.reader.getFloat(grandgrandChildren[k], 'base');
                                    if (!(baseRadius != null && !isNaN(baseRadius)))
                                        return "Unable to parse baseRadius of a barrel in " + nodeID;

                                    var midRadius = this.reader.getFloat(grandgrandChildren[k], 'middle');
                                    if (!(midRadius != null && !isNaN(midRadius)))
                                        return "Unable to parse midRadius of a barrel in " + nodeID;

                                    var height = this.reader.getFloat(grandgrandChildren[k], 'height');
                                    if (!(height != null && !isNaN(height)))
                                        return "Unable to parse height of a barrel in " + nodeID;

                                    var slices = this.reader.getFloat(grandgrandChildren[k], 'slices');
                                    if (!(slices != null && !isNaN(slices)))
                                        return "Unable to parse slices of a barrel in " + nodeID;

                                    var stacks = this.reader.getFloat(grandgrandChildren[k], 'stacks');
                                    if (!(stacks != null && !isNaN(stacks)))
                                        return "Unable to parse stacks of a barrel in " + nodeID;

                                    var barrel = new MyDefbarrel(this.scene, baseRadius, midRadius,
                                        height, slices, stacks);
                                    currentNode.pushLeaf(barrel);
                                    break;

                                default:
                                    this.onXMLMinorError("Type of shape of a primitive not recognized in " + nodeID);
                            }
                            break;

                        default:
                            this.onXMLMinorError("A descendant wasn't declared properly in " + nodeID);
                            break
                    }
                }
            }

            this.nodes[nodeID] = currentNode;
        }
        this.scene.popMatrix();
    }


    parseBoolean(node, name, messageError) {
            var boolVal = true;
            boolVal = this.reader.getBoolean(node, name);
            if (!(boolVal != null && !isNaN(boolVal) && (boolVal == true || boolVal == false)))
                this.onXMLMinorError("unable to parse value component " + messageError + "; assuming 'value = 1'");

            return boolVal || 1;
        }
        /**
         * Parse the coordinates from a node with ID = id
         * @param {block element} node
         * @param {message to be displayed in case of error} messageError
         */
    parseCoordinates3D(node, messageError) {
        var position = [];

        // x
        var x = this.reader.getFloat(node, 'x');
        if (!(x != null && !isNaN(x)))
            return "unable to parse x-coordinate of the " + messageError;

        // y
        var y = this.reader.getFloat(node, 'y');
        if (!(y != null && !isNaN(y)))
            return "unable to parse y-coordinate of the " + messageError;

        // z
        var z = this.reader.getFloat(node, 'z');
        if (!(z != null && !isNaN(z)))
            return "unable to parse z-coordinate of the " + messageError;

        position.push(...[x, y, z]);

        return position;
    }

    /**
     * Parse the coordinates from a node with ID = id
     * @param {block element} node
     * @param {message to be displayed in case of error} messageError
     */
    parseCoordinates4D(node, messageError) {
        var position = [];

        //Get x, y, z
        position = this.parseCoordinates3D(node, messageError);

        if (!Array.isArray(position))
            return position;


        // w
        var w = this.reader.getFloat(node, 'w');
        if (!(w != null && !isNaN(w)))
            return "unable to parse w-coordinate of the " + messageError;

        position.push(w);

        return position;
    }

    /**
     * Parse the color components from a node
     * @param {block element} node
     * @param {message to be displayed in case of error} messageError
     */
    parseColor(node, messageError) {
        var color = [];

        // R
        var r = this.reader.getFloat(node, 'r');
        if (!(r != null && !isNaN(r) && r >= 0 && r <= 1))
            return "unable to parse R component of the " + messageError;

        // G
        var g = this.reader.getFloat(node, 'g');
        if (!(g != null && !isNaN(g) && g >= 0 && g <= 1))
            return "unable to parse G component of the " + messageError;

        // B
        var b = this.reader.getFloat(node, 'b');
        if (!(b != null && !isNaN(b) && b >= 0 && b <= 1))
            return "unable to parse B component of the " + messageError;

        // A
        var a = this.reader.getFloat(node, 'a');
        if (!(a != null && !isNaN(a) && a >= 0 && a <= 1))
            return "unable to parse A component of the " + messageError;

        color.push(...[r, g, b, a]);

        return color;
    }

    recursiveDisplayScene(nodeID, parentMaterialID, parentTextureID) {
            this.scene.pushMatrix();


            var currentNode = this.nodes[nodeID];

            if (currentNode == null) {
                return "Something in the nodes list isn't a node!";
            }

            var currentMatID = parentMaterialID;
            var currentTexID = parentTextureID;

            this.scene.pushMatrix();

            var animationNode = this.animations[currentNode.animationID];

            this.scene.popMatrix();
            if (animationNode != undefined) {
                //console.log(animationNode);
                animationNode.apply();
            }


            this.scene.multMatrix(currentNode.transMatrix);

            if (this.materials[currentNode.materialID] != null) {
                currentMatID = currentNode.materialID;
            }

            if (this.textures[currentNode.textureID] != null) {
                if (currentNode.textureID == "clear") {
                    currentTexID = null;
                } else {
                    currentTexID = currentNode.textureID;
                }
            }


            for (var i = 0; i < currentNode.leaves.length; i++) {
                if (this.materials[currentMatID] != null) {
                    this.materials[currentMatID].apply();

                }

                if (this.textures[currentTexID] != null) {
                    this.textures[currentTexID].bind();
                }
                if (animationNode == undefined || (animationNode != undefined && animationNode.display == true)) {
                    currentNode.leaves[i].display();
                    //console.log(animationNode);
                }

            }
            for (var i = 0; i < currentNode.children.length; i++) {
                this.recursiveDisplayScene(currentNode.children[i], currentMatID, currentTexID);

            }
            this.scene.popMatrix();

        }
        /**
         * Displays the scene, processing each node, starting in the root node.
         */
    displayScene() {

        this.recursiveDisplayScene(this.idRoot, this.nodes[this.idRoot].materialID, this.nodes[this.idRoot].textureID);

    }
}