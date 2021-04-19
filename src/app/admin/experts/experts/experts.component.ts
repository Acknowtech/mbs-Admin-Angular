import {Component, OnInit, TemplateRef } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
// import { Select2OptionData } from 'ng-Select2';
import { Options } from 'select2';

@Component({
  selector: 'app-experts',
  templateUrl: './experts.component.html',
  styleUrls: ['./experts.component.css']
})
export class ExpertsComponent implements OnInit {

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  expertsData =  [];
  expertDetailsData = null;
  actionData = null;

  exampleData = [];
  options = {};
  value1 = [];

  itemsPerPage = 5;
  currentPage = 1;

  constructor(private commonService: CommonService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getExperts();
    this.exampleData = [
      {id: 'basic1', text: 'Basic 1'},
      {id: 'basic2', disabled: true, text: 'Basic 2'},
      {id: 'basic3', text: 'Basic 3'},
      {id: 'basic4', text: 'Basic 4'}
    ];
    this.options = {
      width: '500',
      multiple: false,
    };
  }

  getExperts(): void {
    this.commonService.apiCall('get', '/api/system/getExpertList?pageNo=0&limit=' + this.itemsPerPage).subscribe((data) =>{
      console.log('data-', data);
      if (data['success'] == true){
        this.expertsData =  [];
        this.expertsData = data['data']['data'];
        console.log('expertsData-', this.expertsData);
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
    this.actionData = null;
  }

  expertAction(expert){
    this.actionData = expert;
  }

  expertAllowRejectAction(action){

    console.log('===', this.actionData);
    console.log('===', action);
  }

  expertDetails(expert){
    this.expertDetailsData = expert;

  }
}
