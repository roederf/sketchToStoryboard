@import 'export.js'
/*
var onPrepare = function(content)
{
    var document = context.document;
    var plugin = context.plugin;
    var command = context.command;
    
    var artboards = document.currentPage().artboards().objectEnumerator();
    while (artboard = artboards.nextObject()) {
        
        [command setValue:artboard.name() forKey:"View" onLayer:artboard];
    }
}
*/

var onRun = function(context)
{
    var documentName = context.document.displayName();
    var plugin = context.plugin;
    //var command = context.command;
    
    var fileURL = fileSaver();
    var directory = fileURL.path();
    var filename = fileURL.path() + '/Export.storyboard';
    
    log("Writing document: " + filename);
    
    //var templateUrl = plugin.urlForResourceNamed("main.storyboard");
    //log(templateUrl);
        
    //text += readTextFromFile(templateUrl);
    
    var storyboardExport = new StoryboardExport(context);
    storyboardExport.createStoryboard(context.selection);
    storyboardExport.export(directory, filename);
    
    log("success.");
    
    showMessage("Storyboard created.");
};

function showMessage(msg) {
    var app = [NSApplication sharedApplication];
    [app displayDialog:msg withTitle:"Message"];
}

function createFolder(name) {
  var fileManager = [NSFileManager defaultManager];
  [fileManager createDirectoryAtPath:name withIntermediateDirectories:true attributes:nil error:nil];
}

function readTextFromFile (filename) {
  
    //var result = @"";
    //result = result.stringWithContentsOfFile_usedEncoding_(filename, NSUTF8StringEncoding);
    var result = [NSString stringWithContentsOfFile:filename];
    
    return result;
}

function fileSaver() {
    // Panel
    var openPanel = [NSOpenPanel openPanel]

    [openPanel setTitle: "Choose a location…"]
    [openPanel setMessage: "Select the export location…"];
    [openPanel setPrompt: "Export"];

    [openPanel setCanCreateDirectories: true]
    [openPanel setCanChooseFiles: false]
    [openPanel setCanChooseDirectories: true]
    [openPanel setAllowsMultipleSelection: false]
    [openPanel setShowsHiddenFiles: false]
    [openPanel setExtensionHidden: false]

    // [openPanel setDirectoryURL:url]

    var openPanelButtonPressed = [openPanel runModal]
    if (openPanelButtonPressed == NSFileHandlingPanelOKButton) {
        allowedUrl = [openPanel URL]
    }
    return allowedUrl
}