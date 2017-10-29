import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';

import firebase from 'firebase';

import { UserPage } from '../user/user';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  query: string = '';
  result: string = '';
  users: object = {};
  key_to_follow: string = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController) {
    firebase.database().ref('users/').once('value')
      .then(
        (snapshot) => {
          this.users = snapshot.val();
          console.log(this.users);
        },
        (error) => {
          let toast = this.toastCtrl.create({
            message: "Error " + error.code + ": " + error.message,
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        });
  }


  ionViewDidLoad() {
  }

  onSubmit() {
    for (var key in this.users) {
      if (!this.users.hasOwnProperty(key)) continue;

      if (this.users[key].hasOwnProperty('email') &&
          this.users[key]['email'] == this.query) {
        this.result = this.query;
        this.key_to_follow = key;
      }
      else {

      }
    }
  }

  followUser() {
    let user = firebase.auth().currentUser;
    let firebaseRef = firebase.database().ref();
    firebaseRef.child('users/' + user.uid + '/following/' + this.key_to_follow).set({
        email: this.result
    });
  }

  goToUser() {
    this.navCtrl.push(UserPage);
  }
}



