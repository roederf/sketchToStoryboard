@import 'helper.js'
@import 'primitives.js'

// Features:
// Export Artboard as ViewController + View
// Define First Artboard as Initial ViewController
// Export 1x,2x Assets
// export ImageView
// export Button ( with Image )
// export default "show" transition
// export default "exit" transition

// todo:
// export shapes as customView
// export text as label
// export predefined transitions
// use selection for export
// add support for several screen sizes?
// export assets as vector (pdf?)


var _tab = "    ";
var _Button = "Button:";
var _ImageView = "ImageView:";
var _Label = "Label:";
var _TextView = "TextView:";
var _CustomView = "CustomView:";
var _sep = "_";
var _unwindAction = "unwind:";

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
    this.lineBreakMode="tailTruncation";
    this.baselineAdjustment="alignBaselines";
    this.adjustsFontSizeToFit="NO"
    this.translatesAutoresizingMaskIntoConstraints="NO";
    this.numberOfLines="1";
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

function Segue(destID, kind) {
    this.destination=destID;
    this.kind=kind; // {"show", "unwind"}
    if (kind=="unwind") {
        this.unwindAction = _unwindAction;
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

// ------ //

function StoryboardExport(doc) {
    this.assetSlices = [];
    this.links = [];
    this.viewControllers = {};
    
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
        
        var scene = new Scene();
        scene.point = new Point(artboard.frame().x(), artboard.frame().y());
        var viewCtrl = new ViewController("ViewController");
        scene.objects.push(viewCtrl);
        scene.objects.push(new Placeholder());
        this.storyboard.scenes.push(scene);
        viewCtrl.view.subviews = [];
        // collect all view controllers by name
        this.viewControllers[artboardName] = viewCtrl;
        
        // just select the first artboard as inital view
        if (!initalViewControllerDefined) {
            this.storyboard.initialViewController = viewCtrl.ID;
            initalViewControllerDefined = true;
        }
        
        // determine screen type and size
        var screenType = getScreenByWidthAndHeight(artboard.frame().width(), artboard.frame().height());
        if (screenType) {
            viewCtrl.simulatedScreenMetrics = new SimulatedScreenMetrics(screenType);
            viewCtrl.view.rect = new Rect(0, 0, artboard.frame().width(), artboard.frame().height());
        }
        
        var layers = artboard.children().objectEnumerator();
        while (layer = layers.nextObject()) {
            var name = layer.name();
            //log(name);
            if (name.startsWith(_Label)) {
                log(name);
                //log(layer.stringValue());
                //log(layer.fontSize());
                //log(layer.fontPostscriptName());
                //log(layer.textColor());
                
                var label = new Label(layer.stringValue(), layer.frame().x(), layer.frame().y(), layer.frame().width(), layer.frame().height());
                viewCtrl.view.subviews.push( label );
            }
            else if (name.startsWith(_TextView)) {
                var frame = layer.frame();
                //var color = new RGBColor(layer.textColor().red(), layer.textColor().green(), layer.textColor().blue(), layer.textColor().alpha());
                
                log(layer.fontPostscriptName());
                log(layer.textAlignment());
                log(layer.characterSpacing());
                log(layer.lineSpacing());
                
                var textview = new TextView(layer.stringValue(), frame.x(), frame.y(), frame.width(), frame.height(), new FontDescription(layer.fontSize()));
                viewCtrl.view.subviews.push(textview);
            }
            else if (name.startsWith(_CustomView)) {
                var frame = layer.frame();
                var style = layer.style();
                var radius = 0.0;
                if(layer.isKindOfClass(MSShapeGroup)) {
                    var shape=layer.layers().firstObject();
                    if(shape && shape.isKindOfClass(MSRectangleShape)) {
                        radius=shape.cornerRadiusFloat();
                    }
                }
                    
                log ("found custom view:");
                var customView = new CustomView(frame.x(),frame.y(),frame.width(),frame.height());
                
                //log(style.fills().count());
                //log(style.borders().count());
                var fills = style.fills();
                if (fills.count() > 0){
                    var fill = fills.array().firstObject();
                    if (fill != null) {
                        //log(fill.color().hexValue());
                        customView.setBackground(new RGBColor(fill.color().red(),fill.color().green(),fill.color().blue(),1.0));
                    }
                }
                var borders = style.borders();
                if (borders.count() > 0){
                    var border = borders.array().firstObject();
                    if (border != null) {
                        customView.setBorder(new RGBColor(border.color().red(), border.color().green(), border.color().blue(), border.color().alpha()), border.thickness(), radius);
                    }
                }
                
                
                viewCtrl.view.subviews.push(customView);
            }
            else if (name.startsWith(_Button)) {
                
                this.assetSlices.push({
                    layer: layer,
                    artboardName: artboardName
                });
                
                var btn = new Button(artboardName + _sep + name, layer.frame().x(), layer.frame().y(), layer.frame().width(), layer.frame().height());
                log("btn" + name +" x:" + layer.frame().x() + ", y: " + layer.frame().y());
                viewCtrl.view.subviews.push( btn );
                this.storyboard.resources.push( new Image(artboardName + _sep + name, layer.frame().width(), layer.frame().height()) );
                
                var linkTarget = name.substr(_Button.length);
                if (linkTarget) {
                    if (linkTarget == "Exit") {
                        var exit = new Exit();
                        scene.objects.push(exit);
                        btn.connections.push( new Segue( exit.ID, "unwind" ) );
                    }
                    else {
                        this.links.push({
                        viewController: viewCtrl,
                        button: btn,
                        target: linkTarget
                        });    
                    }
                    
                }
                
            }
            else if (name.startsWith(_ImageView)) {
                
                this.assetSlices.push({
                    layer: layer,
                    artboardName: artboardName
                });
                
                // add imageview
                viewCtrl.view.subviews.push( new ImageView(artboardName + _sep + name, layer.frame().x(), layer.frame().y(), layer.frame().width(), layer.frame().height()) );

                this.storyboard.resources.push( new Image(artboardName + _sep + name, layer.frame().width(), layer.frame().height()) );
            }
            
        }
        
    }
    
    // resolve links:
    for (var i=0; i<this.links.length; i++) {
        var link = this.links[i];
        var viewCtrl = this.viewControllers[link.target];
        if (viewCtrl) {
            var btn = link.button;
            btn.connections.push( new Segue( viewCtrl.ID, "show" ) );
            log ("connected to:" + link.target); 
        }
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
    
    var createAsset = function(document, layer, dir, imageName, ext, scale) {
        var imageFilename = imageName + ext + '.png';
        rect = [[layer absoluteRect] rect];
        slice = [MSExportRequest requestWithRect:rect scale:scale];
        [document saveArtboardOrSlice:slice toFile:dir + imageFilename];

        return imageFilename;
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
            var asset = this.assetSlices[i];
            var layer = asset.layer;
            var imageName = asset.artboardName + _sep + layer.name();
            var imageDir = directory + '/Assets.xcassets/' + imageName + '.imageset/';
                        
            image_set.images[0].filename = createAsset(document, layer, imageDir, imageName, '@1x', 1.0);
            image_set.images[1].filename = createAsset(document, layer, imageDir, imageName, '@2x', 2.0);
            
            text = JSON.stringify(image_set);
        
            filename = imageDir + 'Contents.json';
            saveTextToFile(filename, text);

        }
        
    }
    
}
