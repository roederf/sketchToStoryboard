# sketchToStoryboard
Sketch Plugin to export artboards into an iOS Storyboard as a native prototype

Sketch Version: ≥ 3.5
Tested with XCode 7.1

Installation:
- Create a folder named "prototypeStoryboard.sketchplugin" in sketch plugin folder
- Copy "Contents" folder of this repository into prototypeStoryboard.sketchplugin (maybe use terminal)
- Plugin should show up in Sketch

How to use:
- Copy the "Prototype" xcode project to some folder
- Select the artboards from your sketch documents (or nothing to export all)
- Click "Export Only With Keywords" from this plugin to export only layers named with keywords as a flat structure OR
- Click "Export With Layers" to export remain all layers during export and to convert text and images automatically
- Choose project folder of your created iOS App
- The "Main.Storyboard" file will be recreated
- Run your prototype app from xcode

Features and details:
- Each Artboard will be converted into an own ViewController
- The First Artboard will be the initial ViewController

In case of "Export Only With Keywords":
- All assets are created as 1x and 2x automatically
- Name a layer or slice as "ImageView:someName" and it will be converted as ImageView with image called "someName"
- Name a layer "Button:artboardName" and it will be converted into a Button with image and a segue to ViewController "artboardName"
- Name a layer "Button:artboardName:transition" and it will be converted into a Button with image and a custom segue called "transitionSegue"
- Name a layer "Button:Exit" to create a button and a exit segue
- Name a layer "CustomView:name" to create a View based on a CustomView supporting background, border and radius
- Name a text "Label:something" to create a Label (system font is used)
- Name a text "TextView:something" to create a TextView (not editable by default, currently produces wrong margins)

In case of "Export With Layers":
- All shapes and images are converted as imageview by default with 1x
- Text will be exported as label (currently only fontsize is exported)
- Add Export 1x,2x,3x where needed (with Sketch Export Tool)
- Name a layer "ImageView:someName" and it will convert whole subtree as ImageView (and ignore subtree structure)
- Name a layer "Button:artboardName" and it will be converted into a Button with image and a segue to ViewController "artboardName"
- Name a layer "Button:artboardName:transition" and it will be converted into a Button with image and a custom segue called "transitionSegue"
- Name a layer "Button:Exit" to create a button and a exit segue

Next Steps:
- Will add a complete example
- Some Sketch UI instead of names
