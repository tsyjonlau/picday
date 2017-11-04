import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

import firebase from 'firebase';

import { ListPage } from "../list/list";
import { ToastErrorProvider } from '../../providers/toast-error/toast-error';

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
              public toastError: ToastErrorProvider,
              private ga: GoogleAnalytics) {

    if (this.ga) this.ga.trackView('Login page');
  }

  onSubmit() {
    firebase.auth().signInWithEmailAndPassword(this.account.email, this.account.password)
      .then(
        (value) => {
          this.navCtrl.push(ListPage);
        },
        (error) => this.toastError.display(error.code, error.message)
      );
  }

}
