module.exports = {};

module.exports = {
	create: function () {
		return new ComparisonPolicy();
	}
};

var cardFactory = require('./card');

var ComparisonPolicy = function () {
	var self = this;
    this.trumpSuit = '';

    return this;
};

ComparisonPolicy.prototype.rank = function (card1, card2) {
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

    if (card1.suit === card2.suit) {
        return card1.rank < card2.rank ? card2 : card1;
    }

    if (card1.suit === this.trumpSuit) {
        return card1;
    }

    if (card2.suit === this.trumpSuit) {
        return card2;
    }

	return card1;
};

ComparisonPolicy.prototype.setTrumpSuit = function (suit) {
    this.trumpSuit = suit;
};

ComparisonPolicy.prototype.compare = function (trick) {
    var indexHighest;
    var self = this;
    trick.forEach(function (card, index) {
        if (!indexHighest) {
            indexHighest = index;
        } else {
            if (card === self.rank(trick[indexHighest], card)) {
                indexHighest = index;
            }
        }
    });
    return indexHighest;
};