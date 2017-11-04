import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FriendPage } from './friend';
import { FriendAndButtonComponent } from "../../components/friend-and-button/friend-and-button";

@NgModule({
  declarations: [
    FriendPage,
    FriendAndButtonComponent
  ],
  imports: [
    IonicPageModule.forChild(FriendPage),
  ],
})
export class FriendPageModule {}
