import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListPage } from './list';
import { ImageAndButtonComponent } from "../../components/image-and-button/image-and-button";

@NgModule({
  declarations: [
    ListPage,
    ImageAndButtonComponent
  ],
  imports: [
    IonicPageModule.forChild(ListPage),
  ],
})
export class ListPageModule {}
