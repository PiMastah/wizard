module.exports = {
    create: function (name) {
        return new Account(name);
    }
};

var Account = function (name) {
    this.name = name;
    this.players = [];
    this.rooms = [];
};

Account.prototype.joinRoom = function (room) {
    this.rooms.push(room);
};