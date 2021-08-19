import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommonService} from '../../../services/common.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-expert-details',
  templateUrl: './expert-details.component.html',
  styleUrls: ['./expert-details.component.css']
})
export class ExpertDetailsComponent implements OnInit {
  @ViewChild('userChangeStatus') userChangeStatus;
  id;
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class : "modal-lg"
  };
  expertDetails=null;
  constructor(private route: ActivatedRoute,
              private commonService: CommonService,
              private modalService: BsModalService) {
    this.id = this.route.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.getExpertDetails()
  }


  getExpertDetails(){
    this.commonService.loader(true);
    this.commonService.apiCall('get','/api/metadata/showExpert/'+this.id).subscribe(data=>{
      this.commonService.loader(false)
      if(data['success']==true){
        this.expertDetails = data['data']['data'];
      }else{
        this.commonService.flashMessage('error', 'Warning', data['message']);
      }
    },error => {
      this.commonService.loader(false)
      this.commonService.flashMessage('error', 'Warning', error['message']);
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }
  closeModal(){
    this.modalRef.hide();
  }

  expertAllowRejectAction(action){

    var sendOBJ = {
      is_verified: action
    }
    this.commonService.loader(true);
    this.commonService.apiCall('post', '/api/metadata/verifyExpert/' + this.expertDetails.id, sendOBJ).subscribe((data) =>{
      this.commonService.loader(false);
      if (data['success'] == true){
        this.closeModal();
        this.getExpertDetails();
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
