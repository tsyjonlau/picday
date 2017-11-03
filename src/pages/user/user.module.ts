import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserPage } from './user';
import {ImageAndButtonComponent} from "../../components/image-and-button/image-and-button";

@NgModule({
  declarations: [
    UserPage,
    ImageAndButtonComponent
  ],
  imports: [
    IonicPageModule.forChild(UserPage),
  ],
})
export class UserPageModule {}
