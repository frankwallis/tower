/// <reference path="../../_references.d.ts" />

var GameSequence = require("./game-sequence");

class Trick extends GameSequence implements tower.ITrick {

    public static $inject = [ "$q", "$timeout", "$log" ];
    
    constructor($q: ng.IQService, 
                $timeout: ng.ITimeoutService,
                $log: ng.ILogService) {   
        super($q, $timeout, $log);
    	this.cards = [,,,];
    }

	public get northCard(): tower.ICard {
		return this.cards[tower.Seat.North];
	}

	public get southCard(): tower.ICard {
		return this.cards[tower.Seat.South];
	}

	public get eastCard(): tower.ICard {
		return this.cards[tower.Seat.East];
	}

	public get westCard(): tower.ICard {
		return this.cards[tower.Seat.West];
	}

	public get leadCard(): tower.ICard {
		return this.cards[this.initialPlayer.seat];
	}

    public cards: Array<tower.ICard>;
    
    public get leader(): tower.IPlayer {
        return this.initialPlayer;
    }
    
    public get winner(): tower.IPlayer {
        // TODO
        return this.initialPlayer;
    }

    public playHasEnded(): boolean {
        return !!this.northCard && !!this.southCard && !!this.eastCard && !!this.westCard;
    }
    
	public getNextState(player: tower.IPlayer): ng.IPromise<any> {
        return this.delay(player.play(undefined) // TODO
			.then((card) => {
				this.cards[ player.seat ] = card;
			}), 200);
	}
}

var trickFactory = [ "$injector", ($injector) => {    
    return () => $injector.instantiate(Trick);
}];

export = trickFactory;