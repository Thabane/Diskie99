import { Component } from '@angular/core';
import { ToastController, AlertController, NavController, NavParams } from 'ionic-angular';
import * as _ from 'lodash';
import * as moment from 'moment';
import { ApiService } from '../../shared/api-service';
import { GamePage } from '../pages';
import { UserSettings } from '../../shared/shared';
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
  allGames: any[];
  dateFilter: string;
  team: any;
  games: any[];
  tempGames: any[];
  teamStanding: {};
  private tournamentData: any;
  private tournament: any;
  useDateFilter = false;
  isFollowing = false;

  constructor(public navCtrl: NavController, private toastController: ToastController, public navParams: NavParams, private apiService: ApiService,
    private alertController: AlertController, private userSettings: UserSettings) {

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

        this.allGames = this.games;

        this.teamStanding = _.find(this.tournamentData.standings, { 'teamId': this.team.id });
        this.userSettings.isFavoriteTeam(this.team.id).then(value => this.isFollowing = value);
        console.log(this.games);
      });
  }

  gameClicked($event, game) {
    let sourceGame = this.tournamentData.games.find(g => g.id === game.gameId);
    this.navCtrl.parent.parent.push(GamePage, sourceGame)
  }

  getScoreDisplay(isTeam1, team1Score, team2Score) {

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

  dateChanged() {
    if (this.useDateFilter) {
      this.games = _.filter(this.allGames, g => moment(g.time).isSame(this.dateFilter, 'day'));
    } else {
      this.games = this.allGames;
    }
  }

  getScoreWorL(game) {
    console.log(game);
    return game.scoreDisplay ? game.scoreDisplay[0] : '';
  }

  getScoreDisplayBadge(game) {
    return game.scoreDisplay.indexOf('W:') == 0 ? 'badge-md-primary' : 'badge-md-danger';
  }

  toggleFollow() {

    if (this.isFollowing) {
      let confirm = this.alertController.create({
        title: 'Unfollow',
        message: 'Are you sure you want to unfollow?',
        buttons: [{
          text: 'Yes',
          handler: () => {
            this.isFollowing = false;
            this.userSettings.unforiteTeam(this.team);

            let toast = this.toastController.create({
              message: 'You have unfollowed this team.',
              duration: 2000,
              position: 'bottom'
            });
            toast.present();
          }
        },
        {
          text: 'No'
        }]

      });
      confirm.present();
    } else {
      this.isFollowing = true;
      this.userSettings.favoriteTeam(
        this.team, 
        this.tournamentData.tournament.id, 
        this.tournamentData.tournament.name);
    }
  }

  refreshAll(refresher){
    this.apiService.refreshCurrentTournament().subscribe(() => {
      refresher.complete();
      this.ionViewDidLoad()
    })
  }

}
