import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './about.html',
  styleUrls: ['./about.css']
})
export class AboutComponent {

  contact = {
    name: '',
    email: '',
    message: ''
  };

  successMsg = '';

  constructor(private http: HttpClient , private cdr: ChangeDetectorRef) {}

  sendMessage(form:any) {
  this.http.post('http://localhost:3000/api/contact', this.contact)
    .subscribe({
      next: () => {
        this.successMsg = "GreenNest 🌱: Thank you For contacting Us 😊";
        this.contact = { name: '', email: '', message: '' };
        this.cdr.detectChanges();

      },
      error: () => {
        alert("Error sending message");
      }
    });
}
}