module.exports = {
	create: function (suit, rank) {
		return new Card(suit, rank);
	}
};

var Card = function (suit, rank) {
	this.suit = suit;
	this.rank = rank;

    return this;
};