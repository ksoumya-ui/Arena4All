import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  {
   userName:String ='';
   password: String = ''; 


  constructor(private httpService: HttpService, private toastr: ToastrService,private _router: Router) { }

  ngOnInit(): void {
  }


  loginUser: any = () => {
    const userData = {
      email : this.userName,
      password : this.password
    };
    this.httpService.loginUser(userData).subscribe(
      (response:any) => {
        console.log(response);
        if (response['status'] === 200 ) {
          this.toastr.success('Logged In Successfully!!');
          setTimeout(() => {
            this._router.navigate(['/create-post']);
          });

        } else if (response['status'] === 404) {
          this.toastr.warning('User Not Registered');
        } else {
          this.toastr.warning('Wrong UserName or Password');
        }
      },
      (err) => {
        console.log(err);
        this.toastr.error('Some Error Occured!!');
      });
  }


}