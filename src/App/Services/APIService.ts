import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';

@autoinject
export class APIService {

    constructor( private http: HttpClient ) {
        http.configure(config => {
            config
                .useStandardConfiguration()
                .withBaseUrl('http://crmweb.cintutv.se/CWP2/');
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