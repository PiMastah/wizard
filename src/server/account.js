var when = require('when');
var sequence = require('when/sequence');
var uuid = require('node-uuid');
var EventEmitter = require('events').EventEmitter;

module.exports = {
    create: function (name) {
        return new Account(name);
    }
};

var Account = function (name) {
    this.name = name;
    this.players = [];
};