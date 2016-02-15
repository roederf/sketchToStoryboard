@import 'storyboard.js'

// Features:
// Export Artboard as ViewController + View
// Define First Artboard as Initial ViewController
// Export 1x,2x Assets
// export ImageView
// export Button ( with Image )
// export default "show" transition
// export default "exit" transition
// export shapes as customView (fill, bordercolor, thickness, radius)
// export text as label and textview (system font only)
// create reference target xcode project
// export predefined transitions (name + Segue)
// no selection: export all; nothing selected: export selected artboards only
// added support for several screen sizes
// artboard name as scene name

// Sketch Usage:
// "ImageView:name" generates imageView with 1x,2x
// "Button:artboardName" generates an button + image + transition to screen
// "Button:Exit" generates button + unwind transition
// "CustomView" generates a customView (fill, bordercolor, thickness, radius)
// "Label" generates a label with system font (color, num lines missing)
// "TextView" generates a textView with system font (color missing)
// "Button:Target:Transition adds a custom segue with given (name + Segue)

// todo:
// auto export, config export
// how to support universal screen sizes?
// add gradient fill
// add custom button (button.text, button.image)
// support for Fluid sketch plugin?
// export assets as vector (pdf?)
// more stable for shapes
// fix for font color and spacing needed


// ------ //
var _tab = "    ";
var _Button = "Button:";
var _ImageView = "ImageView:";
var _Label = "Label:";
var _TextView = "TextView:";
var _CustomView = "CustomView:";
var _sep = "_";
var _unwindAction = "unwind:";


function StoryboardExport(context) {
    this.assetSlices = [];
    this.links = [];
    this.viewControllers = {};
    this.document = context.document;
    this.storyboard = new Storyboard();
    
    var getScreenByWidthAndHeight = function(width, height) {
        if (width == 320 && height == 568) {
            return "retina4";
        }
        else if (width == 568 && height == 320) {
            return "retina4";
        }
        else if (width == 375 && height == 667) {
            return "retina47";
        }
        else if (width == 667 && height == 375) {
            return "retina47";
        }
        else if (width == 414 && height == 736) {
            return "retina55";
        }
        else if (width == 736 && height == 414) {
            return "retina55";
        }
        else if (width == 768 && height == 1024) {
            return "iPad";
        }
        else if (width == 1024 && height == 768) {
            return "iPad";
        }
        else {
            return null;
        }
    };
    
    var saveTextToFile = function(filename, text) {
      var path = [@"" stringByAppendingString:filename];
      var str = [@"" stringByAppendingString:text];
      str.dataUsingEncoding_(NSUTF8StringEncoding).writeToFile_atomically_(path, true);
    };
    
    var createFolder = function(name) {
        var fileManager = [NSFileManager defaultManager];
        [fileManager createDirectoryAtPath:name withIntermediateDirectories:true attributes:nil error:nil];
    };
    
    var createAssetSlice = function(document, layer, dir, imageName, ext, scale) {
        var imageFilename = imageName + ext + '.png';
        rect = [[layer absoluteRect] rect];
        slice = [MSExportRequest requestWithRect:rect scale:scale];
        [document saveArtboardOrSlice:slice toFile:dir + imageFilename];

        return imageFilename;
    };
    
    var createAssetLayer = function(document, layer, dir, image_set) {
        //var imageFilename = imageName + ext + '.png';
        //rect = [[layer absoluteRect] rect];
        
        //export = [[MSExportRequest alloc] init];
        
        //export.scale = scale;
        //if ([export layerIsIncluded:layer]){
        requestsArray = [MSExportRequest exportRequestsFromExportableLayer:layer];
        var requests = requestsArray.objectEnumerator();
        var count = 0;
        while( request = requests.nextObject() ){
            var filename = request.name() + "." + request.format();
            var fullName = dir + filename;
            
            log(filename);
            [document saveExportRequest:request toFile:fullName];
            if (request.scale() == 1.0){
                image_set.images[0].filename = filename;
            }
            else if (request.scale() == 2.0){
                image_set.images[1].filename = filename;
            }
            
        }
    };
    
    var convertAsImageView = function(child, artboard, view, assetSlices, storyboard) {
        assetSlices.push({
            layer: child,
            artboardName: artboard.name().trim()
        });

        // add imageview
        view.subviews.push( new ImageView(artboard.name().trim() + _sep + child.name(), child.frame().x(), child.frame().y(), child.frame().width(), child.frame().height()) );

        storyboard.resources.push( new Image(artboard.name().trim() + _sep + child.name(), child.frame().width(), child.frame().height()) );
    };
    
    var convertAsButton = function(child, artboard, view, viewCtrl, assetSlices, storyboard, scene, links) {
        assetSlices.push({
            layer: child,
            artboardName: artboard.name().trim()
        });

        var linkTarget = null;
        var transition = null;
        var parts = child.name().split(':');
        if (parts.length > 0) {
            linkTarget = parts[1];
        }
        if (parts.length > 1) {
            transition = parts[2];
        }

        var btn = new Button(artboard.name().trim() + _sep + child.name(), child.frame().x(), child.frame().y(), child.frame().width(), child.frame().height());
        view.subviews.push( btn );
        storyboard.resources.push( new Image(artboard.name().trim() + _sep + child.name(), child.frame().width(), child.frame().height()) );

        if (linkTarget) {
            if (linkTarget == "Exit") {
                var exit = new Exit();
                scene.objects.push(exit);
                if (transition) {
                    btn.connections.push( new Segue( exit.ID, "unwind", transition + "Segue" ) );   
                }
                else {
                    btn.connections.push( new Segue( exit.ID, "unwind" ) );   
                }
            }
            else {

                links.push({
                viewController: viewCtrl,
                button: btn,
                target: linkTarget,
                transition: transition
                }); 

            }

        }
    };
    
    this.convertLayer = function(artboard, scene, viewCtrl, view, layer){
        var children = layer.layers();
        
        for(var i=0; i<children.count(); i++) {
            
            var child = children.objectAtIndex(i);
            if (child.isVisible()){
                log(child.name());
                if (child.name().startsWith(_Button)) {
                    
                    convertAsButton(child, artboard, view, viewCtrl, this.assetSlices, this.storyboard, scene, this.links);
                }
                else if (child.name().startsWith(_ImageView)) {
                    
                    convertAsImageView(child, artboard, view, this.assetSlices, this.storyboard);
                }
                else if (child.isKindOfClass(MSLayerGroup)) {
                    var childView = new View();
                    childView.subviews = [];
                    childView.rect = new Rect(child.frame().x(), child.frame().y(), child.frame().width(), child.frame().height());
                    view.subviews.push(childView);
                    this.convertLayer(artboard, scene, viewCtrl, childView, child);
                }
                else if(child.isKindOfClass(MSShapeGroup)) {
                    
                    convertAsImageView(child, artboard, view, this.assetSlices, this.storyboard);
                }
                else if (child.isKindOfClass(MSTextLayer)) {
                    //log("found text: " + child.name());
                    
                    var label = new Label(child.stringValue(), child.frame().x(), child.frame().y(), child.frame().width(), child.frame().height()+1);
                    viewCtrl.view.subviews.push( label );
                }
            }
        }
    }
    
    this.autoCreateStoryboard = function(selection){
        
        var artboards = this.document.currentPage().artboards().objectEnumerator();
        
        if (selection && selection.count() > 0) {
            log(selection.count());
            artboards = selection.objectEnumerator();
        }
        
        var initalViewControllerDefined = false;
        // for each artboard do create viewcontroller
        //var artboards = this.document.currentPage().artboards().objectEnumerator();
        while (artboard = artboards.nextObject()) {
            var artboardName = artboard.name().trim();
            log(artboardName);

            var scene = new Scene();
            scene.point = new Point(artboard.frame().x(), artboard.frame().y());
            var viewCtrl = new ViewController("ViewController", artboardName);
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
                // check for landscape
                if (artboard.frame().width() > artboard.frame().height()) {
                    viewCtrl.simulatedOrientationMetrics = new SimulatedOrientationMetrics("landscapeRight");
                }
                
                viewCtrl.view.rect = new Rect(0, 0, artboard.frame().width(), artboard.frame().height());
            }

            this.convertLayer(artboard, scene, viewCtrl, viewCtrl.view, artboard);

        }

        // resolve links:
        for (var i=0; i<this.links.length; i++) {
            var link = this.links[i];
            var viewCtrl = this.viewControllers[link.target];
            if (viewCtrl) {
                var btn = link.button;
                if (link.transition){
                    btn.connections.push( new Segue( viewCtrl.ID, "show", link.transition + "Segue" ) );   
                }
                else {
                    btn.connections.push( new Segue( viewCtrl.ID, "show" ) );   
                }
                log ("connected to:" + link.target); 
            }
        }
        
    };
    
    this.createStoryboard = function(selection){
        
        var artboards = this.document.currentPage().artboards().objectEnumerator();
        
        if (selection && selection.count() > 0) {
            log(selection.count());
            artboards = selection.objectEnumerator();
        }
        
        var initalViewControllerDefined = false;
        // for each artboard do create viewcontroller
        //var artboards = this.document.currentPage().artboards().objectEnumerator();
        while (artboard = artboards.nextObject()) {
            var artboardName = artboard.name().trim();
            log(artboardName);

            var scene = new Scene();
            scene.point = new Point(artboard.frame().x(), artboard.frame().y());
            var viewCtrl = new ViewController("ViewController", artboardName);
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
                // check for landscape
                if (artboard.frame().width() > artboard.frame().height()) {
                    viewCtrl.simulatedOrientationMetrics = new SimulatedOrientationMetrics("landscapeRight");
                }
                
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

                    var label = new Label(layer.stringValue(), layer.frame().x(), layer.frame().y(), layer.frame().width(), layer.frame().height()+1);
                    viewCtrl.view.subviews.push( label );
                }
                else if (name.startsWith(_TextView)) {
                    var frame = layer.frame();
                    //var color = new RGBColor(layer.textColor().red(), layer.textColor().green(), layer.textColor().blue(), layer.textColor().alpha());

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

                    //log ("found custom view:");
                    var customView = new CustomView(frame.x(),frame.y(),frame.width(),frame.height());

                    var fills = style.fills();
                    if (fills.count() > 0){
                        var fill = fills.array().firstObject();
                        if (fill != null) {
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

                    var linkTarget = null;
                    var transition = null;
                    var parts = name.split(':');
                    if (parts.length > 0) {
                        linkTarget = parts[1];
                    }
                    if (parts.length > 1) {
                        transition = parts[2];
                    }

                    var btn = new Button(artboardName + _sep + name, layer.frame().x(), layer.frame().y(), layer.frame().width(), layer.frame().height());
                    //log("btn" + name +" x:" + layer.frame().x() + ", y: " + layer.frame().y());
                    viewCtrl.view.subviews.push( btn );
                    this.storyboard.resources.push( new Image(artboardName + _sep + name, layer.frame().width(), layer.frame().height()) );

                    if (linkTarget) {
                        if (linkTarget == "Exit") {
                            var exit = new Exit();
                            scene.objects.push(exit);
                            if (transition) {
                                btn.connections.push( new Segue( exit.ID, "unwind", transition + "Segue" ) );   
                            }
                            else {
                                btn.connections.push( new Segue( exit.ID, "unwind" ) );   
                            }
                        }
                        else {

                            this.links.push({
                            viewController: viewCtrl,
                            button: btn,
                            target: linkTarget,
                            transition: transition
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
                    var frame = layer.frame();
                    log("position: " + frame.x() + " " + frame.y());
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
                if (link.transition){
                    btn.connections.push( new Segue( viewCtrl.ID, "show", link.transition + "Segue" ) );   
                }
                else {
                    btn.connections.push( new Segue( viewCtrl.ID, "show" ) );   
                }
                log ("connected to:" + link.target); 
            }
        }
        
    };
        
    this.export = function(directory, filename) {
        
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
                        
            //image_set.images[0].filename = createAssetSlice(this.document, layer, imageDir, imageName, '@1x', 1.0);
            //image_set.images[1].filename = createAssetSlice(this.document, layer, imageDir, imageName, '@2x', 2.0);
            createAssetLayer(this.document, layer, imageDir, image_set);       
            
            text = JSON.stringify(image_set);
        
            filename = imageDir + 'Contents.json';
            saveTextToFile(filename, text);

        }
        
    }
    
}