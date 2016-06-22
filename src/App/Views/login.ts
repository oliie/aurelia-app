import { autoinject } from 'aurelia-framework';
import { APIService } from '../Services/APIService';

@autoinject
export class Login {
    constructor(
        private API: APIService
    ) { }

    username: string = 'kursportal';
    password: string = 'Hallo1';
    successRoute: string = 'welcome';

    authorize() {
        this.API.isTokenValid();
        return this.API.login(this.username, this.password, this.successRoute);
    }
}
