import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Ng2IzitoastService} from 'ng2-izitoast';
import {environment} from '../../environments/environment';
import {NgxSpinnerService} from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private iziToast: Ng2IzitoastService,
    private spinner: NgxSpinnerService
  ) { }

  apiCall( type: string, url: string, body= {}, header = {} ) {
    url = environment.apiUrl + url;
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
  getURL(): string {
    return  this.router.url;
  }

  fileUploadValidation(event): boolean {
    const allowedExtensions = ["jpg","jpeg","png","svg","JPG","JPEG","SVG"];
    var fileExtension = null;
    var validOrNot = null;
    var fileData = event.target.files[0];

    if (fileData.size > 2000000){
      this.flashMessage('warning', 'Warning', 'file must be less than 2 mb');
      return false;
    }

    fileExtension = event.target.files[0].name.split('.').pop();
    validOrNot = allowedExtensions.indexOf(fileExtension.toLowerCase()) > -1;
    if (!validOrNot){
      this.flashMessage('warning', 'Warning', 'file must be jpeg,png,jpg,gif,svg');
      return false;
    }
    return true;
  }

  loader(flag:boolean){
    if(flag){
      this.spinner.show();
    }else{
      this.spinner.hide();
    }
  }
}
