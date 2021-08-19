import {Component, OnInit, TemplateRef } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  adminUsersData =  [];

  adminDetailsData = null;

  assignRole: FormGroup = new FormGroup({
    role: new FormControl('', Validators.required),
  });
  rolesData = [];
  rolesOptionList = [];

  options = {};

  itemsPerPage = 50;
  currentPage = 1;


  constructor(private commonService: CommonService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getAdminUsers();
    this.getRoles();
    this.options = {
      width: '450',
      multiple: false,
    };
  }

  getAdminUsers(): void {
    this.commonService.loader(true);
    this.commonService.apiCall('get', '/api/system/getAdminList').subscribe((data) =>{
      this.commonService.loader(false);
      console.log('data-', data);
      if (data['success'] == true){
        this.adminUsersData =  [];
        this.adminUsersData = data['data']['data'];
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

  getRoles(): void {
    this.commonService.loader(true);
    this.commonService.apiCall('get', '/api/metadata/getRoles').subscribe((data) =>{
      this.commonService.loader(false);
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
      this.commonService.loader(false);
      this.commonService.flashMessage('error', 'Error', err['message']);
    });
  }

  adminDetails(expert){
    this.adminDetailsData = expert;
  }

  assignRoleToAdmin(){
    var sendOBJ = {
      "role_id": this.assignRole.value.role,
      "user_id": this.adminDetailsData.id,
    }
    this.commonService.loader(true);
    this.commonService.apiCall('post', '/api/metadata/assignRole', sendOBJ).subscribe((data) =>{
      this.commonService.loader(false);
      if (data['success'] == true){
        this.closeModal();
        this.commonService.flashMessage('success', 'Success', data['message']);
      }else if (data['success'] == false){
        this.closeModal();
        this.commonService.flashMessage('warning', 'Warning', data['message']);
      }
    }, err =>{
      this.commonService.loader(false);
      this.closeModal();
      this.commonService.flashMessage('error', 'Error', err['error']['message']);
    });
  }

}
