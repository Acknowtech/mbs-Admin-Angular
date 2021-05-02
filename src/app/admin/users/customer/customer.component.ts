import {Component, OnInit, TemplateRef } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  customerData =  [];

  assignRole: FormGroup = new FormGroup({
    role: new FormControl('', Validators.required),
  });

  rolesData = [];
  rolesOptionList = [];
  options = {};
  customerDetailsData = null;

  itemsPerPage = 5;
  currentPage = 1;

  constructor(private commonService: CommonService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getCustomers();
    this.getRoles();
    this.options = {
      width: '450',
      multiple: false,
    };
  }

  getCustomers(): void {
    this.commonService.apiCall('get', '/api/system/getCustomerList').subscribe((data) =>{
      console.log('data-', data);
      if (data['success'] == true){
        this.customerData =  [];
        this.customerData = data['data']['data'];
        this.commonService.flashMessage('success', 'Success', data['message']);
      }else if (data['success'] == false){
        this.commonService.flashMessage('warning', 'Warning', data['message']);
      }
    }, err =>{
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

  getRoles(): void {
    this.commonService.apiCall('get', '/api/metadata/getRoles').subscribe((data) =>{
      if (data['success'] == true){
        this.rolesData =  [];
        this.rolesData = data['data']['data'];
        // this.commonService.flashMessage('success', 'Success', data['message']);
        for(var i = 0; i < this.rolesData.length; i++){
          this.rolesData[i]['checked'] = false;
          this.rolesOptionList.push({id: data['data']['data'][i]['id'], text: data['data']['data'][i]['name']})
        }
      }else if (data['success'] == false){
        // this.commonService.flashMessage('warning', 'Warning', data['message']);
      }
    }, err =>{
      this.commonService.flashMessage('error', 'Error', err['message']);
    });
  }

  customerDetails(data){
    this.customerDetailsData = data;
  }

  assignRoleToCustomer(){
    var sendOBJ = {
      "role_id": this.assignRole.value.role,
      "user_id": this.customerDetailsData.id,
    }
    this.commonService.apiCall('post', '/api/metadata/assignRole', sendOBJ).subscribe((data) =>{
      if (data['success'] == true){
        this.closeModal();
        this.assignRole.reset();
        this.commonService.flashMessage('success', 'Success', data['message']);
      }else if (data['success'] == false){
        this.closeModal();
        this.assignRole.reset();
        this.commonService.flashMessage('warning', 'Warning', data['message']);
      }
    }, err =>{
      this.closeModal();
      this.commonService.flashMessage('error', 'Error', err['error']['message']);
    });
  }
}
