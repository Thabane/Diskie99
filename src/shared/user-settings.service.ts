import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as _ from 'lodash';
import { Events } from 'ionic-angular';


@Injectable()
export class UserSettings {
    constructor(private storage: Storage, private events: Events) {

    }

    favoriteTeam(team, tournamentId, tournamentName) {
        let item = { team: team, tournamentId: tournamentId, tournamentName: tournamentName };
        this.storage.set(team.id, JSON.stringify(item));
        this.events.publish('favorites:changed');
    }

    unforiteTeam(team) {
        this.storage.remove(team.id);
        this.events.publish('favorites:changed');
    }

    isFavoriteTeam(teamId) {
        return this.storage.get(teamId).then(value => value ? true : false);
    }

    getAllFavorites() {
        let items = [];
        _.forIn(window.localStorage, (v, k) => {
            console.log(items);
            items.push(JSON.parse(v));
        });
        return items.length ? items : null;
    }
}