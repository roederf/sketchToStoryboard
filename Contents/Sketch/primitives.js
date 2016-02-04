function Rect(x,y,width,height) {
    this.key = "frame";
    this.x = "" + x;
    this.y = "" + y;
    this.width = "" + width;
    this.height = "" + height;
    
    this.writeXml = function(tablevel) {
        return writeXmlObject(this, "rect", tablevel);
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

function AutoresizeMask() {
    this.key="autoresizingMask";
    this.widthSizable = "YES";
    this.heightSizable = "YES";
    
    this.writeXml = function(tablevel) {
        return writeXmlObject(this, "autoresizingMask", tablevel);
    }
}

function Animations(){
    this.writeXml = function(tablevel) {
        return writeXmlObject(this, "animations", tablevel);
    }
}

function Color() {
    this.key = "backgroundColor";
    this.white = "1";
    this.alpha = "1";
    this.colorSpace = "calibratedWhite";
    this.writeXml = function(tablevel) {
        return writeXmlObject(this, "color", tablevel);
        
    }
}

function RGBColor(r,g,b,a){
    this.key = "backgroundColor";
    this.red = r;
    this.green = g;
    this.blue = b;
    this.alpha = a;
    this.colorSpace = "calibratedRGB";
    this.writeXml = function(tablevel) {
        return writeXmlObject(this, "color", tablevel);
        
    }
}

function ButtonState(img) {
    this.key="normal";
    this.image = img;
    
    this.writeXml = function(tablevel) {
        return writeXmlObject(this, "state", tablevel);
    }
}

function FontDescription(size) {
    this.key = "fontDescription";
    this.type = "system";
    //this.name = fontName; //name="ArialMT" family="Arial"
    //this.family = family;
    this.pointSize = size;
    this.writeXml = function(tablevel) {
        return writeXmlObject(this, "fontDescription", tablevel);
    }
}

function Nil(){
    this.key = "highlightedColor";
    this.writeXml = function(tablevel) {
        return writeXmlObject(this, "nil", tablevel);
    }
}

function Attribute(type, keyPath, value) {
    this.type = type;
    this.keyPath = keyPath;
    this.value = value;
    
    this.writeXml = function(tablevel) {
        return writeXmlObject(this, "userDefinedRuntimeAttribute", tablevel);
    }
}

function Real(value) {
    this.key="value";
    this.value = value;
    this.writeXml = function(tablevel) {
        return writeXmlObject(this, "real", tablevel);
    }
}

function SimulatedScreenMetrics(type) {
    this.key = "simulatedDestinationMetrics";
    this.type = type;
    
    this.writeXml = function(tablevel) {
        return writeXmlObject(this, "simulatedScreenMetrics", tablevel);
    }
}

function TextInputTraits() {
    this.key="textInputTraits";
    this.autocapitalizationType="sentences";
    this.writeXml = function(tablevel) {
        return writeXmlObject(this, "textInputTraits", tablevel);
    }
}