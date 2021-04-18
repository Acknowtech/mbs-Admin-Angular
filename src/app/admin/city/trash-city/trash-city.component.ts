import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-trash-city',
  templateUrl: './trash-city.component.html',
  styleUrls: ['./trash-city.component.css']
})
export class TrashCityComponent implements OnInit {
  trashCity = [];

  itemsPerPage = 5;
  currentPage = 1;

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.getTrashCity();
  }

  getTrashCity(): void {
    this.commonService.apiCall('get', '/api/metadata/getTrashedCity?pageNo=0&limit=' + this.itemsPerPage).subscribe((data) =>{
      console.log('data-', data);
      if (data['success'] == true){
        this.trashCity =  [];
        this.trashCity = data['data']['data'];
        console.log('categoryData-', this.trashCity);
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


  restoreLanguage(cityData){

  }

  deletePermanently(cityData){
    this.commonService.apiCall('delete', '/api/metadata/deletePermanentCity/' + cityData.id).subscribe((data) => {
      if (data['success'] == true){
        this.commonService.flashMessage('success', 'Success', data['message']);
        this.getTrashCity();
      }else if (data['success'] == false){
        this.commonService.flashMessage('warning', 'Warning', data['message']);
      }
    }, err => {
      this.commonService.flashMessage('error', 'Error', err['message']);
    });
  }

}
