import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { TeamsPage, TeamHomePage } from '../pages';
import { ApiService } from '../../shared/shared';



@Component({
    templateUrl: 'my-teams.page.html'
})
export class MyTeamsPage {

    favorites = [{
        team: { id: 798, name: 'MADE Elite', coach: 'Johnson' },
        tournamentId: '98c6857e-b0d1-4295-b89e-2d95a45437f2',
        tournamentName: 'Diskie 99'
    },
    {
        team: { id: 797, name: 'Reisterstown Wolfpack', coach: 'Hightower' },
        tournamentId: '98c6857e-b0d1-4295-b89e-2d95a45437f2',
        tournamentName: 'Diskie 99'
    }];

    constructor(private nav: NavController, private loadingCtrl: LoadingController, private apiService: ApiService) {

    }

    goToTeams() {

        let loader = this.loadingCtrl.create({
            content: 'Getting data...',
            dismissOnPageChange: true
        });

        loader.present();
        this.nav.push(TeamsPage)
    }

    favoriteTapped($event, favorite) {
        let loader = this.loadingCtrl.create({
            content: 'Getting data...',
            dismissOnPageChange: true
        });

        loader.present();
        this.apiService.getTournamentData().subscribe(t => this.nav.push(TeamHomePage, favorite.team))

    }
}