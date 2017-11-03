import { Component } from "@angular/core";
import { NavController, NavParams, ToastController } from 'ionic-angular';

import firebase from 'firebase';

import { HomePage } from '../home/home';
import { GalleryPage } from '../gallery/gallery';
import { FriendPage } from '../friend/friend';
import { PicturesProvider } from '../../providers/pictures/pictures';

@Component({
  templateUrl: 'list.html',
  selector: 'page-list'
})
export class ListPage {
  //selectedItem: any;
  //icons: string[];
  //items: Array<{ title: string, note: string, icon: string }>;
  private galleryPage;
  private friendPage;
  images: any;
  users: object = {};
  alreadyLikedImage: boolean = false;
  imageNbs = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController,
              private picsProvider: PicturesProvider) {
    // If we navigated to this page, we will have an item available as a nav param
    //this.selectedItem = navParams.get('item');
    this.galleryPage = GalleryPage;
    this.friendPage = FriendPage;
  }

  ionViewWillEnter() {
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
    this.navCtrl.push(page);
  }

  randUrl() {
    this.images = [];
    var randurl = "https://picsum.photos/200/300?image=";
    for(var i = 0; i < 30; i++){
      var randnbr = Math.floor((Math.random() * this.imageNbs.length) + 1);
      this.images[i] = randurl + this.imageNbs[randnbr - 1];
    }
  }

  addImageToGallery(image) {
    let user = firebase.auth().currentUser;
    let firebaseRef = firebase.database().ref();
    firebase.database().ref().child('users/' + user.uid + '/gallery/').push(image);
    this.alreadyLikedImage = true;
  }

  removeImageFromGallery(image) {
    let user = firebase.auth().currentUser;
    firebase.database().ref('users/' + user.uid + '/gallery/').once('value')
      .then(
        (snapshot) => {
          for (let key in snapshot.val()) {
            if (snapshot.val()[key] === image) {
              firebase.database().ref().child('users/' + user.uid + '/gallery/' + key).remove();
            }
          }
        },
        (error) => this.errorHandling(error)
      );
    this.alreadyLikedImage = false;
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
