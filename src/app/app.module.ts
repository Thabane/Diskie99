import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { MyTeamsPage, TeamsPage, TeamDetailPage, GamePage, TeamHomePage, StandingsPage} from '../pages/pages'
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpModule } from '@angular/http';
import { ResultsPage } from '../pages/results/results';
import { FixturesPage } from '../pages/Fixtures/fixtures';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    MyTeamsPage,
    TeamDetailPage,
    TeamsPage,
    GamePage,
    TeamHomePage,
    StandingsPage,
    ResultsPage,
    FixturesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot({
      name: '__mydb',
         driverOrder: ['localstorage','indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyTeamsPage,
    TeamDetailPage,
    TeamsPage,
    TabsPage,
    GamePage,
    TeamHomePage,
    StandingsPage,
    ResultsPage,
    FixturesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, 
      useClass: IonicErrorHandler
    }
  ]
})
export class AppModule {}