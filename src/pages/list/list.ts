import {Component} from "@angular/core";
import {NavController, NavParams} from 'ionic-angular';


@Component({
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<{ title: string, note: string, icon: string }>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log("WESH");
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
  }
}
