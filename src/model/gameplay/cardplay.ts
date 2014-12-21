/// <reference path="../../_references.d.ts" />

import GameSequence = require("./game-sequence");

class Cardplay extends GameSequence {

    public static $inject = [ "$q", "$timeout", "trickFactory" ];
    
    constructor($q: ng.IQService, 
                $timeout: ng.ITimeoutService,
                trickFactory: () => tower.ITrick) {   
        super($q, $timeout);
            
        this.tricks = [];
        for (var i = 0; i < 13; i ++)
            this.tricks.push(trickFactory());
    }
    
    public tricks: Array<tower.ITrick>;
    public currentTrickIndex: number = 0;
    public get currentTrick(): tower.ITrick {
        return this.tricks[this.currentTrickIndex];
    }
    
	public getNextState(player: tower.IPlayer): ng.IPromise<any> {
        this.currentTrickIndex ++;
        this.currentTrick.setPlayers(this.players);
        return this.currentTrick.play(player);
    }
    
    public getNextPlayer(): tower.IPlayer {
        if (this.currentTrick)
            return this.currentTrick.winner;
        else
            return this.initialPlayer;
    }
    
    public playHasEnded(): boolean {
        return (this.currentTrickIndex == 12) && this.currentTrick.playHasEnded();
    }
}

var cardplayFactory = [ "$injector", ($injector) => {    
    return () => $injector.instantiate(Cardplay);
}];

export = cardplayFactory;