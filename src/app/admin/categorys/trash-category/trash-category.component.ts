import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-trash-category',
  templateUrl: './trash-category.component.html',
  styleUrls: ['./trash-category.component.css']
})
export class TrashCategoryComponent implements OnInit {
  trashCategories = [];

  itemsPerPage = 5;
  currentPage = 1;

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.getTrashCategories()
  }

  getTrashCategories(): void {
    this.commonService.apiCall('get', '/api/metadata/getTrashedCategory?pageNo=0&limit=' + this.itemsPerPage).subscribe((data) =>{
      console.log('data-', data);
      if (data['success'] == true){
        this.trashCategories =  [];
        this.trashCategories = data['data']['data'];
        console.log('categoryData-', this.trashCategories);
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

  restoreCategory(catData){

  }

  deletePermanently(catData){

  }

}
