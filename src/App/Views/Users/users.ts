import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { Environment } from '../../Configs/environment';

import 'fetch';

@autoinject
export class Users {
    heading = 'Github Users';
    users = [];

    constructor(
        private settings: Environment,
        private http: HttpClient
    ) {
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl( settings.baseApiUrl );
        });
    }

    activate() {
        return this.http.fetch('users')
            .then(response => response.json())
            .then(users => this.users = users);
    }
}
