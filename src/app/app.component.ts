import { Component } from '@angular/core';
import {NavController, Platform, ToastController, App, MenuController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import firebase from 'firebase';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;


  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              public navCtrl: NavController,
              public toastCtrl: ToastController,
              public app: App,
              public menu: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  signOut() {
    this.navCtrl.push(HomePage);
    firebase.auth().signOut().then(() => {
      //this.menu.close();

      //this.app.getRootNav().popToRoot();
      //this.app.getRootNav().setRoot("HomePage");
    }).catch((error) => {
      let toast = this.toastCtrl.create({
        message: "Error " + error.code + ": " + error.message,
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    });
  }

}
