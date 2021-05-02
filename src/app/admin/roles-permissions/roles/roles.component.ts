import {Component, OnInit, TemplateRef } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  rolesData =  [];
  permissionData = [];

  addRoleForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    permission_ids: new FormControl([]),
  });

  selectedRoleForEdit = {};
  editRoleID = '';
  editRoleForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    permission_ids: new FormControl([]),
  });

  itemsPerPage = 5;
  currentPage = 1;

  constructor(private commonService: CommonService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getRoles();
    this.getPermissions();
  }

  getRoles(): void {
    this.commonService.apiCall('get', '/api/metadata/getRoles').subscribe((data) =>{
      if (data['success'] == true){
        this.rolesData =  [];
        this.rolesData = data['data']['data'];
        this.commonService.flashMessage('success', 'Success', data['message']);
      }else if (data['success'] == false){
        this.commonService.flashMessage('warning', 'Warning', data['message']);
      }
    }, err =>{
      this.commonService.flashMessage('error', 'Error', err['message']);
    });
  }

  getPermissions(): void {
    this.commonService.apiCall('get', '/api/metadata/getPermissionsList').subscribe((data) =>{
      if (data['success'] == true){
        this.permissionData =  [];
        this.permissionData = data['data']['data'];
        for(var i = 0; i < this.permissionData.length; i++){
          this.permissionData[i]['checked'] = false;
        }
        // this.commonService.flashMessage('success', 'Success', data['message']);
      }else if (data['success'] == false){
        // this.commonService.flashMessage('warning', 'Warning', data['message']);
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

  addRoles(){


    var permissionID = [];
    for(var i = 0; i < this.permissionData.length; i++){
      if(this.permissionData[i]['checked'] == true){
        permissionID.push(this.permissionData[i]['id'])
      }
    }
    var sendOBJ = {
      name : this.addRoleForm.value.name,
      permission_ids : permissionID.join()
    }

    this.commonService.apiCall('post', '/api/metadata/createRole', sendOBJ).subscribe((data) =>{
      if (data['success'] == true){
        this.closeModal();
        this.getRoles();
        this.commonService.flashMessage('success', 'Success', data['message']);
      }else if (data['success'] == false){
        this.commonService.flashMessage('warning', 'Warning', data['message']);
      }
    }, err =>{
      this.commonService.flashMessage('error', 'Error', err['error']['message']);
    });
  }

  selectedPermission(permission, index){
    this.permissionData[index]['checked'] = !this.permissionData[index]['checked'];
  }

  checkList(rol){
    for(var i = 0; i < this.permissionData.length; i++){
      if(this.permissionData[i]['name'] == rol['name']){
        return true;
      }
    }

  }

  editRoles(role){
    console.log(role);
    this.editRoleID = role.id;
    this.selectedRoleForEdit = role;
    this.editRoleForm.patchValue({
      name: role.name,
    });

    for(var i = 0; i < this.permissionData.length; i++){
      this.permissionData[i]['checked'] = false;
    }

    var flag = false;
    for(var i = 0; i < role['permissions'].length; i++){

      flag = this.checkList(role['permissions'][i]);
      if(flag){
        this.permissionData[i]['checked'] = true;
      }
      else{
        this.permissionData[i]['checked'] = false;
      }
    }
  }

  updateRoles(){

    var permissionID = [];
    for(var i = 0; i < this.permissionData.length; i++){
      if(this.permissionData[i]['checked'] == true){
        permissionID.push(this.permissionData[i]['id'])
      }
    }
    var sendOBJ = {
      name : this.editRoleForm.value.name,
      permission_ids : permissionID.join()
    }

    this.commonService.apiCall('put', '/api/metadata/updateRole/' + this.editRoleID, sendOBJ).subscribe((data) =>{
      if (data['success'] == true){
        this.closeModal();
        this.getRoles();
        this.commonService.flashMessage('success', 'Success', data['message']);
      }else if (data['success'] == false){
        this.commonService.flashMessage('warning', 'Warning', data['message']);
      }
    }, err =>{
      this.commonService.flashMessage('error', 'Error', err['error']['message']);
    });

  }

}
