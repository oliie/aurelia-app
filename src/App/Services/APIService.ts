import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { Environment } from '../Configs/environment';

@autoinject
export class APIService {

    constructor(
        private http: HttpClient,
        private environment: Environment
    ) {
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl(this.environment.baseApiUrl);
        });
    }

    private errorHandler(errorMessage:any) {
        return console.error('CUSTOM ERROR:', errorMessage);
    }

    public get( feedName:string ) {
        return this.http.fetch( feedName )
            .catch(this.errorHandler)
            .then(response => response.json());
    }

    public login( username:string, password:string ) {
        return this.http.fetch('token', {
                method: 'POST',
                body: `username=${username}&password=${password}&grant_type=password`
            })
            .catch(this.errorHandler)
            .then(response => response.json());
    }

}