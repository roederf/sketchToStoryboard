@import 'helper.js'

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
    this.scenes = [];
    //this.resources = [];

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
    this.point = new Point(240,200);
    
    this.writeXml = function(tablevel) {
        return writeXmlObject(this, "scene", tablevel);
    }
}

function ViewController(name) {
    this.ID = generateID();
    this.customClass = name;
    this.customModuleProvider = "target";
    this.sceneMemberID = "viewController";
    this.layoutGuides = [ new ViewControllerLayoutGuide("top"), new ViewControllerLayoutGuide("bottom") ];
    this.view = new View();
    this.simulatedScreenMetrics = new SimulatedScreenMetrics("retina47");
        
    this.writeXml = function(tablevel) {
        return writeXmlObject(this, "viewController", tablevel);
    }
}

function View() {
    this.key = "view";
    this.contentMode ="scaleToFill";
    this.ID = generateID();
    this.rect = new Rect();
    this.autoresizingMask = new AutoresizeMask();
    this.animations = new Animations();
    this.color = new Color();
    this.writeXml = function(tablevel) {
        return writeXmlObject(this, "view", tablevel);
    }
}

function Rect() {
    this.key = "frame";
    this.x = "0.0";
    this.y = "0.0";
    this.width = "600";
    this.height = "600";
    
    this.writeXml = function(tablevel) {
        return writeXmlObject(this, "rect", tablevel);
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

function ViewControllerLayoutGuide(type) {
    this.type = type;
    this.ID = generateID();
    
    this.writeXml = function(tablevel) {
        return writeXmlObject(this, "viewControllerLayoutGuide", tablevel);
    }
}

function SimulatedScreenMetrics(type) {
    this.key = "simulatedDestinationMetrics";
    this.type = type;
    
    this.writeXml = function(tablevel) {
        return writeXmlObject(this, "simulatedScreenMetrics", tablevel);
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

// ------ //

function StoryboardExport(doc) {
    this.assetSlices = [];
    
    this.storyboard = new Storyboard();
    
    // for each artboard do create viewcontroller
    var artboards = doc.currentPage().artboards().objectEnumerator();
    while (artboard = artboards.nextObject()) {
        var artboardName = artboard.name().trim();
        log(artboardName);
        
        var scene = new Scene();
        var viewCtrl = new ViewController("ViewController");
        scene.objects.push(viewCtrl);
        scene.objects.push(new Placeholder());
        this.storyboard.scenes.push(scene);
        
        // add imageview
    }
    
    // store slice for image export
    var slices = doc.currentPage().artboards().objectEnumerator();
    while (slice = slices.nextObject()) {
        this.assetSlices.push(slice);
        //[doc saveArtboardOrSlice:slice toFile:exportPath + 'img/' + slice.name() + '.png'];
    }
        
    var saveTextToFile = function(filename, text) {
      var path = [@"" stringByAppendingString:filename];
      var str = [@"" stringByAppendingString:text];
      str.dataUsingEncoding_(NSUTF8StringEncoding).writeToFile_atomically_(path, true);
    };
    
    this.export = function(filename) {
        var text = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>" + "\n";
        text += this.storyboard.writeXml();
        saveTextToFile(filename, text);
    }
    
}
