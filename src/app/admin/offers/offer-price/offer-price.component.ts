import { Component, TemplateRef, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-offer-price',
  templateUrl: './offer-price.component.html',
  styleUrls: ['./offer-price.component.css']
})
export class OfferPriceComponent implements OnInit {

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  offerPriceData = [];

  addOfferForm: FormGroup = new FormGroup({
    price: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
    extra: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
    text_to_be_displayed : new FormControl('', Validators.required)
  });

  editOfferId = '';
  editOfferForm: FormGroup = new FormGroup({
    price: new FormControl('', Validators.required),
    extra: new FormControl('', Validators.required),
    text_to_be_displayed : new FormControl('', Validators.required)

  });

  itemsPerPage = 5;
  currentPage = 1;

  constructor(private commonService: CommonService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getOffers();
  }

  getOffers(): void {
    this.commonService.apiCall('get', '/api/system/getOfferPrice').subscribe((data) => {
      if (data['success'] == true){
        this.offerPriceData =  [];
        this.offerPriceData = data['data']['data'];
        this.commonService.flashMessage('success', 'Success', data['message']);
      }else if (data['success'] == false){
        this.commonService.flashMessage('warning', 'Warning', data['message']);
      }
    }, err => {
      this.commonService.flashMessage('error', 'Error', err['error']['message']);
    });
  }

  pageChange(event){
    this.currentPage = event;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  closeModal(){
    this.modalRef.hide();
  }

  addOfferData(){

    this.commonService.apiCall('post', '/api/metadata/createOfferPrice', this.addOfferForm.value).subscribe((data) => {
      if (data['success'] == true){
        this.closeModal();
        this.commonService.flashMessage('success', 'Success', data['message']);
        this.addOfferForm.reset();
        this.getOffers();
      }else if (data['success'] == false){
        this.closeModal();
        this.commonService.flashMessage('warning', 'Warning', data['message']);
      }
    }, err => {
      this.commonService.flashMessage('error', 'Error', err['error']['message']);
    });
  }

  editOfferData(data){
    this.editOfferId = data.id;
    this.editOfferForm.patchValue({
      price: data.price,
      extra: data.extra,
      text_to_be_displayed: data.text_to_be_displayed
    });
  }
  deleteOffer(data){
    this.commonService.apiCall('delete', '/api/metadata/deleteOfferPrice/'+ data.id).subscribe((data) => {
      if (data['success'] == true){
        this.commonService.flashMessage('success', 'Success', data['message']);
        this.getOffers();
      }else if (data['success'] == false){
        this.closeModal();
        this.commonService.flashMessage('warning', 'Warning', data['message']);
      }
    }, err => {
      this.commonService.flashMessage('error', 'Error', err['error']['message']);
    });
  }

  updateOffer(){

  }

}
