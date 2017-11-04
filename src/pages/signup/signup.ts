import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

import firebase from 'firebase';

import { ListPage } from '../list/list';
import { ToastErrorProvider } from '../../providers/toast-error/toast-error';

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
              public toastError: ToastErrorProvider,
              private ga: GoogleAnalytics) {

    if (this.ga) this.ga.trackView('Signup page');
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
        (error) => this.toastError.display(error.code, error.display)
      );
  }
}
