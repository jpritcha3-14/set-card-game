# SET
A JavaScript implementation of the popular [SET card game](https://en.wikipedia.org/wiki/Set_(card_game)).  SET is both a fun solitaire and multiplayer game since it doesn't rely on players taking turns, only pattern recognition speed.  The current version of the game [can be played on GitHub Pages by clicking here](https://jpritcha3-14.github.io/set-card-game/).

The game consists of 81 unique cards containing symbols with 3 variants of 4 properties: 
* Number of symbols (1, 2, 3)
* Color (red, green, purple)
* Shape (oval, diamond, squiggle)
* Shading (open, striped, solid)

The goal of the game is to identify SETs of 3 cards where, for each of the 4 properties, all 3 cards have the same variant or all three cards have a different variant.

Click 3 cards to identify a SET.  The script checks the validity of the selected cards as a SET before replacing the cards with 3 more from the deck.  If the selected cards do not form a SET, the reason(s) for this will be displayed to help new players understand the concept.  If there are no SETs in the 12 cards on board, click the deck to shuffle and deal 12 new cards.  Note that the script will check for SETs on board and only redeal cards if there are none (sometimes SETs are very hard to see!)

## Set Examples 
![alt text](https://github.com/jpritcha3-14/set-card-game/blob/master/cards/4.png) | 
![alt text](https://github.com/jpritcha3-14/set-card-game/blob/master/cards/13.png) | 
![alt text](https://github.com/jpritcha3-14/set-card-game/blob/master/cards/22.png)
--- | --- | ---
* Same number
* Same color
* Same shape
* Different shading
***
![alt text](https://github.com/jpritcha3-14/set-card-game/blob/master/cards/24.png) | 
![alt text](https://github.com/jpritcha3-14/set-card-game/blob/master/cards/52.png) | 
![alt text](https://github.com/jpritcha3-14/set-card-game/blob/master/cards/80.png)
--- | --- | ---
* Different number
* Different color
* Same shape
* Same shading
***
![alt text](https://github.com/jpritcha3-14/set-card-game/blob/master/cards/77.png) | 
![alt text](https://github.com/jpritcha3-14/set-card-game/blob/master/cards/54.png) | 
![alt text](https://github.com/jpritcha3-14/set-card-game/blob/master/cards/70.png)
--- | --- | ---
* Different number
* Same color
* Different shape
* Different shading
***
![alt text](https://github.com/jpritcha3-14/set-card-game/blob/master/cards/16.png) | 
![alt text](https://github.com/jpritcha3-14/set-card-game/blob/master/cards/32.png) | 
![alt text](https://github.com/jpritcha3-14/set-card-game/blob/master/cards/72.png)
--- | --- | ---
* Different number
* Different color
* Different shape
* Different shading
