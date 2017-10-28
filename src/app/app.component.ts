import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyAmORyTzdXawXfm39yUDg8XoxLTeW-lj-8",
  authDomain: "picday-39afd.firebaseapp.com",
  databaseURL: "https://picday-39afd.firebaseio.com",
  projectId: "picday-39afd",
  storageBucket: "picday-39afd.appspot.com",
  messagingSenderId: "146132231289"
};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    firebase.initializeApp(config);

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
