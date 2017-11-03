import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the PicturesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PicturesProvider {

  constructor(public http: Http) {
  }

  getPictures() {
    return this.http.get("https://picsum.photos/list").map(
      (res: Response) => res.json()
   );
  }
}
