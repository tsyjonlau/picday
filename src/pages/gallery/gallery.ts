import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import firebase from 'firebase';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

import { ToastErrorProvider } from '../../providers/toast-error/toast-error';

@IonicPage()
@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html',
})
export class GalleryPage {

  gallery = [];
  currentUser: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastError: ToastErrorProvider,
              private ga: GoogleAnalytics) {
    if (this.ga) this.ga.trackView('My Gallery page');
    this.currentUser = firebase.auth().currentUser;
    this.gallery = this.navParams.get('userGallery');
  }

  ionViewWillLeave() {
    this.gallery.length = 0;
  }

  removeImageFromGallery(image) {
    firebase.database().ref('users/' + this.currentUser.uid + '/gallery/').once('value')
      .then(
        (snapshot) => {

          for (let key in snapshot.val()) {
            if (snapshot.val()[key] === image) {
              firebase.database().ref().child('users/' + this.currentUser.uid + '/gallery/' + key).remove();

              for (let i = 0; i < this.gallery.length; ++i) {
                if (this.gallery[i] == image) {
                  this.gallery.splice(i, 1);
                }
              }

            }
          }

        },
        (error) => this.toastError.display(error.code, error.message)
      );
    }
}
