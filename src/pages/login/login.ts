import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';

import firebase from 'firebase';

import {ListPage} from "../list/list";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

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
    firebase.auth().signInWithEmailAndPassword(this.account.email, this.account.password)
      .then(
        (value) => {
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
