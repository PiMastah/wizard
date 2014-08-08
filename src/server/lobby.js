module.exports = {
    create: function () {
        return new Lobby();
    }
};

var Lobby = function () {
    this.accounts = [];
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