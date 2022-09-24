import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
   emailId: string = '';
   details: String = '';
   title:String=''

  constructor(private httpService: HttpService, private toastr: ToastrService,private _router: Router) { }

  ngOnInit(): void {
  }


  onCreatePostClick = ()=>{
    let postData ={
      owner : this.emailId,
      title : this.title,
      body : this.details
    }

    this.httpService.createPost(postData).subscribe(
      (response:any) => {
        if (response['status'] === 200) {
        this.toastr.success('Post Created successfully!!');
        setTimeout(() => {
          this._router.navigate(['/home']);
        });
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
