import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  baseUrl = 'http://localhost:3000/api/blogs';

  constructor(private http: HttpClient) {}

  getBlogs() {
    return this.http.get(this.baseUrl);
  }

  getBlogById(id: string) {
    return this.http.get(this.baseUrl + '/' + id);
  }

  addBlog(data: any) {
    return this.http.post(this.baseUrl, data);
  }

  deleteBlog(id: string) {
    return this.http.delete(this.baseUrl + '/' + id);
  }
}