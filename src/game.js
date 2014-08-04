var when = require('when');
var sequence = require('when/sequence');
var uuid = require('node-uuid');
var EventEmitter = require('events').EventEmitter;

module.exports = {
    create: function (players) {
        return new Game(players);
    }
};

var roundPolicyFactory = require('./roundPolicy');

var Game = function (players) {
    this.id = uuid.v4();
    this.players = players;
    this.overallPoints = [];

    this.roundPolicy = roundPolicyFactory.create(players);

    return this;
};

Game.prototype.start = function () {
    var deferred = when.defer();
    var self = this;
    var numberOfRounds = 60 / this.players.length;

    var runRound = function () {
        self.roundPolicy.initHands();
        var promise = self.roundPolicy.run().then(function (points, index) {
            points.map(function (addition) {
                self.overallPoints[index] += addition;
            });
        });
        return promise;
    };

    var tasks = [];
    for (var i = 0; i < numberOfRounds; i++) {
        tasks.push(runRound);
    }
    sequence(tasks).then(function () {
        var winnerIndex;
        var highest = 0;
        self.overallPoints.map(function (points, index) {
            if (points > highest) {
                highest = points;
                winnerIndex = index;
            }
        });
        deferred.resolve(self.players[winnerIndex]);
    });
    return deferred.promise;
};