import { Component } from '@angular/core';
import { LoadingController, NavController, NavParams } from 'ionic-angular';
import { TeamDetailPage, StandingsPage, MyTeamsPage } from '../pages';

/**
 * Generated class for the TeamHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-team-home',
  templateUrl: 'team-home.html',
})
export class TeamHomePage {
  team: any;
  teamDetailTab = TeamDetailPage;
  standingsTab = StandingsPage;

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamHomePage');
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad TeamHomePage');
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad TeamHomePage');
  }

  ionViewDidLeave() {
    console.log('ionViewDidLoad TeamHomePage');
  }

  ionViewWilLeave() {
    console.log('ionViewDidLoad TeamHomePage');
  }

  ionViewWillUnload() {
    console.log('ionViewDidLoad TeamHomePage');
  }

  ionViewDidUnload() {
    console.log('ionViewDidLoad TeamHomePage');
  }
}
