import { Component, OnInit } from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {CommonService} from '../../services/common.service';

@Component({
  selector: 'app-carousal',
  templateUrl: './carousal.component.html',
  styleUrls: ['./carousal.component.css']
})
export class CarousalComponent implements OnInit {

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  reviewsData =  [];
  itemsPerPage = 15;
  currentPage = 0;
  totalItems=0;

  constructor(private commonService: CommonService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getCarousal();
  }

  getCarousal(): void {
    this.commonService.loader(true);
    this.commonService.apiCall('get', `/api/system/getCarousal?pageNo=${this.currentPage}&limit=` + this.itemsPerPage).subscribe((data) =>{
      this.commonService.loader(false);
      if (data['success'] == true){
        this.reviewsData =  [];
        this.reviewsData = data['data']['data'];
        this.totalItems=data['data']['count'];
        this.commonService.flashMessage('success', 'Success', data['message']);
      }else if (data['success'] == false){
        this.commonService.flashMessage('warning', 'Warning', data['message']);
      }
    }, err =>{
      this.commonService.loader(false);
      this.commonService.flashMessage('error', 'Error', err['message']);
    });
  }

  pageChange(event){
    this.currentPage = event.page-1;
    this.getCarousal();

  }

  actionOnReview(review, type){
    console.log({review, type})
    const sendOBJ = {
      customer_review_id : review.id,
      is_verified : type=='accept'?1:0
    }

    this.commonService.apiCall('post', '/api/metadata/updateCustomerReview', sendOBJ).subscribe((data) =>{
      if (data['success'] == true){
        // this.reviewsData =  [];
        // this.reviewsData = data['data']['data'];
        this.getCarousal();
        this.commonService.flashMessage('success', 'Success', data['message']);
      }else if (data['success'] == false){
        this.commonService.flashMessage('warning', 'Warning', data['message']);
      }
    }, err =>{
      console.log('err-', err);
      this.commonService.flashMessage('error', 'Error', err['error']['message']);
    });

  }

}
