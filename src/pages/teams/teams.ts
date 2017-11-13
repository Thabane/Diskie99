import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TeamHomePage } from '../pages';
import { ApiService } from '../../shared/shared';
import * as _ from 'lodash';

@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {

  teams: any;
  tempTeams: any;
  tournaments: any;
  searchTerm: string = '';
  private allGames : any;
  private allTeamPlayedGames : any;
  
  constructor(public navParams: NavParams, private nav :NavController, private apiService: ApiService,  private loadingController: LoadingController) {
    this.searchTerm = '';
    
    let loader = this.loadingController.create({
      content: 'Getting Teams....',
      // spinner: 'dots'
    });
    
    loader.present().then(() => {
      this.apiService.getTeams().then(data => {
        this.tempTeams = data;
        this.teams = data;
      });

      this.apiService.getTournamentData().subscribe(d => {
        this.allGames = _.chain(d.games)
        .groupBy('team2')
        .toPairs()
        .map(item => _.zipObject(['teamName', 'teamGames'], item))
        .value();


        console.log(this.allGames);
        this.allTeamPlayedGames = _.chain(d.games)
        .groupBy('team1')
        .toPairs()
        .map(item => _.zipObject(['teamName', 'teamGames'], item))
        .value();
        console.log(this.allTeamPlayedGames);



        // h1[k]=(h1[k]||[]).concat(h2[k]);
        // Array.prototype.push.apply(this.allTeamPlayedGames,this.allGames);
        this.allTeamPlayedGames.concat.apply(this.allGames);
        console.log('**************Push Apply', this.allTeamPlayedGames);
      })

      this.apiService.getTournament().then(data => this.tournaments = data)
      loader.dismiss();
    })
  
  }

  ionViewLoaded(){
    // let selectedTournament = this.navParams.data;

    // this.apiService.getTournamentData(selectedTournament.id).subscribe(data => {
    //   this.teams = data.teams;
    // })
  }

  searchTeam(e){
    console.log(e.target.value );
    if(e.data == null)
    {
      this.teams = this.tempTeams;
      return;
    }

    this.teams = this.tempTeams.filter(function(t) {
      return t.name.toLowerCase().includes(e.target.value.toLowerCase());
    })
  }

  ionViewDidLoad() {


  
  }

  itemTapped($event, team){
this.nav.push(TeamHomePage, team)
  }

}
