import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

var provider = new firebase.auth.GoogleAuthProvider();

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'

})
export class WelcomePage {


  constructor(public navCtrl: NavController) { }

  googleSignin() {
     firebase.auth().signInWithRedirect(provider).then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;

        console.log(token)
        console.log(user)

        this.navCtrl.push(MainPage);

     }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(error.code)
        console.log(error.message)
     });
  }


  login() {
    this.navCtrl.push('LoginPage');
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }
}
