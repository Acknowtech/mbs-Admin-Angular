import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { CommonService } from '../../../services/common.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-live-sessions',
  templateUrl: './live-sessions.component.html',
  styleUrls: ['./live-sessions.component.css']
})
export class LiveSessionsComponent implements OnInit {
  @ViewChild('liveSessionDetails') liveSessionDetails;
  liveSessionData =  [];
  totalCount = 0;
  itemsPerPage = 5;
  currentPage = 0;
  filterQuery = '';
  showFilters = false;
  filters = {};
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  actionData = null;
  constructor(private commonService: CommonService,private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getLiveSession();
  }
  clearFilters(){
    this.filterQuery ='';
    this.filters = {};
    this.currentPage = 0;
    this.getLiveSession();
  }

  applyFilters(){
    this.currentPage = 0;
    this.filterQuery = '';
    if(this.filters.hasOwnProperty('status') && this.filters['status']!==''){
      this.filterQuery= '&is_allowed='+this.filters['status'];
    }
    this.getLiveSession();
  }
  getLiveSession(): void {
    this.commonService.loader(true);
    this.liveSessionData =  [];
    this.commonService.apiCall('get', '/api/metadata/getLiveSessionAdmin?pageNo='+this.currentPage+'&limit=' + this.itemsPerPage+this.filterQuery).subscribe((data) =>{
      this.commonService.loader(false);
      if (data['success'] == true){
        this.liveSessionData = data['data']['data'];
        this.totalCount=data['data']['count'];
        // this.commonService.flashMessage('success', 'Success', data['message']);
      }else if (data['success'] == false){
        this.commonService.flashMessage('warning', 'Warning', data['message']);
      }
    }, err =>{
      this.commonService.loader(false);
      this.commonService.flashMessage('error', 'Error', err['error']['message']);
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  closeModal(){
    this.modalRef.hide();
    this.actionData = null;
  }



  pageChange(event){
    this.currentPage = event.page-1;
    this.getLiveSession();
  }

  openDetailsModal(session){
    this.actionData = session;
    this.openModal(this.liveSessionDetails);
  }

  expertAllowRejectAction(action){

    var sendOBJ = {
      is_allowed: action
    }


    this.commonService.loader(true);
    this.commonService.apiCall('post', '/api/metadata/updateLiveSession/' + this.actionData.id, sendOBJ).subscribe((data) =>{
      this.commonService.loader(false);
      if (data['success'] == true){
        this.closeModal();
        this.getLiveSession();
        this.commonService.flashMessage('success', 'Success', data['message']);
      }else if (data['success'] == false){
        // this.closeModal();
        this.commonService.flashMessage('warning', 'Warning', data['message']);
      }
    }, err =>{
      this.commonService.loader(false);
      // this.closeModal();
      this.commonService.flashMessage('error', 'Error', err['message']);
    });
  }

}
