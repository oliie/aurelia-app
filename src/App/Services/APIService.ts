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

    login( username:string, password:string ) {
        return this.http.fetch('token', {
                method: 'POST',
                body: `username=${username}&password=${password}&grant_type=password`
            })
            .catch(this.errorHandler)
            .then(response => response.json());
    }

    get( feedName:string, params?:any ) {
        return this.http.fetch( `API/Feed/${feedName}`, {
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: params
            })
            .catch(this.errorHandler)
            .then(response => response.json());
    }


    put( feedName:string, params?:any ) {
        return this.http.fetch( `API/Feed/${feedName}`, {
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: params
            })
            .catch(this.errorHandler)
            .then(response => response.json());
    }
}