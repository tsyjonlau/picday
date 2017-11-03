import { Component, Input, OnChanges } from '@angular/core';
import { ToastController } from "ionic-angular";

import firebase from 'firebase';


@Component({
  selector: 'image-and-button',
  templateUrl: 'image-and-button.html'
})
export class ImageAndButtonComponent implements OnChanges {

  @Input() imageLink: string;
  @Input() userGallery: any;
  @Input() waitBeforeUpdateLikeStatus: boolean;
  alreadyLikedImage: boolean = false;

  constructor(public toastCtrl: ToastController) {
    if (this.waitBeforeUpdateLikeStatus == false) {
      this.updateUserLikedStatus()
    }
  }

  ngOnChanges() {
    this.updateUserLikedStatus()
  }

  updateUserLikedStatus() {
    for (let i = 0; i < this.userGallery.length; ++i) {
      if (this.imageLink == this.userGallery[i]) this.alreadyLikedImage = true;
      break;
    }
  }

  addImageToGallery() {
    let user = firebase.auth().currentUser;
    firebase.database().ref().child('users/' + user.uid + '/gallery/').push(this.imageLink);
    this.alreadyLikedImage = true;
    this.userGallery.push(this.imageLink)
  }

  removeImageFromGallery() {
    let user = firebase.auth().currentUser;
    firebase.database().ref('users/' + user.uid + '/gallery/').once('value')
      .then(
        (snapshot) => {
          for (let key in snapshot.val()) {
            if (snapshot.val()[key] === this.imageLink) {
              firebase.database().ref().child('users/' + user.uid + '/gallery/' + key).remove();
            }
          }

          for (let i = 0; i < this.userGallery.length; ++i) {
            if (this.userGallery[i] == this.imageLink) {
              this.userGallery.splice(i, 1);
            }
          }
        },
        (error) => this.errorHandling(error)
      );
    this.alreadyLikedImage = false;
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
