import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { GoogleAnalytics } from '@ionic-native/google-analytics';

import { LoginPage } from '../login/login';
import { SignupPage } from "../signup/signup";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              private ga: GoogleAnalytics) {
    if (this.ga) this.ga.trackView('Home page');
  }

  login() {
    this.navCtrl.push(LoginPage);
  }

  signup() {
    this.navCtrl.push(SignupPage);
  }
}
