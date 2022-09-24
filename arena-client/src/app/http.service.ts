import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  public signUp = (userData: any) => {
    return this.http.post('/api/user/signup', userData);
  }

  public loginUser = (userData:any) => {
    return this.http.post(`/api/user/login`,userData);
  }

  public createPost = (postData:any) => {
    return this.http.post(`/api/feed/create`,postData);
  }

  public getFeed = () => {
    return this.http.get(`/api/feed/fetch_all`);
  }
  public getUserPosts = (user:any) => {
    return this.http.get(`/api/feed/fetch/:${user}`);
  }

  public addView = (postId:any) => {
    return this.http.post(`/api/feed/view/:id`, postId);
  }

  public addDownload = (postId:any) => {
    return this.http.post(`/feed/download/:id`, postId);
  }

  public addLike = (postId:any) => {
    return this.http.post(`/feed/like/:id`, postId);
  }
}