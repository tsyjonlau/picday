import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import firebase from 'firebase';

import { UserPage } from '../user/user';
import { SearchPage } from '../search/search';

@IonicPage()
@Component({
  selector: 'page-friend',
  templateUrl: 'friend.html',
})
export class FriendPage {

  friends = [];
  currentUser: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController) {
    this.currentUser = firebase.auth().currentUser;
    this.fetchFriends();
  }

  fetchFriends() {
    firebase.database().ref('users/' + this.currentUser.uid + '/following/').once('value')
      .then(
        (snapshot) => {
          for (let key in snapshot.val()) {
            this.friends.push({
              email: snapshot.val()[key],
              uid: key
            });
          }
        },
        (error) => this.errorHandling(error)
      );
  }

  goToFriendPage(friend) {
    this.navCtrl.push(UserPage, {
      user: friend.email,
      uid: friend.uid,
      following: true
    })
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
    this.navCtrl.push(SearchPage);
  }
}
