import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { TeamHomePage } from '../pages';
import { ApiService } from '../../shared/shared';
import * as _ from 'lodash';

@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {

  allTeamDivions: any;
  allTeams: any;
  teams: any;
  tempTeams: any;
  tournaments: any;
  searchTerm: string = '';
  private allGames: any;
  private allTeamPlayedGames: any;

  constructor(public navParams: NavParams, private nav: NavController, private apiService: ApiService, private loadingController: LoadingController) {
    this.searchTerm = '';

    let loader = this.loadingController.create({
      content: 'Getting Teams....'
      // spinner: 'dots'
    });

    loader.present().then(() => {
      this.apiService.getTeams().then(data => {
        this.teams = data;
      }).catch(error => {

        console.log('Connection error');
      });

      this.apiService.getTournamentData(true).subscribe(d => {
        this.allTeamDivions = _.chain(d.teams)
          .groupBy('division')
          .toPairs()
          .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
          .value();

          this.tempTeams = this.allTeamDivions;
          console.log(this.allTeamDivions);
        this.teams = this.allTeamDivions;
        console.log(this.allGames);
        this.allTeamPlayedGames = _.chain(d.games)
        .groupBy('team1')
        .toPairs()
        .map(item => _.zipObject(['teamName', 'teamGames'], item))
        .value();
        console.log(this.allTeamPlayedGames);



        // h1[k]=(h1[k]||[]).concat(h2[k]);
        // Array.prototype.push.apply(this.allTeamPlayedGames,this.allGames);
        // this.allTeamPlayedGames.concat.apply(this.allGames);
        // console.log('**************Push Apply', this.allTeamPlayedGames);
      });

      this.apiService.getTournament().then(data => this.tournaments = data)
      loader.dismiss();
    })

  }

  ionViewLoaded() {
    // let selectedTournament = this.navParams.data;

    // this.apiService.getTournamentData(selectedTournament.id).subscribe(data => {
    //   this.teams = data.teams;
    // })
  }

  searchTeam(e) {
    console.log(e.target.value);
    let filterTeams = [];
    // if (e.data == null) {
    //   this.allTeamDivions = this.tempTeams;
    //   return;
    // }
    
    _.forEach(this.allTeamDivions, td => {
      let teams = _.filter(td.divisionTeams, t => (<any>t).name.toLowerCase().includes(e.target.value.toLowerCase()));
      if(teams.length){
        filterTeams.push({divisionName: td.divisionName, divisionTeams: teams});
      }
    });

    this.teams = filterTeams;
  }

  ionViewDidLoad() {



  }

  itemTapped($event, team) {
    this.nav.push(TeamHomePage, team)
  }

}
