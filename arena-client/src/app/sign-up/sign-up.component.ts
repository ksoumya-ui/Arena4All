import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

   userName: string = '';
   password: String = '';
   emailId: String = '';

  constructor(private httpService: HttpService, private toastr: ToastrService,private _router: Router) { }

  ngOnInit(): void {
  }

  public createUser: any = () => {
    const newUser = {
      username: this.userName,
      password: this.password,
      emailId: this.emailId
    };
    this.httpService.signUp(newUser).subscribe(
      (response:any) => {
        if (response['status'] === 200) {
        this.toastr.success('User Created successfully!!');
        setTimeout(() => {
          this._router.navigate(['/home']);
        },0);
        } else if (response['status'] === 500) {
          this.toastr.warning('UserName or Email already Exists!!');
        }
        console.log(response);
    },
      (err) => {
        console.log(err.message);
        this.toastr.error('Some Error Occured!!');
      }
    );
  }
}

