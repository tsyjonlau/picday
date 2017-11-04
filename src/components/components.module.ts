import { NgModule } from '@angular/core';
import { ImageAndButtonComponent } from './image-and-button/image-and-button';
import { FriendAndButtonComponent } from './friend-and-button/friend-and-button';

@NgModule({
	declarations: [ImageAndButtonComponent,
    FriendAndButtonComponent],
	imports: [],
	exports: [ImageAndButtonComponent,
    FriendAndButtonComponent]
})
export class ComponentsModule {}
