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
  keyUserFound: string = '';
  alreadyFollowed: boolean = false;
  isSelf: boolean = false;
  currentUser = null;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController) {
    this.currentUser = firebase.auth().currentUser;
    this.fetchUsers();
  }

  ionViewDidLoad() {
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
      }
      else {
        let toast = this.toastCtrl.create({
          message: "Error: User not found",
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      }
    }
  }

  followUser() {
    firebase.database().ref().child('users/' + this.currentUser.uid + '/following/').set({
        [this.keyUserFound]: this.result
    });
    this.alreadyFollowed = true;
    this.fetchUsers()
  }

  unfollowUser() {
    firebase.database().ref().child('users/' + this.currentUser.uid + '/following/' + this.keyUserFound).remove();
    this.alreadyFollowed = false;
    this.fetchUsers()
  }

  goToUser() {
    this.navCtrl.push(UserPage);
  }

  fetchUsers() {
    firebase.database().ref('users/').once('value')
      .then(
        (snapshot) => {
          this.users = snapshot.val();
        },
        (error) => this.errorHandling(error)
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

  errorHandling(error) {
    let toast = this.toastCtrl.create({
      message: "Error " + error.code + ": " + error.message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}



