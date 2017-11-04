import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

import firebase from 'firebase';

import { UserPage } from '../../pages/user/user';

@Component({
  selector: 'friend-and-button',
  templateUrl: 'friend-and-button.html'
})
export class FriendAndButtonComponent {

  @Input() friend: any;
  @Input() userGallery: any;
  currentUser: any;

  constructor(public navCtrl: NavController) {
      this.currentUser = firebase.auth().currentUser;
  }

  followFriend(friend) {
    firebase.database().ref().child('users/' + this.currentUser.uid + '/following/' + friend.uid).set(friend.email);
    friend.following = true;
  }

  unfollowFriend(friend) {
    firebase.database().ref().child('users/' + this.currentUser.uid + '/following/' + friend.uid).remove();
    friend.following = false;
  }

  goToFriendPage(friend) {
    this.navCtrl.push(UserPage, {
      user: friend.email,
      uid: friend.uid,
      following: friend.following,
      userGallery: this.userGallery
    })
  }

}
