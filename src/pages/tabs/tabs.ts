import { Component } from '@angular/core';
import { MyTeamsPage, TeamsPage, TeamDetailPage, GamePage} from '../pages'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MyTeamsPage;
  tab2Root = TeamsPage;
  tab3Root = TeamDetailPage;

  constructor() {

  }
}
