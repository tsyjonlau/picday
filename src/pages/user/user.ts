import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import firebase from 'firebase';

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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController) {
    this.consultedUser = this.navParams.get("user");
    this.consultedUid = this.navParams.get("uid");
    this.following = this.navParams.get("following");
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
      (error) => this.errorHandling(error)
    );
  }

  addImageToGallery(image) {
    let user = firebase.auth().currentUser;
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

  errorHandling(error) {
    let toast = this.toastCtrl.create({
      message: "Error " + error.code + ": " + error.message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

}
