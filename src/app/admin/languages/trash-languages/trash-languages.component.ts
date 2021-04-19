import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-trash-languages',
  templateUrl: './trash-languages.component.html',
  styleUrls: ['./trash-languages.component.css']
})
export class TrashLanguagesComponent implements OnInit {
  trashLanguages = [];

  itemsPerPage = 5;
  currentPage = 1;

  constructor(private commonService: CommonService,) { }

  ngOnInit(): void {
    this.getTrashLanguages();
  }

  getTrashLanguages(): void {
    this.commonService.apiCall('get', '/api/metadata/getTrashedLanguage?pageNo=0&limit=' + this.itemsPerPage).subscribe((data) =>{
      console.log('data-', data);
      if (data['success'] == true){
        this.trashLanguages =  [];
        this.trashLanguages = data['data']['data'];
        console.log('categoryData-', this.trashLanguages);
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


  restoreLanguage(lagData){

  }

  deletePermanently(lagData){
    this.commonService.apiCall('delete', '/api/metadata/deletePermanentLanguage/' + lagData.id).subscribe((data) => {
      if (data['success'] == true){
        this.commonService.flashMessage('success', 'Success', data['message']);
        this.getTrashLanguages();
      }else if (data['success'] == false){
        this.commonService.flashMessage('warning', 'Warning', data['message']);
      }
    }, err => {
      this.commonService.flashMessage('error', 'Error', err['message']);
    });
  }

}
