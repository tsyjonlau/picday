import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular'

@Injectable()
export class ToastErrorProvider {

  constructor(public toastCtrl: ToastController) {
    console.log('Hello ToastErrorProvider Provider');
  }

  display(code, message) {
    let toast = this.toastCtrl.create({
      message: "Error " + code + ": " + message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}
