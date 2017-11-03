import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { DeviceMotion } from '@ionic-native/device-motion';

import firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ListPage } from '../pages/list/list';
import { SearchPage } from '../pages/search/search';
import { UserPage } from '../pages/user/user';
import { GalleryPage } from '../pages/gallery/gallery';
import { FriendPage } from '../pages/friend/friend';

import { PicturesProvider } from '../providers/pictures/pictures';

import { ImageAndButtonComponent } from "../components/image-and-button/image-and-button";

export const firebaseConfig = {
  apiKey: "AIzaSyAmORyTzdXawXfm39yUDg8XoxLTeW-lj-8",
  authDomain: "picday-39afd.firebaseapp.com",
  databaseURL: "https://picday-39afd.firebaseio.com",
  projectId: "picday-39afd",
  storageBucket: "picday-39afd.appspot.com",
  messagingSenderId: "146132231289"
}
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    ListPage,
    SearchPage,
    UserPage,
    GalleryPage,
    FriendPage,
    ImageAndButtonComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    ListPage,
    SearchPage,
    UserPage,
    GalleryPage,
    FriendPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PicturesProvider,
    GoogleAnalytics,
    DeviceMotion
  ]
})
export class AppModule {}
