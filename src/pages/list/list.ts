import {Component} from "@angular/core";
import {NavController, NavParams, ToastController} from 'ionic-angular';

import firebase from 'firebase';

import { HomePage } from '../home/home';
import { SearchPage } from '../search/search';

@Component({
  templateUrl: 'list.html',
  selector: 'page-list'
})
export class ListPage {

  //selectedItem: any;
  //icons: string[];
  //items: Array<{ title: string, note: string, icon: string }>;
  private searchPage;
  images = [  "https://picsum.photos/200/300?image=51",
              "https://picsum.photos/200/300?image=52",
              "https://picsum.photos/200/300?image=53",
              "https://picsum.photos/200/300?image=54",
              "https://picsum.photos/200/300?image=55",
              "https://picsum.photos/200/300?image=56",
              "https://picsum.photos/200/300?image=57",
              "https://picsum.photos/200/300?image=58",
              "https://picsum.photos/200/300?image=59",
              "https://picsum.photos/200/300?image=60",
              "https://picsum.photos/200/300?image=61",
              "https://picsum.photos/200/300?image=62",
              "https://picsum.photos/200/300?image=63",
              "https://picsum.photos/200/300?image=64"];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController) {
    // If we navigated to this page, we will have an item available as a nav param
    //this.selectedItem = navParams.get('item');
    this.searchPage = SearchPage;
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


    console.log("test");
  }
}
