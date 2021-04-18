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
    this.commonService.apiCall('post', 'http://localhost:8000/auth/login', sendOBJ).subscribe((data) => {
      console.log('Data--------', data);
      localStorage.setItem('token', data['access_token']);
      this.commonService.flashMessage('success', 'Success', 'Success in MBS Connect...');
      this.demo();
      }, error => {
      console.log('Error in login');
      this.commonService.flashMessage('error', 'Error', 'Error in MBS Connect...');
    });
  }
  demo(): void {
  this.commonService.apiCall('get', 'http://localhost:8000/products').subscribe((data) => {
  console.log('Data--------', data);
  this.commonService.flashMessage('success', 'Success', 'Success in MBS Connect...');
}, error => {
  console.log('Error in login');
  this.commonService.flashMessage('error', 'Error', 'Error in MBS Connect...');
});
}
}
