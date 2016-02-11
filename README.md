# sketchToStoryboard
Sketch Plugin to export artboards into an iOS Storyboard as a native prototype

Sketch Version: ≥ 3.5
Tested with XCode 7.1

Installation:
- Create a folder named "prototypeStoryboard.sketchplugin" in sketch plugin folder
- Copy "Contents" folder of this repository into prototypeStoryboard.sketchplugin (maybe use terminal)
- Plugin should show up in Sketch

How to use:
- Create a new SingleView iOS Application with Xcode
- Select the artboards from your sketch documents (or nothing to export all)
- Click "Export" from this plugin
- Choose project folder of your created iOS App
- The "Main.Storyboard" file will be recreated
- Run your prototype app

Features and details:
- Each Artboard will be converted into an own ViewController
- The First Artboard will be the initial ViewController
- All assets are created as 1x and 2x automatically
- Name a layer or slice as "ImageView:someName" and it will be converted as ImageView with image called "someName"
- Name a layer "Button:artboardName" and it will be converted into a Button with image and a segue to ViewController "artboardName"
- Name a layer "Button:artboardName:transition" and it will be converted into a Button with image and a custom segue called "transitionSegue"
- Name a layer "Button:Exit" to create a button and a exit segue
- Name a layer "CustomView:name" to create a View based on a CustomView supporting background, border and radius
- Name a text "Label:something" to create a Label (system font is used)
- Name a text "TextView:something" to create a TextView (not editable by default, currently produces wrong margins)

Next Steps:
- Will add a complete example
- Will add the xcode project with customview and transitions
