# sketchToStoryboard
Sketch Plugin to export artboards into an iOS Storyboard as a native prototype

Sketch Version: ≥ 3.5

- Create a folder named "prototypeStoryboard.sketchplugin" in sketch plugin folder
- Copy "Contents" folder of this repository into prototypeStoryboard.sketchplugin (maybe use terminal)
- Plugin should show up in Sketch

The plugin will create the following files in target folder:
- a storyboard as "Main.Storyboard"
- each artboard as imageset in Assets.xcassets/%Artboard_Name%

How to use:
- Create SingleView iOS App with XCode
- Export your Sketch artboards into your project folder (where default Main.Storyboard is located)
- Currently it is just a proof of concept. For now the plugin creates ViewController with ImageViews and transitions are missing.

more features and detail explaination will be available soon...
