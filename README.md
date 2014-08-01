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
  * Round (number n = 1-60/p)
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
