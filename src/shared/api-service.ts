import { Injectable } from "@angular/core";
import {Http, Response} from '@angular/http'
import 'rxjs';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class ApiService{
    private baseUrl = 'https://diskie-99.firebaseio.com/';
    private teamUrl = 'https://diskie-99.firebaseio.com/tournaments-data/3dd50aaf-6b03-4497-b074-d81703f07ee8';
    currentTournament: any = {};
    constructor(private http: Http){

    }

    getTeams(){

        return new Promise(resolve =>
        {
            this.http.get(`${this.teamUrl}/teams.json`)
                .subscribe(res => resolve(res.json()));
        });
    }

    getTournament(){
        
        return new Promise(resolve =>
        {
            this.http.get(`${this.baseUrl}/tournaments.json`)
                .subscribe(res => resolve(res.json()));
        });
    }

    getTournamentData() : Observable<any> {
        return this.http.get(`${this.baseUrl}/tournaments-data/3dd50aaf-6b03-4497-b074-d81703f07ee8.json`)
            .map((response: Response) => {
            this.currentTournament = response.json();
            return this.currentTournament;
        });
    }

    getCurrentTournament() {
        return this.currentTournament;
  };
}
