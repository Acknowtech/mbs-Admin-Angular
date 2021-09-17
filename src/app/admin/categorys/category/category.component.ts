import {Component, OnInit, TemplateRef } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  categoryData =  [];

  addCategoryForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    categoryIcon: new FormControl(''),
  });
  selectedFile = null;

  editCategoryId = null;
  editCategoryForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    categoryIcon: new FormControl(''),
  });

  itemsPerPage = 25;
  currentPage = 0;
  totalCount = 0;

  constructor(private commonService: CommonService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory(): void {
    this.commonService.loader(true);
    this.categoryData =  [];
    this.commonService.apiCall('get', '/api/system/getCategory?pageNo='+this.currentPage+'&limit=' + this.itemsPerPage).subscribe((data) =>{
      this.commonService.loader(false);
      console.log('data-', data);
      if (data['success'] == true){

        this.categoryData = data['data']['data'];
        if(this.currentPage==0){
          this.totalCount=data['data']['count'];
        }

        this.commonService.flashMessage('success', 'Success', data['message']);
      }else if (data['success'] == false){
        this.commonService.flashMessage('warning', 'Warning', data['message']);
      }
    }, err =>{
      this.commonService.loader(false);
      this.commonService.flashMessage('error', 'Error', err['message']);
    });
  }
  onFileSelected(event): void{
    const status = this.commonService.fileUploadValidation(event);
    if (status == true){
      this.selectedFile = event.target.files[0];
    }
  }

  pageChange(event){
    console.log(event)
    this.currentPage = event.page-1;
    console.log(this.currentPage);
    this.getCategory();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  closeModal(){
    this.modalRef.hide();
  }

  addCategory(): void {
    if(this.addCategoryForm.valid && this.selectedFile != null){
      const formData = new FormData();
      formData.append('categoryIcon', this.selectedFile);
      formData.append('name', this.addCategoryForm.value.name);
      this.commonService.loader(true);
      this.commonService.apiCall('post', '/api/metadata/createCategory', formData).subscribe((data) => {
        this.commonService.loader(false);
        if (data['success'] == true){
          this.selectedFile = null;
          this.addCategoryForm.reset();
          this.modalRef.hide();
          this.commonService.flashMessage('success', 'Success', data['message']);
          this.getCategory();
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

  editCategory(langData){
    this.editCategoryId = langData.id;
    this.editCategoryForm.patchValue({
      name: langData.name,
      categoryIcon: ''
    });
  }

  updateCategory(){
    if(this.editCategoryForm.valid){
      const formData = new FormData();
      formData.append('category_id', this.editCategoryId);
      formData.append('name', this.editCategoryForm.value.name);
      if(this.selectedFile){
        formData.append('categoryIcon', this.selectedFile);
      }

      console.log('data', this.editCategoryForm.value);
      console.log('formData', formData);
      this.commonService.loader(true);
      this.commonService.apiCall('post', '/api/metadata/updateCategory', formData).subscribe((data) => {
        this.commonService.loader(false);
        if (data['success'] == true){
          this.selectedFile = null;
          this.editCategoryId = null;
          this.editCategoryForm.reset();
          this.modalRef.hide();
          this.commonService.flashMessage('success', 'Success', data['message']);
          this.getCategory();
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

  deleteCategory(lagData){
    this.commonService.loader(true);
    this.commonService.apiCall('delete', '/api/metadata/deleteLanguage/' + lagData.id).subscribe((data) => {
      this.commonService.loader(false);
      if (data['success'] == true){
        this.commonService.flashMessage('success', 'Success', data['message']);
        this.getCategory();
      }else if (data['success'] == false){
        this.commonService.flashMessage('warning', 'Warning', data['message']);
      }
    }, err => {
      this.commonService.loader(false);
      this.commonService.flashMessage('error', 'Error', err['message']);
    });
  }

}
