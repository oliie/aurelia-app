export class Configuration {
    projectTitle:       string  = 'Innorelia';
    baseApiUrl:         string  = 'http://cinapi.azurewebsites.net/';
    landingRoute:       string  = 'welcome';
    notAuthorizedRoute: string  = 'login';

    isLoggedIn:         boolean;
}