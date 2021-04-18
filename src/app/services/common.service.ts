import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Ng2IzitoastService} from 'ng2-izitoast';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private iziToast: Ng2IzitoastService
  ) { }

  apiCall( type: string, url: string, body= {}, header = {} ) {
    url = url;
    switch (type.toLowerCase()){
      case 'get': {
        return this.http.get(url, body);
      }
      case 'post': {
        return this.http.post(url, body);
      }
      case 'put': {
        return this.http.put(url, body);
      }
      case 'delete': {
        return this.http.delete(url);
      }
    }
  }
  /*
  * This method is use to navigate to particular url route
  * @param - url : string
   */
  navigateTo(url): void {
    this.router.navigate([url]);
  }

  flashMessage(type, title, message): void {
    switch (type.toLowerCase()) {
      case 'success' :
        this.iziToast.show(
          {
            title: title,
            message: message,
            position: 'topCenter',
            color: 'green',
            progressBar: false,
          });
        break;
      case 'warning' :
        this.iziToast.show(
          {
            title: title,
            message: message,
            position: 'topCenter',
            color: 'orange',
            progressBar: false,
          });
        break;
      case 'error' :
        this.iziToast.show(
          {
            title: title,
            message: message,
            position: 'topCenter',
            color: 'red',
            progressBar: false,
          });
        break;
    }

  }
}
