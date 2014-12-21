/// <reference path="../_references.d.ts" />

require("angular.js");

var modUiRouter = require("ui-router");
import cards = require("./cards/index");
import board = require("./board/index");
import player = require("./player/index");

export var Module: ng.IModule = angular.module("tower.ui", [ 
	modUiRouter, cards.Module.name, board.Module.name, player.Module.name
]);

Module.config(["$stateProvider", "$urlRouterProvider", "$locationProvider", ($stateProvider: any, $urlRouterProvider: any, $locationProvider: ng.ILocationProvider) => {
        $locationProvider.html5Mode(true);

		$stateProvider.state('menu', {
				controller: require('./menu/menu-controller'),
				controllerAs: "menuCtrl",
				template: require('./menu/menu-view.html'),
				url: '/menu'
			});

		$stateProvider.state('table', {
				controller: require('./table/table-controller'),
				controllerAs: "tableCtrl",
				template: require('./table/table-view.html'),
                params: {
                    "game": {},
                    "players": []
                }
				
			});

//		$stateProvider.state('table.bidding', {
//				controller: require('./table/bidding/bidding-controller'),
//				controllerAs: "bidCtrl",
//				template: require('./table/bidding/bidding-view.html')
//			});
//
//		$stateProvider.state('table.play', {
//				controller: require('./table/play/play-controller'),
//				controllerAs: "playCtrl",
//				template: require('./table/play/play-view.html')
//			});
//
//		$stateProvider.state('table.result', {
//				controller: require('./table/result/result-controller'),
//				controllerAs: "resultCtrl",
//				template: require('./table/result/result-view.html')
//			});

        $urlRouterProvider.otherwise("/menu");
    }]);
