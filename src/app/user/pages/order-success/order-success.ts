import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './order-success.html',
  styleUrls: ['./order-success.css']
})
export class OrderSuccessComponent implements OnInit {

  orderId: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {

    // Random Order ID Generate
    this.orderId = 'GN' + Math.floor(100000 + Math.random() * 900000);

    // 5 seconds auto redirect
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 10000);

  }

}