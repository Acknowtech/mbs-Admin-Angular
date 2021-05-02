import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    if(!localStorage.getItem('isReloaded')){
      localStorage.setItem('isReloaded','reloaded');
      window.location.reload();
    }
    console.log('in admin component---');
  }

}
