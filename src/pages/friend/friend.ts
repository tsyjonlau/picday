import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

import firebase from 'firebase';

import { SearchPage } from '../search/search';
import { ToastErrorProvider } from '../../providers/toast-error/toast-error';

@IonicPage()
@Component({
  selector: 'page-friend',
  templateUrl: 'friend.html',
})
export class FriendPage {

  friends: any;
  currentUser: any;
  userGallery: any;
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastError: ToastErrorProvider,
              private ga: GoogleAnalytics) {

    if (this.ga) this.ga.trackView('Friend page (following list)');

    this.currentUser = firebase.auth().currentUser;
    this.userGallery = this.navParams.get('userGallery');
  }

  ionViewWillEnter() {
    this.content.resize();
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
        (error) => this.toastError.display(error.code, error.message)
      );
  }

  goToSearchPage() {
    this.navCtrl.push(SearchPage, {
      userGallery: this.userGallery
    });
  }
}
