import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http'
import 'rxjs';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ApiService {
    private baseUrl = 'https://diskie-99.firebaseio.com/';
    private teamUrl = 'https://diskie-99.firebaseio.com//tournaments-data/98c6857e-b0d1-4295-b89e-2d95a45437f2';
    currentTournament: any = {};
    private tournamentData: {};
    constructor(private http: Http) {

    }

    getTeams() {

        return new Promise(resolve => {
            this.http.get(`${this.teamUrl}/teams.json`)
                .subscribe(res => resolve(res.json()));
        });
    }

    getTournament() {

        return new Promise(resolve => {
            this.http.get(`${this.baseUrl}/tournaments.json`)
                .subscribe(res => resolve(res.json()));
        });
    }

    getTournamentData(forceRefresh: boolean = false): Observable<any> {
        console.log(this.tournamentData);
       
            if (!forceRefresh) {
                console.log('** no need to make HHTP call, just return the data');
                return Observable.of(this.currentTournament);
            }

        console.log('**about to make HHTP call');
        return this.http.get(`${this.baseUrl}/tournaments-data/98c6857e-b0d1-4295-b89e-2d95a45437f2.json`)
            .map((response: Response) => {
                this.currentTournament = response.json();
                return this.currentTournament;
            });
    }

    getCurrentTournament() {
        return this.currentTournament;
    };

    refreshCurrentTournament() {
        console.log(this.currentTournament);
        return this.getTournamentData(true);
    }
}
