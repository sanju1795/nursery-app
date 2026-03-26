import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.html'
})
export class UsersComponent implements OnInit {

  users:any[] = [];

  newUser:any = {
    name:'',
    email:''
  };

  constructor(
    private service: UserService,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(){
    this.loadUsers();
  }

  loadUsers(){
    this.service.getUsers().subscribe((res:any)=>{
      console.log("USERS:", res);
      this.users = res || [];
      this.cdr.detectChanges();
    });
  }

  addUser(){
    if(!this.newUser.name || !this.newUser.email) return;

    this.service.addUser(this.newUser).subscribe((res:any)=>{
      // 🔥 instant show
      this.users.unshift(res);

      this.newUser = { name:'', email:'' };
      this.cdr.detectChanges();
    });
  }

  deleteUser(id:any){
    this.service.deleteUser(id).subscribe(()=>{
      this.users = this.users.filter(u => u._id !== id);
      this.cdr.detectChanges();
    });
  }

}