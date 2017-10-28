import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import firebase from 'firebase';

var provider = new firebase.auth.GoogleAuthProvider();

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  googleSignin() {
     firebase.auth().signInWithRedirect(provider).then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;

        console.log(token)
        console.log(user)

        //this.navCtrl.push(MainPage);

     }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(error.code)
        console.log(error.message)
     });
  }

}
