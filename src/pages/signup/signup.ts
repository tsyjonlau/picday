import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';

import firebase from 'firebase';

import { ListPage } from '../list/list';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  account: { email: string, password: string } = {
    email: '',
    password: ''
  };

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
  }

  onSubmit() {
    firebase.auth().createUserWithEmailAndPassword(this.account.email, this.account.password)
      .then(
        (value) => {
          let firebaseRef = firebase.database().ref();
          firebaseRef.child('users/' + value.uid).set({
              email: value.email
          });
          this.navCtrl.push(ListPage);
        },
        (error) => {
          let toast = this.toastCtrl.create({
            message: "Error " + error.code + ": " + error.message,
            duration: 3000,
            position: 'bottom'
          });
          toast.present()
        }
      );
  }
}
