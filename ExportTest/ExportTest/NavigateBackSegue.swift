//
//  NavigateBackSegue.swift
//  ExportTest
//
//  Created by Florian Roeder on 03/02/16.
//  Copyright © 2016 SprintEins GmbH. All rights reserved.
//
import Foundation
import UIKit

class NavigateBackSegue : UIStoryboardSegue {
    
    override func perform() {
        
        let sourceViewController = self.sourceViewController as UIViewController!
        let destinationViewController = self.destinationViewController as UIViewController!
        let duplicatedSourceView: UIView = sourceViewController.view.snapshotViewAfterScreenUpdates(false) // Screenshot of the old view.
        
        let screenWidth = UIScreen.mainScreen().bounds.size.width
        let screenHeight = UIScreen.mainScreen().bounds.size.height
        
        // present dest controller
        self.destinationViewController.dismissViewControllerAnimated(false, completion: {
            
            let destView = self.destinationViewController.view as UIView!
            
            destinationViewController.view.addSubview(duplicatedSourceView)
            duplicatedSourceView.frame = CGRectMake(screenWidth, 0.0, screenWidth, screenHeight)
            destView.frame = CGRectMake(-screenWidth, 0.0, screenWidth, screenHeight)
            
            UIView.animateWithDuration(0.33, delay: 0.0, options: UIViewAnimationOptions.CurveEaseOut, animations: { () -> Void in
                
                destView.frame = CGRectMake(0.0, 0.0, screenWidth, screenHeight)
                
                }) { (finished: Bool) -> Void in
                    duplicatedSourceView.removeFromSuperview()
            }
        })
        
        
    }
}