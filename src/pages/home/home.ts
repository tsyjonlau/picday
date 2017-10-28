import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { GooglePlus } from '@ionic-native/google-plus';
import { AngularFireModule } from 'angularfire2';
import firebase from 'firebase';

import { ListPage } from '../list/list';

var provider = new firebase.auth.GoogleAuthProvider();

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              public googlePlus: GooglePlus) {

  }

  googleSignin() {
    console.log("test");

    this.googlePlus.login({
      'webClientId': '146132231289-jii5nvbovl9lp0d6gm6ihhikqkr4996t.apps.googleusercontent.com',
      'offline': true
    }).then(result => {
      firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(result.idToken))
      .then(success => {
        alert("Login successful");
      }).catch(non_success => {
        alert("Login failed");
      })
    });

    /*
     firebase.auth().signInWithPopup(provider).then((result) => {
        var token = result.credential.accessToken;
        var user = result.user;

        console.log(token)
        console.log(user)


     }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log(error.code)
        console.log(error.message)
     });
  */
    }

}
