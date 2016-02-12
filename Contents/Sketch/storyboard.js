@import 'helper.js'
@import 'primitives.js'

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
    this.scenes = [];
    this.resources = [];

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
    this.objects = [];
    this.point = new Point(0,0);
    
    this.writeXml = function(tablevel) {
        return writeXmlObject(this, "scene", tablevel);
    }
}

function ViewController(name, title) {
    this.ID = generateID();
    this.customClass = name;
    this.customModuleProvider = "target";
    this.sceneMemberID = "viewController";
    this.layoutGuides = [ new ViewControllerLayoutGuide("top"), new ViewControllerLayoutGuide("bottom") ];
    this.view = new View();
    if (title){
        this.title = title;    
    }
    
    //this.simulatedScreenMetrics = new SimulatedScreenMetrics("retina47");
        
    this.writeXml = function(tablevel) {
        return writeXmlObject(this, "viewController", tablevel);
    }
}

function View() {
    this.key = "view";
    this.contentMode ="scaleToFill";
    this.ID = generateID();
    this.rect = new Rect(0,0,600,600);
    this.autoresizingMask = new AutoresizeMask();
    this.animations = new Animations();
    this.color = new Color();
    this.writeXml = function(tablevel) {
        return writeXmlObject(this, "view", tablevel);
    }
}

function ViewControllerLayoutGuide(type) {
    this.type = type;
    this.ID = generateID();
    
    this.writeXml = function(tablevel) {
        return writeXmlObject(this, "viewControllerLayoutGuide", tablevel);
    }
}

function Placeholder() {
    this.placeholderIdentifier = "IBFirstResponder";
    this.ID = generateID();
    this.sceneMemberID = "firstResponder";
    this.userLabel = "First Responder";
    
    this.writeXml = function(tablevel) {
        return writeXmlObject(this, "placeholder", tablevel);
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

function ImageView(imgName, x, y, width, height) {
    this.userInteractionEnabled = "NO";
    this.contentMode = "scaleToFill";
    this.horizontalHuggingPriority = "251";
    this.verticalHuggingPriority = "251";
    this.fixedFrame = "YES";
    this.image = imgName;
    this.translatesAutoresizingMaskIntoConstraints = "NO";
    this.ID = generateID();
    this.rect = new Rect(x,y,width,height);
    this.animations = new Animations();
    
    this.writeXml = function(tablevel) {
        return writeXmlObject(this, "imageView", tablevel);
    }
}

function Button(imgName, x, y, width, height) {
    this.opaque = "NO";
    this.contentMode = "scaleToFill";
    this.fixedFrame = "YES";
    this.contentHorizontalAlignment="center";
    this.contentVerticalAlignment="center";
    this.lineBreakMode="middleTruncation"; 
    this.translatesAutoresizingMaskIntoConstraints="NO";
    this.ID=generateID();
    
    this.rect = new Rect(x,y,width,height);
    this.state = new ButtonState(imgName);
    this.connections = [];
    
    this.writeXml = function(tablevel) {
        return writeXmlObject(this, "button", tablevel);
    }
}

function Label(text, x,y, width, height) {
    this.opaque="NO";
    this.userInteractionEnabled="NO";
    this.contentMode="left";
    this.horizontalHuggingPriority="251";
    this.verticalHuggingPriority="251";
    this.fixedFrame="YES";
    this.text=text;
    this.textAlignment="natural";
    this.lineBreakMode="wordWrap"; // "tailTruncation" would be default for simple labels
    this.baselineAdjustment="alignBaselines";
    this.adjustsFontSizeToFit="NO"
    this.translatesAutoresizingMaskIntoConstraints="NO";
    this.numberOfLines="32";
    this.ID=generateID();
    
    this.rect = new Rect(x,y,width,height);
    this.fontDescription = new FontDescription(17, "system");
    this.color = new Color();
    this.color.key = "textColor";
    this.color.cocoaTouchSystemColor = "darkTextColor";
    this.nil = new Nil();

    this.writeXml = function(tablevel) {
        return writeXmlObject(this, "label", tablevel);
    }
}

function TextView(text, x,y,width,height, font) {
    this.clipsSubviews="YES";
    this.multipleTouchEnabled="YES"; 
    this.contentMode="scaleToFill";
    this.fixedFrame="YES";
    this.editable="NO";
    this.text=text;
    this.textAlignment="natural";
    this.selectable="NO";
    this.translatesAutoresizingMaskIntoConstraints="NO";
    this.ID = generateID();
    
    this.rect = new Rect(x,y,width,height);
    this.animations = new Animations();
    this.color = new Color();
    this.fontDescription = font;
    this.textInputTraits = new TextInputTraits();
                                
    this.writeXml = function(tablevel) {
        return writeXmlObject(this, "textView", tablevel);
    }
    
}

function Segue(destID, kind, customClass) {
    this.destination=destID;
    this.kind=kind; // {"show", "unwind"}
    if (kind=="unwind") {
        this.unwindAction = _unwindAction;
    }
    if (customClass) {
        this.customClass = customClass;
        this.customModuleProvider="target";
    }
    this.ID=generateID();
    
    this.writeXml = function(tablevel) {
        return writeXmlObject(this, "segue", tablevel);
    }
}

function Exit() {
    this.ID = generateID();
    this.userLabel="Exit";
    this.sceneMemberID="exit";
    
    this.writeXml = function(tablevel) {
        return writeXmlObject(this, "exit", tablevel);
    }
}

function CustomView(x,y,width,height, borderColor, borderWidth, cornerRadius) {
    this.contentMode="scaleToFill";
    this.fixedFrame="YES"; 
    this.translatesAutoresizingMaskIntoConstraints="NO";
    this.ID=generateID();
    this.customClass="CustomView";
    this.customModuleProvider="target";
    
    this.rect = new Rect(x,y,width,height);
    this.color = new Color();   // default is white    
    
    this.setBackground = function(color){
        this.color = color;
    }
    
    this.setBorder = function(color, thickness, radius){
        this.userDefinedRuntimeAttributes = [];
        color.key = "value";
        this.userDefinedRuntimeAttributes.push(new Attribute("color", "borderColor", color));
        this.userDefinedRuntimeAttributes.push(new Attribute("number", "borderWidth", new Real(thickness)));
        this.userDefinedRuntimeAttributes.push(new Attribute("number", "cornerRadius", new Real(radius)));
    }
        
    this.writeXml = function(tablevel) {
        return writeXmlObject(this, "view", tablevel);
    }

}


