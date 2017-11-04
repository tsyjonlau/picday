import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import firebase from 'firebase';
import { ToastErrorProvider } from '../../providers/toast-error/toast-error';

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  consultedUser: any;
  consultedUid: any;
  following: any;
  currentUser: any;
  images = [];
  userGallery: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastError: ToastErrorProvider) {
    this.consultedUser = this.navParams.get("user");
    this.consultedUid = this.navParams.get("uid");
    this.following = this.navParams.get("following");
    this.userGallery = this.navParams.get("userGallery");
    this.currentUser = firebase.auth().currentUser;
    this.fetchGallery();
  }

  fetchGallery() {
    firebase.database().ref('/users/' + this.consultedUid + '/gallery').once('value')
    .then(
      (snapshot) => {
        let value = snapshot.val();
        for (let key in value) {
          this.images.push(value[key]);
        }
      },
      (error) => this.toastError.display(error.code, error.message)
    );
  }

  addImageToGallery(image) {
    firebase.database().ref().child('users/' + this.currentUser.uid + '/gallery/').push(image);
  }

  followUser() {
    firebase.database().ref().child('users/' + this.currentUser.uid + '/following/').set({
        [this.consultedUid]: this.consultedUser
    });
    this.following = true;
  }

  unfollowUser() {
    firebase.database().ref().child('users/' + this.currentUser.uid + '/following/' + this.consultedUid).remove();
    this.following = false;
  }
}
