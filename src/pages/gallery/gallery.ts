import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';

import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html',
})
export class GalleryPage {

  images = [];
  currentUser: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController) {
    this.currentUser = firebase.auth().currentUser;
    this.fetchGallery();
  }

removeImageFromGallery(image) {
  firebase.database().ref('users/' + this.currentUser.uid + '/gallery/').once('value')
    .then(
      (snapshot) => {
        for (let key in snapshot.val()) {
          if (snapshot.val()[key] === image) {
            firebase.database().ref().child('users/' + this.currentUser.uid + '/gallery/' + key).remove();
            
            for (let i = 0; i < this.images.length; ++i) {
              if (this.images[i] == image) {
                this.images.splice(i, 1);
              }
            }

          }
        }

      },
      (error) => this.errorHandling(error)
    );
}

fetchGallery() {
  firebase.database().ref('/users/' + this.currentUser.uid + '/gallery').once('value')
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

errorHandling() {
  let toast = this.toastCtrl.create({
    message: "Error " + error.code + ": " + error.message,
    duration: 3000,
    position: 'bottom'
  });
  toast.present();
}

}
