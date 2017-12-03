import { Component, ViewChild } from '@angular/core';
import { Events, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyTeamsPage, TeamsPage, TeamHomePage } from '../pages/pages'

import { TabsPage } from '../pages/tabs/tabs';
import { ApiService } from '../shared/api-service';
import { HttpModule } from '@angular/http'
import { UserSettings } from '../shared/user-settings.service';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { ResultsPage } from '../pages/results/results';

@Component({
  templateUrl: 'app.html',
  providers: [
    ApiService,
    HttpModule,
    UserSettings
  ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = ResultsPage;
  favoriteTeams: any[];

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    private userSettings: UserSettings, private loadingController: LoadingController,
  private apiService: ApiService, private events: Events) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      this.refreshFavorites();
      this.events.subscribe('favorites:changed', () => this.refreshFavorites())
      splashScreen.hide();
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.refreshFavorites();
      this.events.subscribe('favorites:changed', () => this.refreshFavorites())
      this.splashScreen.hide();
    });
  }

  refreshFavorites() {
    this.favoriteTeams = this.userSettings.getAllFavorites();


    let favorites = [];
    this.favoriteTeams = [];
    favorites = this.userSettings.getAllFavorites()

    for (var i = 0; favorites.length > i; i++) {

      this.favoriteTeams.push(JSON.parse(favorites[i]))
    }
    console.log(this.favoriteTeams);
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  goHome() {
    console.log('Home', MyTeamsPage);
    this.nav.setRoot(MyTeamsPage)
  }

  goToTeams() {
    console.log('teamsPage', TeamsPage);
    this.nav.push(TeamsPage)
  }

  goToTeam(favorite) {
    let loader = this.loadingController.create({
      content: 'Getting data...',
      dismissOnPageChange: true
    });
    loader.present();
    this.apiService.getTournamentData().subscribe(l => this.nav.push(TeamHomePage,favorite.team));

  }
}
