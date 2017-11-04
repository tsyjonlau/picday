import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import firebase from 'firebase';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

import { UserPage } from '../user/user';
import { ToastErrorProvider } from '../../providers/toast-error/toast-error';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  query: string = '';
  result: string = '';
  users: object = {};
  keyUserFound: string = '';
  alreadyFollowed: boolean = false;
  isSelf: boolean = false;
  currentUser: any;
  userGallery: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastError: ToastErrorProvider,
              private ga: GoogleAnalytics) {
    if (this.ga) this.ga.trackView('Search page for users');
    this.currentUser = firebase.auth().currentUser;
    this.userGallery = this.navParams.get('userGallery');
    this.fetchUsers();
  }

  onSubmit() {
    for (var key in this.users) {
      if (!this.users.hasOwnProperty(key)) continue;

      if (this.users[key].hasOwnProperty('email') &&
          this.users[key]['email'] == this.query) {
        this.result = this.query;
        this.keyUserFound = key;
        this.isSelf = (key == this.currentUser.uid)? true : false;
        this.checkFollowingState();
        return;
      }
    }
    this.toastError.display("", "User not found")
  }

  followUser() {
    firebase.database().ref().child('users/' + this.currentUser.uid + '/following/' + this.keyUserFound).set(this.result);
    this.alreadyFollowed = true;
  }

  unfollowUser() {
    firebase.database().ref().child('users/' + this.currentUser.uid + '/following/' + this.keyUserFound).remove();
    this.alreadyFollowed = false;
  }

  goToUser() {
    this.navCtrl.push(UserPage, {
      user: this.result,
      uid: this.keyUserFound,
      following: this.alreadyFollowed,
      userGallery: this.userGallery
    });
  }

  fetchUsers() {
    firebase.database().ref('users/').once('value')
      .then(
        (snapshot) => {
          this.users = snapshot.val();
        },
        (error) => this.toastError.display(error.code, error.message)
      );
  }

  checkFollowingState() {
    for (let key in this.users[this.currentUser.uid].following) {
      if (this.users[this.currentUser.uid].following[key] == this.result) {
        this.alreadyFollowed = true;
        return;
      }
    }
    this.alreadyFollowed = false;
  }
}
