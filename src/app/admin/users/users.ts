import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.html'
})
export class UsersComponent {

 users = [

{
name: "Rahul Sharma",
email: "rahul@gmail.com"
},

{
name: "Priya Patel",
email: "priya@gmail.com"
},

{
name: "Amit Shah",
email: "amit@gmail.com"
}

]; 

}