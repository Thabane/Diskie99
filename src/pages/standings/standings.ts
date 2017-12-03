import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiService } from '../../shared/shared';
import * as _ from 'lodash';

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
    
    this.allStandtings = _.chain(this.standings)
    .groupBy('group')
    .toPairs()
    .map(item => _.zipObject(['groupName', 'groupStandings'], item))
    .value();

    console.log('groups  standings:', this.allStandtings);
    console.log('standings:', this.standings);
    for(var i = 0; this.allStandtings.length > i; i ++){
      this.allStandtings[i].groupStandings = _.orderBy(this.allStandtings[i].groupStandings, ['pointsDiff'],['desc']);
    }
    this.filterDivision();
  }
  filterDivision() {
      this.standings = this.allStandtings;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StandingsPage');
  }

  getHeader(record, recordIndex, records){
    console.log(record);
    if(recordIndex % 10 === 0 || record.group !== records[recordIndex -1].group){
      return record.group;
    }
    return null;
  }

}
