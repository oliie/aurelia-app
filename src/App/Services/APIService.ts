import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { Environment } from '../Configs/environment';

export interface PutRequest {
    entityName: string;
    entityId: string;
    attributes: any;
}

export interface DeleteRequest {
    entityName: string;
    entityId: string;
}

export interface PostRequest {
    entityName: string;
    attributes: any;
}

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

    private get getToken() {
        return sessionStorage.getItem('token');
    }

    private headers: any = {
        'Authorization': `Bearer ${this.getToken}`,
        'X-Requested-With': 'XMLHttpRequest'
    };

    private errorHandler(errorMessage: any) {
        return console.error('CUSTOM ERROR:', errorMessage);
    }

    private baseApiRequest( service: string, method: string, params: any ) {
        return this.http.fetch(service, {
            method: 'POST',
            headers: this.headers,
            body: params
        })
        .then(response => response.json())
        .catch(this.errorHandler);
    }

    login(username: string, password: string) {
        return this.http.fetch('token', {
            method: 'POST',
            body: `username=${username}&password=${password}&grant_type=password`
        })
        .then(response => response.json())
        .catch(this.errorHandler);
    }

    get(feedName: string, parameters?: any) {
        return this.baseApiRequest(`API/Feed/${feedName}`, 'GET', parameters);
    }

    post(parameters: PostRequest) {
        return this.baseApiRequest(`API/Entity`, 'POST', parameters);
    }

    put(parameters: PutRequest) {
        return this.baseApiRequest(`API/Entity`, 'PUT', parameters);
    }

    delete(parameters: DeleteRequest) {
        return this.baseApiRequest(`API/Entity`, 'DELETE', parameters);
    }

    action(pluginName: string, parameters: any) {
        return this.baseApiRequest(`API/Action/${pluginName}`, 'ACTION', parameters);
    }
}
