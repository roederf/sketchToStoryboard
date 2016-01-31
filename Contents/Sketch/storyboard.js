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
    this.dependencies = [ new Deployment(), new PlugIn() ];
    this.scenes = [ new Scene() ];
    //this.resources = [ new Image() ];

    this.writeXml = function() {
        return writeXmlObject(this, "document", "");
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

function Scene() {
    this.sceneID = generateID();
    this.objects = [ new ViewController("ViewController") ];
    this.point = new Point(240,200);
    
    this.writeXml = function(tablevel) {
        return writeXmlObject(this, "scene", tablevel);
    }
}

function ViewController(name) {
    this.id = generateID();
    this.customClass = name;
    this.customModuleProvider = "target";
    this.sceneMemberID = "viewController";
    this.layoutGuides = [ new ViewControllerLayoutGuide("top"), new ViewControllerLayoutGuide("bottom") ];
        
    this.writeXml = function(tablevel) {
        return writeXmlObject(this, "viewController", tablevel);
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

            if(typeof obj[property] != 'function'){
                
                if( Object.prototype.toString.call( obj[property] ) != '[object Array]'
                  && Object.prototype.toString.call( obj[property] ) != '[object Object]') {
                    result += " " + property + "=\"" + obj[property] + "\"";    
                }
                else {
                    //log(property + "is array");
                }
                
            }
        }
    }
    
    return result;
}

function writeXmlObject(obj, name, tablevel) {
    var result = tablevel + "<" + name;
    result += writeAttributes(obj);
    var hasChildren = false;
    for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
            if(typeof obj[property] != 'function'){
                
                if( Object.prototype.toString.call( obj[property] ) === '[object Array]' ) {
                    
                    if (!hasChildren) {
                        result += ">\n";
                        hasChildren = true;
                    }
                    result += tablevel + _tab + "<" + property + ">\n";
                    var array = obj[property];
                    for(var i=0; i<array.length; i++) {
                        result += array[i].writeXml(tablevel + _tab + _tab);
                    }
                    result += tablevel + _tab + "</" + property + ">\n";
                }
                else if (Object.prototype.toString.call( obj[property] ) === '[object Object]' ) {
                    if (!hasChildren) {
                        result += ">\n";
                        hasChildren = true;
                    }
                    result += tablevel + _tab + "<" + property;
                    result += writeAttributes(obj[property]);
                    result += "/>\n";
                }
                
            }
        }
    }
    if (hasChildren) {
        result += tablevel + "</" + name + ">\n";
    }
    else {
        result += "/>\n";
    }
    /*
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
    */

    return result;
}

// just a temp placeholder:
var counter = 100;
function generateID() {
    counter++;
    return "flr-Ab-" + counter;
}