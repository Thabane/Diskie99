import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiService } from '../../shared/shared';
import { TeamHomePage } from '../pages';

/**
 * Generated class for the GamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {
  game: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private apiService: ApiService) {
    this.game =this.navParams.data;
    console.log(this.game);
    
  }

  ionViewLoad() {

  }

  teamTapped(teamId){
    let tournamentData = this.apiService.getCurrentTournament();
    let team = tournamentData.teams.find(t => t.id === teamId);
    this.navCtrl.push(TeamHomePage, team);
  }

}
