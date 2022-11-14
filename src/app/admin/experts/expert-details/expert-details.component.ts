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
  reason = '';
  expertDetails=null;
  walletLogData =  [];
  itemsWalletLogDataPerPage = 15;
  currentWalletLogDataPage = 0;
  totalWalletLogDataItems=0;
  amountToTransfer=0;
  walletBalance = 0;
  constructor(private route: ActivatedRoute,
              private commonService: CommonService,
              private modalService: BsModalService) {
    this.id = this.route.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.getExpertDetails()
    this.getWalletLogData();
    this.getWalletBalance();
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
    if(this.reason==''){
      this.commonService.flashMessage('error', 'Success', 'Please Enter Comment');
      return;
    }
    sendOBJ['rejection_result']=this.reason;
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
      this.commonService.flashMessage('error', 'Error', err['message']);
    });
  }

  getWalletLogData(pageNo=0){

      this.commonService.loader(true);
      this.commonService.apiCall('get', `/api/metadata/getTransactionHistoryForAdmin?expert_id=${this.id}&pageNo=${pageNo}&limit=` + this.itemsWalletLogDataPerPage).subscribe((data) =>{
        this.commonService.loader(false);
        if (data['success'] == true){

          this.walletLogData = data['data']['data'];
          this.totalWalletLogDataItems=data['data']['count'];
          this.commonService.flashMessage('success', 'Success', data['message']);
        }else if (data['success'] == false){
          this.walletLogData =  [];
          this.commonService.flashMessage('warning', 'Warning', data['message']);
        }
      }, err =>{
        this.commonService.loader(false);
        this.commonService.flashMessage('error', 'Error', err['message']);
      });

  }

  walletDataPageChange(event){
    // this.currentWalletLogDataPage = event.page-1;
    this.getWalletLogData(event.page-1);
  }

  withdraw(){
    if(this.amountToTransfer<=0){
      this.commonService.flashMessage('error','error',"Amount must be greater than zero")
      return
    }
    if(this.amountToTransfer>this.walletBalance){
      this.commonService.flashMessage('error','error',"Amount must be less than walletbalance")
      return
    }
    this.commonService.loader(true);
    this.commonService.apiCall('post', `/api/metadata/payToExpert/${this.id}`,{amount:this.amountToTransfer}).subscribe((data) =>{
      this.commonService.loader(false);
      if (data['success'] == true){


        window.location.reload()


      }else if (data['success'] == false){

        this.commonService.flashMessage('warning', 'Warning', data['message']);
      }
    }, err =>{
      this.commonService.loader(false);
      this.commonService.flashMessage('error', 'Error', err['message']);
    });
  }
  getWalletBalance(){

    this.commonService.loader(true);
    this.commonService.apiCall('get', `/api/metadata/getExpertWalletBalance?expert_id=${this.id}`).subscribe((data) =>{
      this.commonService.loader(false);
      if (data['success'] == true){

        this.walletBalance=data['data']['balance'];
      }else if (data['success'] == false){
        this.walletLogData =  [];
        this.commonService.flashMessage('warning', 'Warning', data['message']);
      }
    }, err =>{
      this.commonService.loader(false);
      this.commonService.flashMessage('error', 'Error', err['message']);
    });
  }

}
