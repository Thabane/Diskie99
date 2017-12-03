import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { StandingsPage, TeamDetailPage } from '../pages';
import { FixturesPage } from '../Fixtures/fixtures';

/**
 * Generated class for the ResultsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-results',
  templateUrl: 'results.html',
})
export class ResultsPage {
  team: any;
  teamDetailTab = TeamDetailPage;
  standingsTab = StandingsPage;
  fixturesTab = FixturesPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingController: LoadingController) {
    console.log('***nav params:', this.navParams)
    this.team = this.navParams.data;
   }

   goHome(){
    //  this.navCtrl.push(MyTeamsPage)
    this.navCtrl.popToRoot();
   }

   ionViewLoaded(){
   }
}

