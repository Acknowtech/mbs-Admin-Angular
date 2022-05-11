import { Component, TemplateRef, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  languageData = [];

  addLanguageForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    languageIcon: new FormControl(''),
  });
  selectedFile = null;
  addLanguageModalFlag = false;

  editLanguageId = null;
  editLanguageForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    languageIcon: new FormControl(''),
  });

  itemsPerPage = 15;
  currentPage = 1;

  constructor(private commonService: CommonService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getLanguage();
  }
  getLanguage(): void {
    this.commonService.loader(true);
    this.commonService.apiCall('get', '/api/system/getLanguage?pageNo=' + '0' + '&limit=' + this.itemsPerPage).subscribe((data) => {
      this.commonService.loader(false);
      if (data['success'] == true){
        console.log(data)
        this.languageData =  [];
        this.languageData = data['data']['data'];
        this.commonService.flashMessage('success', 'Success', data['message']);
      }else if (data['success'] == false){
        this.commonService.flashMessage('warning', 'Warning', data['message']);
      }
    }, err => {
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

  onFileSelected(event): void{
    console.log('event', event);
    const status = this.commonService.fileUploadValidation(event);
    if (status == true){
      this.selectedFile = event.target.files[0];
    }
  }

  addLanguage(): void {
    console.log('data', this.addLanguageForm.value);
    if(this.addLanguageForm.valid && this.selectedFile != null){
      const formData = new FormData();
      formData.append('languageIcon', this.selectedFile);
      formData.append('name', this.addLanguageForm.value.name);

      const sendOBJ = {
        name : this.addLanguageForm.value.name,
        languageIcon : this.selectedFile,
      }
      this.commonService.loader(true);
      this.commonService.apiCall('post', '/api/metadata/createLanguage', formData).subscribe((data) => {
        this.commonService.loader(false);
        if (data['success'] == true){

          this.selectedFile = null;
          this.modalRef.hide();
          this.addLanguageForm.reset();
          this.commonService.flashMessage('success', 'Success', data['message']);
          this.getLanguage();
        }else if (data['success'] == false){
          this.commonService.flashMessage('warning', 'Warning', data['message']);
        }
      }, err => {
        this.commonService.loader(false);
        this.commonService.flashMessage('error', 'Error', err['message']);
      });

    }else{
      this.commonService.flashMessage('warning', 'Warning', 'Please fill all fields.');
    }
  }

  editLanguage(langData){
    this.editLanguageId = langData.id;
    this.editLanguageForm.patchValue({
      name: langData.name,
      languageIcon: ''
    });
  }
  updateLanguage(){
    if(this.editLanguageForm.valid){
      const formData = new FormData();
      formData.append('language_id', this.editLanguageId);
      formData.append('name', this.editLanguageForm.value.name);
      formData.append('languageIcon', this.selectedFile);
      console.log('data', this.editLanguageForm.value);
      console.log('formData', formData);
      this.commonService.loader(true);
      this.commonService.apiCall('post', '/api/metadata/updateLanguage', formData).subscribe((data) => {
        this.commonService.loader(false);
        if (data['success'] == true){
          this.selectedFile = null;
          this.editLanguageId = null;
          this.editLanguageForm.reset();
          this.modalRef.hide();
          this.commonService.flashMessage('success', 'Success', data['message']);
          this.getLanguage();
        }else if (data['success'] == false){
          this.commonService.flashMessage('warning', 'Warning', data['message']);
        }
      }, err => {
        this.commonService.loader(false);
        this.commonService.flashMessage('error', 'Error', err['message']);
      });

    }else{
      this.commonService.flashMessage('warning', 'Warning', 'Please fill all fields.');
    }
  }

  deleteLanguage(lagData){
    this.commonService.loader(true);
    this.commonService.apiCall('delete', '/api/metadata/deleteLanguage/' + lagData.id).subscribe((data) => {
      this.commonService.loader(false);
      if (data['success'] == true){
        this.commonService.flashMessage('success', 'Success', data['message']);
        this.getLanguage();
      }else if (data['success'] == false){
        this.commonService.flashMessage('warning', 'Warning', data['message']);
      }
    }, err => {
      this.commonService.loader(false);
      this.commonService.flashMessage('error', 'Error', err['message']);
    });
  }
}
