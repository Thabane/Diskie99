import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { TeamsPage, TeamHomePage } from '../pages';
import { ApiService, UserSettings } from '../../shared/shared';



@Component({
    templateUrl: 'my-teams.page.html'
})
export class MyTeamsPage {

    favorites = [];

    constructor(private nav: NavController, private loadingCtrl: LoadingController, private apiService: ApiService, private useSettings: UserSettings) {
       
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
        this.apiService.getTournamentData(true).subscribe(t => this.nav.push(TeamHomePage, favorite.team))

    }

    ionViewDidEnter() {
        console.log('ionViewDidLoad My Teams');

        let favoriteTeams = [];
        this.favorites = [];
        favoriteTeams = this.useSettings.getAllFavorites()

        for (var i = 0; favoriteTeams.length > i; i++) {

            this.favorites.push(JSON.parse(favoriteTeams[i]))
        }
        console.log(this.favorites);
      }


}