import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CommonService} from '../../../services/common.service';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  subCategoryData =  [];

  addCategoryForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    category_id: new FormControl('',Validators.required),
  });
  selectedFile = null;

  editSubCategoryId = null;
  editCategoryForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    category_id: new FormControl('',Validators.required),
  });

  itemsPerPage = 25;
  currentPage = 0;
  totalCount = 0;
  allCategories = [];
  constructor(private commonService: CommonService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getSubCategory();
    this.getAllCategory();
  }

  getSubCategory(): void {
    this.commonService.loader(true);
    this.subCategoryData =  [];
    this.commonService.apiCall('get', '/api/system/getExpertise?pageNo='+this.currentPage+'&limit=' + this.itemsPerPage).subscribe((data) =>{
      this.commonService.loader(false);
      console.log('data-', data);
      if (data['success'] == true){

        this.subCategoryData = data['data']['data'];
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
  getAllCategory(): void {
    this.commonService.loader(true);
    this.allCategories =  [];
    this.commonService.apiCall('get', '/api/system/getCategory?pageNo='+this.currentPage+'&limit=' + this.itemsPerPage).subscribe((data) =>{
      this.commonService.loader(false);
      console.log('data-', data);
      if (data['success'] == true){
        this.allCategories = data['data']['data'];
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
    this.getSubCategory();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  closeModal(){
    this.modalRef.hide();
  }

  addCategory(): void {
    if(this.addCategoryForm.valid ){
      const formData = new FormData();
      formData.append('category_id', this.addCategoryForm.value.category_id);
      formData.append('name', this.addCategoryForm.value.name);
      this.commonService.loader(true);
      this.commonService.apiCall('post', '/api/metadata/createExpertise', formData).subscribe((data) => {
        this.commonService.loader(false);
        if (data['success'] == true){
          this.selectedFile = null;
          this.addCategoryForm.reset();
          this.modalRef.hide();
          this.commonService.flashMessage('success', 'Success', data['message']);
          this.getSubCategory();
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
    this.editSubCategoryId = langData.id;
    this.editCategoryForm.patchValue({
      name: langData.name,
      category_id: langData.category_id
    });
  }

  updateCategory(){
    if(this.editCategoryForm.valid){
      const formData = new FormData();
      formData.append('category_id', this.editCategoryForm.value.category_id);
      formData.append('name', this.editCategoryForm.value.name);
      console.log('data', this.editCategoryForm.value);
      console.log('formData', formData);
      this.commonService.loader(true);
      this.commonService.apiCall('post', '/api/metadata/updateExpertise/'+this.editSubCategoryId, formData).subscribe((data) => {
        this.commonService.loader(false);
        if (data['success'] == true){
          this.selectedFile = null;
          this.editSubCategoryId = null;
          this.editCategoryForm.reset();
          this.modalRef.hide();
          this.commonService.flashMessage('success', 'Success', data['message']);
          this.getSubCategory();
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
    this.commonService.apiCall('delete', '/api/metadata/deleteExpertise/' + lagData.id).subscribe((data) => {
      this.commonService.loader(false);
      if (data['success'] == true){
        this.commonService.flashMessage('success', 'Success', data['message']);
        this.getSubCategory();
      }else if (data['success'] == false){
        this.commonService.flashMessage('warning', 'Warning', data['message']);
      }
    }, err => {
      this.commonService.loader(false);
      this.commonService.flashMessage('error', 'Error', err['message']);
    });
  }

}
