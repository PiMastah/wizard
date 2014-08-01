# Wizard - A trick-taking card game

* node.js
* angular.js
* websocket

## Game Mechanics

### Lobby
 * Lobby State
 * User/Account
 * Game
   * Event
   * Game State

### Game
* Number of players p
  * Round (number of rounds r = 1..60/p)
    0. Deal cards (r per player)
      * Determine trump suit
    1. Bid (player's bid b)
    2. Play (r times)
      * Tricks
        1. Play card (each player in turn)
        2. Take
    3. Points
      * if actual takes = b : 20 + 10b Points
      * else -10b Points

### Deck
* 4 suits
  * Clubs
  * Diamonds
  * Hearts
  * Spades
* Ranks
  * 1..13
* 8 special cards (no suit)
  * 4 wizards
  * 4 jesters
 
### Trick-taking
1. Wizard
  * If played wizards > 0, first played wizard takes
2. Trump suit
  * If played trumps > 0, highest trump takes
3. Followed suit
  * If followed suit > 0, highest followed suit takes
4. Jester
  * If played non-jesters = 0, first played jester takes

## Programmatical Mechanic

### Ranks
  * Wizard = Rank 14
  * full french deck = Rank 1..13 accordingly
  * Jester = Rank 0

### Suits
  * Wizard = Rank 4
  * Trump suit = Rank 3
  * Followed suit = Rank 2
  * Non trump && non followed suits = Rank 1
  * Jester = Rank 0
  
