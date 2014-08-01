module.exports = {};

module.exports = {
	create: function () {
		return new CardRanker();
	}
};

var cardFactory = require('./card');

var CardRanker = function () {
	var self = this;

};

CardRanker.prototype.compare = function (card1, card2) {
	if ('wizards' === card1.suit) {
		return card1;
	}

	if ('wizards' === card2.suit) {
		return card2;
	}

	if ('jesters' === card2.suit) {
		return card1;
	}

	if ('jesters' === card1.suit) {
		return card2;
	}

	return card1;
};
