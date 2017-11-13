import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { TeamsPage, TeamHomePage } from '../pages';
import { ApiService } from '../../shared/shared';



@Component({
    templateUrl:'my-teams.page.html'
})
export class   MyTeamsPage{

    favorites = [ {
        team: { id: 828, name: 'MADE Elite', coach: 'Johnson' },
        tournamentId: '3dd50aaf-6b03-4497-b074-d81703f07ee8',
        tournamentName: 'Diskie 99'
    },
    {
        team: { id: 817, name: 'Sharks', coach: 'Smith' },
        tournamentId: '3dd50aaf-6b03-4497-b074-d81703f07ee8',
        tournamentName: 'Diskie 99'
    }];

    constructor(private nav: NavController, private loadingCtrl: LoadingController, private apiService: ApiService ){

    }

    goToTeams(){
            this.nav.push(TeamsPage)
    }

    favoriteTapped($event, favorite){
        let loader = this.loadingCtrl.create({
        content: 'Getting data...',
        dismissOnPageChange: true
        });

        loader.present();
        this.apiService.getTournamentData().subscribe(t => this.nav.push(TeamHomePage, favorite.team))

    }
}