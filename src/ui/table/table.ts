/// <reference path="../../_references.d.ts" />

import {
   Component, View,
   For, Switch, SwitchWhen} from 'angular2/angular2.js';

import {PlayerService, IPlayer} from "../../services/player-service";
import {GameService} from "../../services/game-service";
import {Seat, seatName} from "../../model/core/seat";

import {HandComponent} from "./hand";
import {BiddingBox} from "./bidding-box";
import {BiddingHistory} from "./bidding-history";
import {TrickComponent} from "./trick";

/**
 * Top-Level View for displaying the current game from the GameStore
 */
@Component({
   selector: 'table-view',
   injectables: [GameService, PlayerService]
})
@View({
   templateUrl: 'src/ui/table/table.html',
   directives: [
      For, Switch, SwitchWhen,
      BiddingBox, HandComponent, BiddingHistory, TrickComponent,
   ]
})

export class TableView {
   constructor(gameService: GameService, playerService: PlayerService) {
      this.seats = Seat.all();
      this.players = playerService.players;
      this.gameService = gameService;
      this.Seat = Seat;
   }
   
   public seats: Array<number>;
   public players: Array<IPlayer>;
   public gameService: GameService;
   public Seat: any;
}
