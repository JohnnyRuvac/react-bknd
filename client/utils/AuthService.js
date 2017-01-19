import Auth0 from 'auth0-js';
import { isTokenExpired } from './jwtHelper';
import { browserHistory } from 'react-router';


export default class AuthService {
  constructor(clientId, domain) {
    
    // configure auth0
    this.auth0 = new Auth0({
      clientID: clientId,
      domain: domain,
      responseType: 'token',
      callbackURL: `${window.location.origin}/login`
    });

    this.login = this.login.bind(this);

  }

  login(params, onError) {
    // redirect the call to auth0 instance
    this.auth0.login(params, onError);
  }

  parseHash(hash) {
    // uses auth0 parseHash method to extract data from url hash
    const authResult = this.auth0.parseHash(hash);
    if (authResult && authResult.idToken) {
      this.setToken(authResult.idToken);
      this.auth0.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          console.log('Error loading the Profile', error);
        } else {
          this.setProfile(profile);
        }
      });
    }
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!this.getToken() && !isTokenExpired(token);
  }

  setProfile(profile) {
    localStorage.setItem('profile', JSON.stringify(profile));
  }

  getProfile() {
    const profile = localStorage.getItem('profile');
    return profile ? JSON.parse(localStorage.profile) : {}
  }

  setToken(idToken) {
    // saves user token to local storage
    localStorage.setItem('id_token', idToken);
  }

  getToken() {
    // retrieves the user token from local storage
    return localStorage.getItem('id_token');
  }

  logout() {
    // clear user token and profule data from local storage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
  }

}