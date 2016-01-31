@import 'storyboard.js'

var onRun = function(context) 
{
    
    
    var documentName = context.document.displayName();
    var plugin = context.plugin;
    
    
    var fileURL = fileSaver();
    var exportPath = fileURL.path() + '/' + documentName + '.storyboard';
        
    var selectedLayers = context.selection;
    var selectedCount = selectedLayers.count();
    
    if (selectedCount == 0) {
        var selectedLayers = context.document.currentPage().layers();
    } 
    
    if (writeDocument(plugin, exportPath, selectedLayers)) {
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

function writeDocument(plugin, filename, selectedLayers) {
    log("writeDocument: " + filename);
    var text = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>" + "\n";
    
    //var templateUrl = plugin.urlForResourceNamed("main.storyboard");
    //log(templateUrl);
        
    //text += readTextFromFile(templateUrl);
    var sb = buildStoryboard(selectedLayers);
    text += sb.writeXml();
    
    log(text);
        
    saveTextToFile(filename, text);
    
    log("success.");
    
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

function saveTextToFile (filename, text) {
  var path = [@"" stringByAppendingString:filename];
  var str = [@"" stringByAppendingString:text];
  str.dataUsingEncoding_(NSUTF8StringEncoding).writeToFile_atomically_(path, true);
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