import { Component, ViewChild } from '@angular/core';
import { ToastController, AlertController, NavController, NavParams } from 'ionic-angular';
import * as _ from 'lodash';
import * as moment from 'moment';
import { ApiService } from '../../shared/api-service';
import { GamePage } from '../pages';
import { UserSettings } from '../../shared/shared';
/**
 * Generated class for the FixturesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-fixtures',
  templateUrl: 'fixtures.html',
})
export class FixturesPage {
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
  @ViewChild('datePicker') datePicker;
  
  constructor(public navCtrl: NavController, private toastController: ToastController, public navParams: NavParams, private apiService: ApiService,
    private alertController: AlertController, private userSettings: UserSettings) {

    // this.team = this.navParams.data;
    // console.log('Team', this.team)
    this.tournament = this.apiService.getTournamentData(true)
      .subscribe(data => {
        this.tournamentData = data;
        console.log(data)

        this.games = _.chain(this.tournamentData.games)
        .filter(g => g.team1Score === '' && g.team2Score === '' && moment(g.time).isAfter(new Date(), 'day'))
          .value();
        console.log(this.tournamentData);

        this.allGames = this.games;
        console.log(this.datePicker);
      });
  }

  gameClicked($event, game) {
    this.navCtrl.parent.parent.push(GamePage, game)
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

  ionViewDidLoad() {

    console.log('ionViewDidLoad FixturesPage');
  }

  dateChanged() {
    if (this.useDateFilter) {
      this.games = _.filter(this.allGames, g => moment(g.time).isAfter(this.dateFilter, 'day'));
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
