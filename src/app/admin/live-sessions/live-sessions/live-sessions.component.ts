import {Component, OnInit, TemplateRef } from '@angular/core';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-live-sessions',
  templateUrl: './live-sessions.component.html',
  styleUrls: ['./live-sessions.component.css']
})
export class LiveSessionsComponent implements OnInit {
  liveSessionData =  [];

  itemsPerPage = 5;
  currentPage = 1;

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.getLiveSession();
  }

  getLiveSession(): void {
    this.commonService.loader(true);
    this.commonService.apiCall('get', '/api/system/getLiveSessionAdmin?pageNo=0&limit=' + this.itemsPerPage).subscribe((data) =>{
      this.commonService.loader(false);
      if (data['success'] == true){
        this.liveSessionData =  [];
        this.liveSessionData = data['data']['data'];
        this.commonService.flashMessage('success', 'Success', data['message']);
      }else if (data['success'] == false){
        this.commonService.flashMessage('warning', 'Warning', data['message']);
      }
    }, err =>{
      this.commonService.loader(false);
      this.commonService.flashMessage('error', 'Error', err['error']['message']);
    });
  }

  pageChange(event){
    this.currentPage = event;
  }

}
