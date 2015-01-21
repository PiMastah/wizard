var roomFactory = require('./room');

module.exports = {
    create: function () {
        return new Lobby();
    }
};

var Lobby = function () {
    this.accounts = [];
    this.rooms = [];
    this.openRoom();
    return this;
};

Lobby.prototype.join = function (account) {
    this.accounts.push(account);
    account.lobby = this;

    return this;
};

Lobby.prototype.leave = function (account) {
    var i = this.accounts.indexOf(account);
    if (-1 < i) {
        this.accounts.splice(i, 1);
        account.lobby = undefined;
    }
    return this;
};

Lobby.prototype.hasOpenRooms = function () {
    return this.rooms.some(function (room) {
        return (room.isFull() === false);
    });
};

Lobby.prototype.openRoom = function () {
    this.rooms.push(roomFactory.create());

    return this;
};

Lobby.prototype.getRoomById = function (roomId) {
    return this.rooms.filter(function (room) {
         if (room.id === roomId) {
             return room;
         }
    }).pop();
};