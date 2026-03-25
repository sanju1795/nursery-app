import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../../services/blog.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterLink,FormsModule],
  templateUrl: './blog.html',
  styleUrls: ['./blog.css']
})
export class BlogComponent implements OnInit {

  blogs: any[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    this.blogService.getBlogs().subscribe((res: any) => {
      this.blogs = res;
    });
  }

  blog: any = {};

addBlog() {
  this.blogService.addBlog(this.blog).subscribe(() => {
    alert("Blog Added");
    this.blog = {};
    this.ngOnInit();
  });
}
}