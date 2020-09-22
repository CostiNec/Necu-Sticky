# Necu-Sticky  
 Make your sidebar an vertical sidebar sticky
  
# Disadvantage

 This library uses style in-line + you can not write css in-line on your sidebar/container element, because they will be overwritten

# Usage
General function:  

necuStickySidebar(sidebar, container, options)
  
sidebar - should be your element that you want to become sticky  
container - should be your element which delimits you sidebar (default window)  
options - distanceBottom: the distance between your sidebar and your bottom screen (default 0)  
          distanceTop: the distance between your sidebar and your top screen (default 0)  
          direction: top/bottom   
  
This library offers you 3 ways for make your sidebar/navbar sticky:  
  
TOP STICKY: Like an normal mobile navbar (set in options { direction: 'top' } )  
  
BOTTOM STICKY: This make your sidebar sticky on the bottom of the screen (be sure that your screen is lower than your sidebar, otherwise won't work, because make no sense :/, set in options { direction: 'bottom' } )    
  
TOP-BOTTOM STICKY: This make your sidebar sticky bottom and top aswell, be sure again that your screen is lower than your sidebar. For this just don't set the parameter "direction" in your options, other wise won't work.  
  
  
You can install this by downloading the code or via NPM
https://www.npmjs.com/package/necu-vertical-sticky
