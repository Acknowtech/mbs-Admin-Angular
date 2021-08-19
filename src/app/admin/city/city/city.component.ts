import { Component, TemplateRef, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  cityData = [];

  addCityForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  editCityId = null;
  editCityForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  itemsPerPage = 5;
  currentPage = 1;

  constructor(private commonService: CommonService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getCity();
  }

  getCity(): void {
    this.commonService.loader(true);
    this.commonService.apiCall('get', '/api/system/getCity?pageNo=' + '0' + '&limit=' + this.itemsPerPage).subscribe((data) => {
      this.commonService.loader(false);
      if (data['success'] == true){
        this.cityData =  [];
        this.cityData = data['data']['data'];
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

  addCity(): void {
    console.log('data', this.addCityForm.value);
    if(this.addCityForm.valid){
      const formData = new FormData();
      formData.append('name', this.addCityForm.value.name);

      const sendOBJ = {
        name : this.addCityForm.value.name,
      }
      this.commonService.loader(true);
      this.commonService.apiCall('post', '/api/metadata/createCity', formData).subscribe((data) => {
        this.commonService.loader(false);
        if (data['success'] == true){
          this.modalRef.hide();
          this.addCityForm.reset();
          this.commonService.flashMessage('success', 'Success', data['message']);
          this.getCity();
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
    this.editCityId = langData.id;
    this.editCityForm.patchValue({
      name: langData.name,
      languageIcon: ''
    });
  }
  updateCity(){
    if(this.editCityForm.valid){
      const formData = new FormData();
      formData.append('city_id', this.editCityId);
      formData.append('name', this.editCityForm.value.name);
      console.log('data', this.editCityForm.value);
      console.log('formData', formData);
      this.commonService.loader(true);
      this.commonService.apiCall('post', '/api/metadata/updateCity', formData).subscribe((data) => {
        this.commonService.loader(false);
        if (data['success'] == true){
          this.editCityId = null;
          this.editCityForm.reset();
          this.modalRef.hide();
          this.commonService.flashMessage('success', 'Success', data['message']);
          this.getCity();
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

  deleteCity(cityData){
    this.commonService.loader(true);
    this.commonService.apiCall('delete', '/api/metadata/deleteCity/' + cityData.id).subscribe((data) => {
      this.commonService.loader(false);
      if (data['success'] == true){
        this.commonService.flashMessage('success', 'Success', data['message']);
        this.getCity();
      }else if (data['success'] == false){
        this.commonService.flashMessage('warning', 'Warning', data['message']);
      }
    }, err => {
      this.commonService.loader(false);
      this.commonService.flashMessage('error', 'Error', err['message']);
    });
  }

}
