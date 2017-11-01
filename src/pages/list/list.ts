import {Component} from "@angular/core";
import {NavController, NavParams, ToastController} from 'ionic-angular';

import firebase from 'firebase';

import { HomePage } from '../home/home';
import { SearchPage } from '../search/search';
import { GalleryPage } from '../gallery/gallery';

@Component({
  templateUrl: 'list.html',
  selector: 'page-list'
})
export class ListPage {

  //selectedItem: any;
  //icons: string[];
  //items: Array<{ title: string, note: string, icon: string }>;
  private searchPage;
  private galleryPage;
  images = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController) {
    // If we navigated to this page, we will have an item available as a nav param
    //this.selectedItem = navParams.get('item');
    this.searchPage = SearchPage;
    this.galleryPage = GalleryPage;
    this.randUrl()
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
  var randurl = "https://picsum.photos/200/300?image=";
    //console.log(randurl+randnbr);
    for(var i=0; i<100 ;i++){
      var randnbr = Math.floor((Math.random() * 500) + 1);
      this.images[i] = randurl+randnbr
      //console.log(this.images[i])
    }
    //console.log(this.images)
  }

  addImageToGallery(image) {
    console.log(image);
  }
}
