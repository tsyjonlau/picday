import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';

import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  query = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public toastCtrl: ToastController) {
    firebase.database().ref('users/').once('value')
      .then(
        (snapshot) => {
          this.users = snapshot.val();
          console.log(this.users);
        },
        (error) => {
          let toast = this.toastCtrl.create({
            message: "Error " + error.code + ": " + error.message,
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        });
  }


  ionViewDidLoad() {
  }

  onSubmit() {
    for (var key in this.users) {
      if (!this.users.hasOwnProperty(key)) continue;

      if (this.users[key].hasOwnProperty('email') &&
          this.users[key]['email'] == this.query) {
        console.log("Trouvay");
      }
      else {
        console.log("Pas trouvay")
      }
    }
  }
}



