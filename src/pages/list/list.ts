import { Component } from "@angular/core";
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { DeviceMotion } from '@ionic-native/device-motion';

import firebase from 'firebase';

import { HomePage } from '../home/home';
import { GalleryPage } from '../gallery/gallery';
import { FriendPage } from '../friend/friend';
import { PicturesProvider } from '../../providers/pictures/pictures';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@Component({
  templateUrl: 'list.html',
  selector: 'page-list',
})
export class ListPage {
  private galleryPage;
  private friendPage;

  private lastX: number;
  private lastY: number;
  private lastZ: number;
  private moveCounter: number = 0;

  imageNbs = [];
  images: any;
  users: object = {};
  userGallery = [];
  currentUser: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              private picsProvider: PicturesProvider,
              private ga: GoogleAnalytics,
              private deviceMotion: DeviceMotion,
              public alertCtrl: AlertController) {

    if (this.ga) this.ga.trackView('List page');
    this.galleryPage = GalleryPage;
    this.friendPage = FriendPage;
    this.currentUser = firebase.auth().currentUser;

    //this.trackMovement();
  }

  ionViewWillEnter() {
    this.fetchUserGallery();
    this.picsProvider.getPictures().subscribe((data) => {
      for (let key in data) {
        this.imageNbs.push(data[key].id);
      }
      this.randUrl();
    });
  }

  signOut() {
    firebase.auth().signOut().then(() => {
      this.navCtrl.push(HomePage);
    }).catch((error) => {
      let toast = this.toastCtrl.create({
        message: "Error " + error.code + ": " + error.message,
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    });
  }

  openPage(page) {
    this.navCtrl.push(page, {
      userGallery: this.userGallery
    });
  }

  randUrl() {
    this.images = [];
    var randurl = "https://picsum.photos/200/300?image=";
    for(var i = 0; i < 30; i++){
      var randnbr = Math.floor((Math.random() * this.imageNbs.length) + 1);
      this.images[i] = randurl + this.imageNbs[randnbr - 1];
    }
  }

  trackMovement() {
    this.deviceMotion.watchAcceleration({frequency:500}).subscribe(acc => {

      if (!this.lastX) {
        this.lastX = acc.x;
        this.lastY = acc.y;
        this.lastZ = acc.z;
        return;
      }

      let deltaX:number, deltaY:number, deltaZ:number;
      deltaX = Math.abs(acc.x-this.lastX);
      deltaY = Math.abs(acc.y-this.lastY);
      deltaZ = Math.abs(acc.z-this.lastZ);

      if (deltaX + deltaY + deltaZ > 6) {
        this.moveCounter++;
      } else {
        this.moveCounter = Math.max(0, --this.moveCounter);
      }

      if (this.moveCounter > 2) {
        this.randUrl();
        this.moveCounter=0;
      }

      this.lastX = acc.x;
      this.lastY = acc.y;
      this.lastZ = acc.z;
    });
  }

  fetchUserGallery() {
    this.userGallery = [];
    firebase.database().ref('/users/' + this.currentUser.uid + '/gallery').once('value')
      .then(
        (snapshot) => {
          let value = snapshot.val();
          for (let key in value) {
            this.userGallery.push(value[key]);
          }
        },
        (error) => this.errorHandling(error)
      );
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
