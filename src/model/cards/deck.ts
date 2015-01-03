/// <reference path="../../_references.d.ts" />

import Hand = require("./hand");

class Deck implements tower.IDeck {

    constructor() {
    	this.cards = this.createCards();
    }

    private cards: Array<tower.ICard>;

    private createCards(): Array<tower.ICard> {
    	var result = [];

    	for (var asuit = tower.Suit.Clubs; asuit <= tower.Suit.Spades; asuit++) {
	    	for (var apip = tower.Pip.Two; apip <= tower.Pip.Ace; apip++) {
    				result.push({ suit: asuit, pip: apip });
    		}
    	}

    	return result;
    }

    private shuffleCards(array: Array<tower.ICard>): Array<tower.ICard> {
		var i = array.length, j, swap;
  
  		while (--i) {
    		j = Math.random() * (i + 1) | 0;
    		swap = array[i];
    		array[i] = array[j];
    		array[j] = swap;
  		}

  		return array;
    }

    public shuffle() {
    	this.cards = this.shuffleCards(this.cards);
    }

	public deal(hands: number): Array<Array<tower.ICard>> {

		var current = 0;
		var result = [];

        while (current < this.cards.length) {
            var hand = current % hands;    
            
			if (!result[hand])
				result[hand] = [];

			result[hand].push(this.cards[current]);

            current ++;
        }

		return result;
	}
}

export = Deck;