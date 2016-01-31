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
    this.content = [ new Dependencies() ];

    this.writeXml = function() {
        var result = "<document";
        result += writeAttributes(this);
        result += ">\n";
        for(var i=0; i<this.content.length; i++) {
            result += this.content[i].writeXml(_tab);
        }
        result += "</document>\n";

        return result;
    }
}

function Dependencies() {
    this.content = [ new Deployment(), new PlugIn() ];
    
    this.writeXml = function(tablevel) {
        var result = tablevel + "<dependencies";
        result += writeAttributes(this);
        result += ">\n";
        for(var i=0; i<this.content.length; i++) {
            result += this.content[i].writeXml(tablevel + _tab);
        }
        result += tablevel + "</dependencies>\n";

        return result;
    }
}

function Deployment() {
    this.identifier = "iOS";
    
    this.writeXml = function(tablevel) {
        var result = tablevel + "<deployment";
        result += writeAttributes(this);
        result += "/>\n";
        
        return result;
    }
}

function PlugIn() {
    this.identifier = "com.apple.InterfaceBuilder.IBCocoaTouchPlugin";
    this.version = "9049";
    
    this.writeXml = function(tablevel) {
        var result = tablevel + "<plugIn";
        result += writeAttributes(this);
        result += "/>\n";
        
        return result;
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
