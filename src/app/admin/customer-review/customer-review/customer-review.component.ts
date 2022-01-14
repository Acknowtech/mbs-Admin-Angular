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
  itemsPerPage = 5;
  currentPage = 1;

  constructor(private commonService: CommonService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getReviews();
  }

  getReviews(): void {
    this.commonService.apiCall('get', '/api/system/getCustomerReview?pageNo=0&limit=' + this.itemsPerPage).subscribe((data) =>{
      if (data['success'] == true){
        this.reviewsData =  [];
        this.reviewsData = data['data']['data'];
        this.commonService.flashMessage('success', 'Success', data['message']);
      }else if (data['success'] == false){
        this.commonService.flashMessage('warning', 'Warning', data['message']);
      }
    }, err =>{
      this.commonService.flashMessage('error', 'Error', err['message']);
    });
  }

  counter(i:number){
    let listTemp = [];
    for(let j=0;j<i;j++){
      listTemp.push(1)
    }
    return listTemp;
  }

  pageChange(event){
    this.currentPage = event;
  }

  actionOnReview(review, type){
    console.log({review, type})
    const sendOBJ = {
      customer_review_id : review.id,
      is_verified : review.is_verified
    }

    this.commonService.apiCall('post', '/api/metadata/updateCustomerReview', sendOBJ).subscribe((data) =>{
      if (data['success'] == true){
        this.reviewsData =  [];
        this.reviewsData = data['data']['data'];
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
