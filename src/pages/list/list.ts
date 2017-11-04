import { Component, ViewChild } from "@angular/core";
import { NavController, NavParams, AlertController, Content } from 'ionic-angular';
import { DeviceMotion } from '@ionic-native/device-motion';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

import firebase from 'firebase';

import { GalleryPage } from '../gallery/gallery';
import { FriendPage } from '../friend/friend';
import { PicturesProvider } from '../../providers/pictures/pictures';
import { ToastErrorProvider } from '../../providers/toast-error/toast-error';


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
  private nbMoves: number = 0;

  imageNbs = [];
  images: any;
  users: object = {};
  userGallery = [];
  currentUser: any;
  displayList: boolean = true
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastError: ToastErrorProvider,
              private picsProvider: PicturesProvider,
              private deviceMotion: DeviceMotion,
              public alertCtrl: AlertController,
              private ga: GoogleAnalytics) {

    if (this.ga) this.ga.trackView('List page (random pics)');

    this.galleryPage = GalleryPage;
    this.friendPage = FriendPage;
    this.currentUser = firebase.auth().currentUser;

    this.trackMovement();
  }

  ionViewWillEnter() {
    this.content.resize();
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
      this.navCtrl.popAll();
    }).catch((error) => this.toastError.display(error.code, error.message));
  }

  openPage(page) {
    this.navCtrl.push(page, {
      userGallery: this.userGallery
    });
  }

  randUrl() {
    this.images = [];
    var randurl = "https://picsum.photos/200/300?image=";
    for (let i = 0; i < 30; i++){
      let randnbr = Math.floor((Math.random() * this.imageNbs.length) + 1);
      this.images[i] = randurl + this.imageNbs[randnbr - 1];
    }
  }

  trackMovement() {
    this.deviceMotion.watchAcceleration({
      frequency: 500
    }).subscribe(cur => {

      if (!this.lastX) {
        this.lastX = cur.x;
        this.lastY = cur.y;
        this.lastZ = cur.z;
        return;
      }

      let deltaX:number, deltaY:number, deltaZ:number;
      deltaX = Math.abs(cur.x - this.lastX);
      deltaY = Math.abs(cur.y - this.lastY);
      deltaZ = Math.abs(cur.z - this.lastZ);

      if (deltaX + deltaY + deltaZ > 6) {
        this.nbMoves++;
      } else {
        this.nbMoves = Math.max(0, --this.nbMoves);
      }

      if (this.nbMoves > 2) {
        this.randUrl();
        this.nbMoves = 0;
      }

      this.lastX = cur.x;
      this.lastY = cur.y;
      this.lastZ = cur.z;
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
        (error) => this.toastError.display(error.code, error.message)
      );
  }
}
