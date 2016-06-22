import { autoinject } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { Environment } from '../Configs/environment';
import { Router } from 'aurelia-router';
import { authenticatedRoutes } from '../Configs/routes';

export interface IPutRequest {
    entityName: string;
    entityId: string;
    attributes: any;
}

export interface IDeleteRequest {
    entityName: string;
    entityId: string;
}

export interface IPostRequest {
    entityName: string;
    attributes: any;
}

@autoinject
export class APIService {
    constructor(
        private http: HttpClient,
        private environment: Environment,
        private router: Router
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
            method: method,
            headers: this.headers,
            body: {
                attributes: params
            }
        })
        .then(response => response.json())
        .catch(this.errorHandler);
    }

    private setSessionAndLogin(response: any, successRoute: string): void {
        sessionStorage.setItem('token', (<any>response).access_token);
        sessionStorage.setItem('session', JSON.stringify(response));
        this.router.navigate(successRoute);
    }

    /**
     * Sets token and session in `sessionStorage` and redirects to `successRoute`.
     *
     * @method login
     * @param  {string} username CWP Username
     * @param  {string} password CWP Password
     * @param  {string} successRoute Route to redirect to after successful login.
     */
    login(username: string, password: string, successRoute: string) {
        return this.http.fetch('token', {
            method: 'POST',
            body: `username=${username}&password=${password}&grant_type=password`
        })
        .then(response => response.json())
        .catch(this.errorHandler)
        .then(response => {
            let hasResponse: boolean = !!response;
            authenticatedRoutes.forEach(route => {
                this.router.addRoute(route);
            });

            hasResponse && this.setSessionAndLogin(response, successRoute);
        });
    }

    /**
     * Returns `true` if token is valid.
     *
     * @method isTokenValid
     */
    isTokenValid() {
        let hasSession: boolean = !!sessionStorage.getItem('session');
        let session: any = hasSession ? JSON.parse(sessionStorage.getItem('session')) : false;
        let now: any = new Date();

        if ( hasSession ) {
            let expires: any = new Date(session['.expires']);
            let isValid: boolean = (expires > now);
            return isValid ? isValid : this.router.navigate('login');
        }

        return this.router.navigate('login');
    }

    /**
     * Gets JSON data from CWP Feed (XML-based definition)
     *
     * @method get
     * @param  {string} feedName Name of CWP Feed
     * @param  {any} parameters? Optional parameters to CWP Feed (defined by {querystring:field_name})
     */
    get(feedName: string, parameters?: any) {
        return this.baseApiRequest(`API/Feed/${feedName}`, 'GET', parameters);
    }

    /**
     * Posts data to fields in defined entity. Requires a CWP Policy
     *
     * @method post
     * @param {IPostRequest} parameters { entityName: string, attributes?: { fieldName: value } }
     */
    post(parameters: IPostRequest) {
        return this.baseApiRequest(`API/Entity`, 'POST', parameters);
    }

    /**
     * Updates data to fields in defined entity. Requires a CWP Policy
     *
     * @method put
     * @param {IPutRequest} parameters { entityName: string, entityId: GUID, attributes: { fieldName: value } }
     */
    put(parameters: IPutRequest) {
        return this.baseApiRequest(`API/Entity`, 'PUT', parameters);
    }

    /**
     * Delets post. Requires a CWP Policy
     *
     * @method delete
     * @param {IDeleteRequest} parameters { entityName: string, entityId: GUID }
     */
    delete(parameters: IDeleteRequest) {
        return this.baseApiRequest(`API/Entity`, 'DELETE', parameters);
    }

    /**
     * Special method to communicate with custom plugins.
     *
     * @method action
     * @param  {string} pluginName Name of the Plugin. Requires CWP Policy with plugin name as `entity`.
     * @param  {any} parameters Object with keys required by plugin.
     */
    action(pluginName: string, parameters: any) {
        return this.baseApiRequest(`API/Action/${pluginName}`, 'ACTION', parameters);
    }
}
