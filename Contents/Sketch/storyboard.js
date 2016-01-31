@import 'helper.js'

// todo:
// initial ViewController
// add Button + transition instead of imageview
// create 2x and 3x assets
// define name conventions to slice artboard into UI Elements
// add support for several screen sizes
// convert text as text
// convert simple shapes into views without use of bitmaps?
// export assets as vector (pdf?)


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

function ViewController(name) {
    this.ID = generateID();
    this.customClass = name;
    this.customModuleProvider = "target";
    this.sceneMemberID = "viewController";
    this.layoutGuides = [ new ViewControllerLayoutGuide("top"), new ViewControllerLayoutGuide("bottom") ];
    this.view = new View();
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

// ------ //

function StoryboardExport(doc) {
    this.assetSlices = [];
    
    var getScreenByWidthAndHeight = function(width, height) {
        if (width == 320 && height == 568) {
            return "retina4";
        }
        else {
            return null;
        }
    };
    
    this.storyboard = new Storyboard();
    var initalViewControllerDefined = false;
    // for each artboard do create viewcontroller
    var artboards = doc.currentPage().artboards().objectEnumerator();
    while (artboard = artboards.nextObject()) {
        var artboardName = artboard.name().trim();
        log(artboardName);
        this.assetSlices.push(artboard);
                
        var scene = new Scene();
        scene.point = new Point(artboard.frame().x(), artboard.frame().y());
        var viewCtrl = new ViewController("ViewController");
        scene.objects.push(viewCtrl);
        scene.objects.push(new Placeholder());
        this.storyboard.scenes.push(scene);
        
        // just select the first artboard as inital view
        if (!initalViewControllerDefined) {
            this.storyboard.initialViewController = viewCtrl.ID;
            initalViewControllerDefined = true;
        }
        
        var screenType = getScreenByWidthAndHeight(artboard.frame().width(), artboard.frame().height());
        if (screenType) {
            viewCtrl.simulatedScreenMetrics = new SimulatedScreenMetrics(screenType);
            viewCtrl.view.rect = new Rect(0, 0, artboard.frame().width(), artboard.frame().height());
        }
        
        // add imageview
        viewCtrl.view.subviews = [];
        viewCtrl.view.subviews.push( new ImageView(artboardName, viewCtrl.view.rect.x, viewCtrl.view.rect.y, viewCtrl.view.rect.width, viewCtrl.view.rect.height) );
        
        this.storyboard.resources.push( new Image(artboardName, artboard.frame().width(), artboard.frame().height()) );
    }
        
    var saveTextToFile = function(filename, text) {
      var path = [@"" stringByAppendingString:filename];
      var str = [@"" stringByAppendingString:text];
      str.dataUsingEncoding_(NSUTF8StringEncoding).writeToFile_atomically_(path, true);
    };
    
    var createFolder = function(name) {
        var fileManager = [NSFileManager defaultManager];
        [fileManager createDirectoryAtPath:name withIntermediateDirectories:true attributes:nil error:nil];
    };
    
    this.export = function(directory, filename, document) {
        
        var image_set = {
            images: [
                {
                    idiom: "universal",
                    scale: "1x"
                },
                {
                    idiom: "universal",
                    scale: "2x"
                },
                {
                    idiom: "universal",
                    scale: "3x"
                }
            ],
            info: {
                version: 1,
                author: "xcode"
            }
        };
        
        var text = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>" + "\n";
        text += this.storyboard.writeXml();
        saveTextToFile(filename, text);
        log(directory);
        
        // export images with scale @1x
        for(var i=0; i<this.assetSlices.length; i++) {
            var slice = this.assetSlices[i];
            var imageDir = directory + '/Assets.xcassets/' + slice.name() + '.imageset/';
            var imageFilename = slice.name() + '@1x.png';
            
            [document saveArtboardOrSlice:slice toFile:imageDir + imageFilename];
            
            // only 1x for now
            image_set.images[0].filename = imageFilename;
            text = JSON.stringify(image_set);
        
            filename = imageDir + 'Contents.json';
            saveTextToFile(filename, text);

        }
        
    }
    
}
