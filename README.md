# slotart-slot-game
All the modules for the initial Slot Art game.

## Slot art game framework start
Quick overview of "what's what" in this folder and what's the main idea. 

At the moment following modules are in this repository, but the idea is to put them to separate repos.

### github-slot-game
This is game I found on github that looked ok for a starting position.
After looking into it, it's pretty bad, but for now, we can use it. 

### slotart-communicator-app
This will be API module most likely written in node express, and that will allow us to connect to different RGS.

### slotart-controller-app
This will be REACT module that will be the link between the pixi.js and API. 
This should control the game 

### slotart-game-library
Future library for all the pixi.js components

### the-game
project that should be the first game and should combine all the other modules using npm.

To connect all the modules inside the game, we can use `npm link` to link the module that's present locally.