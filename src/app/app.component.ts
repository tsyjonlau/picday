import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { Network } from '@ionic-native/network';

import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private ga: GoogleAnalytics,
              private network: Network,
              public alertCtrl: AlertController) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.setupGoogleAnalytics();

      this.network.onDisconnect().subscribe(() => {
        this.disconnectAlert();
      });
    });
  }

  setupGoogleAnalytics() {
    this.ga.startTrackerWithId('UA-109128141-1')
       .then(() => {
         console.log('Google analytics is ready now');
       })
       .catch(e => console.log('Error starting GoogleAnalytics', e));
  }

  disconnectAlert() {
    let alert = this.alertCtrl.create({
      title: 'Picday',
      subTitle: "Network Disconnected",
      buttons: ['Dismiss']
    });
    alert.present();
  }
}
