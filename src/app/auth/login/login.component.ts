import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userLogin: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    password: new FormControl('', Validators.required),
  });

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
  }
  userLogIn(): void {
    const sendOBJ = this.userLogin.value;
    this.commonService.apiCall('post', '/api/auth/adminLogin', sendOBJ).subscribe((data) => {
        if (data['success'] == true){
          localStorage.setItem('token', data['data']['token']);
          localStorage.setItem('userData', JSON.stringify(data['data']['userData']));
          this.commonService.flashMessage('success', 'Success', data['message']);
          this.commonService.navigateTo('admin');
        }
      }, error => {
        this.commonService.flashMessage('error', 'Error', error['error'].message);
    });
  }
}
