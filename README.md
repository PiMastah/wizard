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
  * Round (number n = 1..60/p)
    0. Deal cards (n per player)
      * Determine trump suit
    1. Bid (player's bid b)
    2. Play (n times)
      * Tricks
        1. Play card (each player)
        2. Take
    3. Points
      * if actual takes = b : 20 + 10b Points
      * else -10b Points

### Deck
* 4 suits
  * Humans (blue)
  * Dwarves (red)
  * Elves (green)
  * Giants (yellow)
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
3. First played suit
  * If first played suit > 0, highest first played suit takes
4. Jester
  * If played non-jesters = 0, first played jester takes
