import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {CommonService} from '../../../services/common.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-referrls',
  templateUrl: './referrls.component.html',
  styleUrls: ['./referrls.component.css']
})
export class ReferrlsComponent implements OnInit {

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  referralData = null;

  referralDataForEdit = null;

  editReferralDataForm : FormGroup = new FormGroup({
    minimum_amount: new FormControl('',[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    new_customer: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    existing_customer: new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
  });


  itemsPerPage = 5;
  currentPage = 1;

  constructor(private commonService: CommonService,
              private modalService: BsModalService) { }

  ngOnInit(): void {

    this.getReferrals();
  }

  getReferrals(): void {
    this.commonService.loader(true);
    this.commonService.apiCall('get', '/api/system/getReferralSetting').subscribe((data) =>{
      this.commonService.loader(false);
      if (data['success'] == true){
        this.referralData =  [];
        this.referralData = data['data'];
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
    this.currentPage = event;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  closeModal(){
    this.modalRef.hide();
  }

  editReferralData(data){
    this.referralDataForEdit = data;

    this.editReferralDataForm.patchValue({
      minimum_amount: data.minimum_amount,
      new_customer: data.new_customer,
      existing_customer : data.existing_customer
    });
  }
  updateReferrals(){
    this.commonService.apiCall('post', '/api/metadata/updateReferralSetting', this.editReferralDataForm.value).subscribe((data) =>{
      if (data['success'] == true){
        this.getReferrals();
        this.closeModal();
        this.commonService.flashMessage('success', 'Success', data['message']);
      }else if (data['success'] == false){
        this.getReferrals();
        this.closeModal();
        this.commonService.flashMessage('warning', 'Warning', data['message']);
      }
    }, err =>{
      this.commonService.flashMessage('error', 'Error', err['message']);
    });
  }

}
