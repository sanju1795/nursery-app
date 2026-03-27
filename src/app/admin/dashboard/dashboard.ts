import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  dashboardData: any;
  lowStock:any[] = [];

  constructor(private dashboardService: DashboardService ,   private router: Router , private productService: ProductService ,   private cdr: ChangeDetectorRef   // ✅ ADD THIS
) {}

  ngOnInit() {
    this.loadData();
    this.loadLowStock();
  }

  loadData() {
    this.dashboardService.getDashboardData().subscribe((res:any) => {
      this.dashboardData = res;
      console.log(res);
          this.cdr.detectChanges(); // ✅ IMPORTANT

    });
  }

  goToAddPlant() {
  this.router.navigate(['/admin/products']);
}

goToOrders() {
  this.router.navigate(['/admin/orders']);
}

goToUsers() {
  this.router.navigate(['/admin/users']);
}

loadLowStock(){
  this.productService.getLowStock().subscribe((res:any)=>{
    this.lowStock = res;
        this.cdr.detectChanges(); // ✅ IMPORTANT

  });
}
}