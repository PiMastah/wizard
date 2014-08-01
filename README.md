# Wizard - A trick-taking card game

* node.js
* angular.js
* websocket

===

* Lobby
  * Lobby State
  * User/Account
  * Game
    * Event
    * Game State

===

* Game
  * Round (number n = 1-60/players)
    0. Deal cards (n per player)
      * Determine trump suit
    1. Bid (player's bid b)
    2. Play (n times)
      * Tricks
        1. Each player plays card
        2. Take
    3. Points
      * actual takes = b => 20 + 10b Points
      * else -10b Points
