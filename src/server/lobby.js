var when = require('when');
var sequence = require('when/sequence');
var uuid = require('node-uuid');
var EventEmitter = require('events').EventEmitter;

module.exports = {
    create: function () {
        return new Lobby();
    }
};

var gameFactory = require('./game');

var Lobby = function () {
    this.accounts = [];
    this.games = [];
    return this;
};

Lobby.prototype.join = function (account) {
    this.accounts.push(account);
    return this;
};

Lobby.prototype.leave = function (account) {
    var i = this.accounts.indexOf(account);
    if (-1 < i) {
        this.accounts.splice(i, 1);
    }
    return this;
};

Lobby.prototype.createGame = function () {
    this.games.push()
};