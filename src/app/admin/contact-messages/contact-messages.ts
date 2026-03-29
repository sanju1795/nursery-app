import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-messages',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './contact-messages.html',
  styleUrls: ['./contact-messages.css']
})
export class ContactMessagesComponent implements OnInit {

  messages: any[] = [];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadMessages();
    this.cdr.detectChanges();
  }

 loadMessages() {
  this.http.get<any[]>('http://localhost:3000/api/contact')
    .subscribe({
      next: (data) => {
        console.log(data); // 🔥 IMPORTANT
        this.messages = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
      }
    });
}

  deleteMessage(id: string) {
  this.http.delete(`http://localhost:3000/api/contact/${id}`)
    .subscribe(() => {
      this.loadMessages();
      this.cdr.detectChanges();
    });
}

sendReply(msg: any) {

  console.log("clicked",msg)
  this.http.post(`http://localhost:3000/api/contact/reply/${msg._id}`, {
    reply: msg.reply
  }).subscribe({
    next: () => {
      alert("Reply sent successfully ✅");
      this.loadMessages();
    },
    error: () => {
      alert("Error sending reply ❌");
    }
  });
}

}