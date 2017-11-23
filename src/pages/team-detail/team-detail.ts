import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as _ from 'lodash';
import { ApiService } from '../../shared/api-service';
import { GamePage } from '../pages';
/**
 * Generated class for the TeamDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {
  team: any;
  games: any[];
  tempGames: any[];
  teamStanding: {};
  private tournamentData: any;
  private tournament : any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private apiService: ApiService) {

    this.team = this.navParams.data;
    console.log('Team', this.team)
    this.tournament = this.apiService.getTournamentData()
      .subscribe(data => {
        this.tournamentData = data;
        console.log(data)

        this.games = _.chain(this.tournamentData.games)
          .filter(g => g.team1Id === this.team.id || g.team2Id === this.team.id)
          .map(g => {
            let isTeam1 = (g.team1Id === this.team.id);
            let opponentName = isTeam1 ? g.team2 : g.team1;
            let scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);
            return {
              gameId: g.id,
              opponent: opponentName,
              time: Date.parse(g.time),
              location: g.location,
              scoreDisplay: scoreDisplay,
              homeAway: (isTeam1 ? "vs." : "at")
            };
          })
          .value();
          console.log(this.tournamentData);
          
          this.teamStanding = _.find(this.tournamentData.standings, { 'teamId': this.team.id });

        console.log(this.games);
      });
  }

  gameClicked($event, game) {
    let sourceGame = this.tournamentData.games.find(g => g.id === game.gameId);
    this.navCtrl.parent.parent.push(GamePage, sourceGame)
    }

  getScoreDisplay(isTeam1, team1Score, team2Score){

    if (team1Score && team2Score) {
      var teamScore = (isTeam1 ? team1Score : team2Score);
      var oppenentScore = (isTeam1 ? team2Score : team1Score);
      var winIndicator = teamScore > oppenentScore ? "W: " : "L: ";
      return winIndicator + teamScore + "-" + oppenentScore;
    }
    else {
      return "";
    }
  }

  // goHome(){
  //   //  this.navCtrl.push(MyTeamsPage);
  //   // this.navCtrl.popToRoot();
  //   console.log('***parent :',this.navCtrl.parent);
  //   this.navCtrl.parent.parent.popToRoot();
  //  }

  ionViewDidLoad() {

     console.log('ionViewDidLoad TeamDetailPage');
  }

}
