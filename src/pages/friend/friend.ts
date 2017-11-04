import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import firebase from 'firebase';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

import { SearchPage } from '../search/search';

@IonicPage()
@Component({
  selector: 'page-friend',
  templateUrl: 'friend.html',
})
export class FriendPage {

  friends: any;
  currentUser: any;
  userGallery: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              private ga: GoogleAnalytics) {
    if (this.ga) this.ga.trackView('Friend page (following list)');
    this.currentUser = firebase.auth().currentUser;
    this.userGallery = this.navParams.get('userGallery');
  }

  ionViewWillEnter() {
    this.friends = [];
    firebase.database().ref('users/' + this.currentUser.uid + '/following/').once('value')
      .then(
        (snapshot) => {
          for (let key in snapshot.val()) {
            this.friends.push({
              email: snapshot.val()[key],
              uid: key,
              following: true
            });
          }
        },
        (error) => this.errorHandling(error)
      );
  }

  errorHandling(error) {
    let toast = this.toastCtrl.create({
      message: "Error " + error.code + ": " + error.message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  goToSearchPage() {
    this.navCtrl.push(SearchPage, {
      userGallery: this.userGallery
    });
  }
}
