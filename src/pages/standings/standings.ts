import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiService } from '../../shared/shared';
import * as _ from 'lodash';
import { retry } from 'rxjs/operator/retry';

/**
 * Generated class for the StandingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-standings',
  templateUrl: 'standings.html',
})
export class StandingsPage {
  team: any;
  standings: any[];
  allStandtings: any;
  divisionFilter = 'division'

  constructor(public navCtrl: NavController, public navParams: NavParams, private apiService: ApiService) {
    this.team = this.navParams.data;
    console.log('***nav params:', this.navParams)

    let tournamentData = this.apiService.getCurrentTournament();

    this.standings = tournamentData.standings;
    console.log(tournamentData);
    
    // this.allStandtings = _.chain(this.standings)
    // .groupBy('division')
    // .toPairs()
    // .map(item => _.zipObject(['divisionName', 'divisionStandings'], item))
    // .value();

    console.log('standings:', this.standings);
    // console.log('division  standings:', this.allStandtings);
    this.allStandtings = tournamentData.standings;
    this.filterDivision();
  }
  filterDivision() {
    if(this.divisionFilter === 'all'){
      this.standings = this.allStandtings;
    } else {
      this.standings = _.filter(this.allStandtings, s => s.division === this.team.division);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StandingsPage');
  }

  getHeader(record, recordIndex, records){
    console.log(record);
    if(recordIndex % 10 === 0 || record.division !== records[recordIndex -1].division){
      return record.division;

    }
    return null;
  }

}
