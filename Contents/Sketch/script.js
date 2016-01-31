@import 'storyboard.js'

var onRun = function(context) 
{
    var documentName = context.document.displayName();
    var plugin = context.plugin;
    
    var fileURL = fileSaver();
    var directory = fileURL.path();
    var filename = fileURL.path() + '/main.storyboard';
        
    //var selectedLayers = context.selection;
    //var selectedCount = selectedLayers.count();
    
    //if (selectedCount == 0) {
    //    var selectedLayers = context.document.currentPage().layers();
    //} 
    
    if (writeDocument(directory, filename, context.document)) {
        showMessage("Storyboard created.");
    }
    else {
        showMessage("Export failed.");
    }
    
};

function showMessage(msg) {
    var app = [NSApplication sharedApplication];
    [app displayDialog:msg withTitle:"Message"];
}

function writeDocument(directory, filename, document) {
    log("Writing document: " + filename);
    
    //var templateUrl = plugin.urlForResourceNamed("main.storyboard");
    //log(templateUrl);
        
    //text += readTextFromFile(templateUrl);
    
    var storyboardExport = new StoryboardExport(document);
    storyboardExport.export(directory, filename, document);
    
    log("Success.");
    
    return true;
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