import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart';
import { PlantService } from '../../services/plant';

@Component({
  selector: 'app-plant-details',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './plant-details.html',
  styleUrl: './plant-details.css'
})
export class PlantDetailsComponent {

plant:any;
quantity:number = 1;

selectedImage:any;
plantImages:any[] = [];

relatedPlants:any[] = [];

constructor(
  private route: ActivatedRoute,
  private plantService: PlantService,
  private cartService: CartService
) {}

ngOnInit(){

this.route.params.subscribe(params => {

const id = Number(params['id']);

this.loadPlant(id);

});

}

loadPlant(id:number){

this.plant = this.plantService.getPlantById(id);

this.plantImages = [
this.plant.image
];

this.selectedImage = this.plant.image;

const allPlants = this.plantService.getPlants();

this.relatedPlants = allPlants
.filter(p => p.id !== id)
.slice(0,4);

}

changeImage(img:any){
this.selectedImage = img;
}

increaseQty(){
this.quantity++;
}

decreaseQty(){
if(this.quantity > 1){
this.quantity--;
}
}

addToCart(){

const product = {
...this.plant,
quantity: this.quantity
};

this.cartService.addToCart(product);

alert("Product Added To Cart");

}

}