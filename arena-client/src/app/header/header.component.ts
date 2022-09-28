import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logIn:boolean=false;
  constructor() { }

  ngOnInit(): void {
    let login= localStorage.getItem('login');
    this.logIn = login == 'true'? true:false;
  }

}
