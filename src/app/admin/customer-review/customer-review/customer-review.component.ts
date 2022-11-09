import {Component, OnInit, TemplateRef } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-customer-review',
  templateUrl: './customer-review.component.html',
  styleUrls: ['./customer-review.component.css']
})
export class CustomerReviewComponent implements OnInit {

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  reviewsData =  [];
  itemsPerPage = 15;
  currentPage = 1;
  totalItems=0;

  constructor(private commonService: CommonService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getReviews();
  }

  getReviews(): void {
    this.commonService.apiCall('get', '/api/system/getCustomerReviewForAdmin?pageNo=0&limit=' + this.itemsPerPage).subscribe((data) =>{
      if (data['success'] == true){
        this.reviewsData =  [];
        this.reviewsData = data['data']['data'];
        this.totalItems=data['data']['count'];
        this.commonService.flashMessage('success', 'Success', data['message']);
      }else if (data['success'] == false){
        this.commonService.flashMessage('warning', 'Warning', data['message']);
      }
    }, err =>{
      this.commonService.flashMessage('error', 'Error', err['message']);
    });
  }

  pageChange(event){
    this.currentPage = event.page-1;
    this.getReviews();

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
        this.getReviews();
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
