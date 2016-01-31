var _tab = "    ";

function Storyboard() {
    this.type = "com.apple.InterfaceBuilder3.CocoaTouch.Storyboard.XIB";
    this.version = "3.0";
    this.toolsVersion = "9059";
    this.systemVersion = "15B42";
    this.targetRuntime = "iOS.CocoaTouch";
    this.propertyAccessControl = "none";
    this.useAutolayout = "YES";
    this.useTraitCollections = "YES";
    this.initialViewController = null;
    this.content = [ new Dependencies(), new Scenes(), new Resources() ];

    this.writeXml = function() {
        return writeXmlObject(this, "document", "");
    }
}

function Dependencies() {
    this.content = [ new Deployment(), new PlugIn() ];
    
    this.writeXml = function(tablevel) {
        return writeXmlObject(this, "dependencies", tablevel);
    }
}

function Deployment() {
    this.identifier = "iOS";
    
    this.writeXml = function(tablevel) {
        return writeXmlObject(this, "deployment", tablevel);
    }
}

function PlugIn() {
    this.identifier = "com.apple.InterfaceBuilder.IBCocoaTouchPlugin";
    this.version = "9049";
    
    this.writeXml = function(tablevel) {
        return writeXmlObject(this,"plugIn", tablevel);
    }
}

function Scenes() {
    this.content = [ new Scene() ];
    
    this.writeXml = function(tablevel) {
        return writeXmlObject(this, "scenes", tablevel);
    }
}

function Scene() {
    this.sceneID = generateID();
    this.content = [ new SceneObjects(), new Point(240,200) ];
    
    this.writeXml = function(tablevel) {
        return writeXmlObject(this, "scene", tablevel);
    }
}

function SceneObjects() {
    this.content = [ new ViewController("ViewController"), new Placeholder() ];
    
    this.writeXml = function(tablevel) {
        return writeXmlObject(this, "objects", tablevel);
    }
}

function ViewController(name) {
    this.content = [];
    this.id = generateID();
    this.customClass = name;
    this.customModuleProvider = "target";
    this.sceneMemberID = "viewController";
    
    this.writeXml = function(tablevel) {
        return writeXmlObject(this, "viewController", tablevel);
    }
}

function LayoutGuides() {
    this.content = [ new ViewControllerLayoutGuide("top"), new ViewControllerLayoutGuide("bottom") ];
    this.writeXml = function(tablevel) {
        return writeXmlObject(this, "layoutGuides", tablevel);
    }
}

function ViewControllerLayoutGuide(type) {
    this.type = type;
    this.id = generateID();
    
    this.writeXml = function(tablevel) {
        return writeXmlObject(this, "viewControllerLayoutGuide", tablevel);
    }
}

function Placeholder() {
    this.placeholderIdentifier = "IBFirstResponder";
    this.id = generateID();
    this.sceneMemberID = "firstResponder";
    
    this.writeXml = function(tablevel) {
        return writeXmlObject(this, "placeholder", tablevel);
    }
}

function Point(x,y) {
    this.key = "canvasLocation";
    this.x = "" + x;
    this.y = "" + y;
    
    this.writeXml = function(tablevel) {
        return writeXmlObject(this, "point", tablevel);
    }
}

function Resources() {
    //this.content = [new Image("Übersicht", 320, 568), new Image("Willkommen", 320, 568)];
    this.content = [];
    
    this.writeXml = function(tablevel) {
        return writeXmlObject(this, "resources", tablevel);
    }
}

function Image(name, w, h) {
    this.name = name;
    this.width = w;
    this.height = h;
    
    this.writeXml = function(tablevel) {
        return writeXmlObject(this, "image", tablevel);
    }
}

function buildStoryboard(layers) {
    var sb = new Storyboard();
        
    return sb;
}

function writeAttributes(obj) {
    var result = "";
    for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
            // do stuff
            //log( typeof storyboard[property] );

            if(typeof obj[property] != 'function' &&
               property != "content"){
                result += " " + property + "=\"" + obj[property] + "\"";
            }
        }
    }
    
    return result;
}

function writeXmlObject(obj, name, tablevel) {
    var result = tablevel + "<" + name;
    result += writeAttributes(obj);
    
    if (obj.content && obj.content.length > 0) {
        result += ">\n";
        for(var i=0; i<obj.content.length; i++) {
            result += obj.content[i].writeXml(tablevel + _tab);
        }
        result += tablevel + "</" + name + ">\n";
    }
    else {
        result += "/>\n";
    }

    return result;
}

// just a temp placeholder:
var counter = 100;
function generateID() {
    counter++;
    return "flr-Ab-" + counter;
}