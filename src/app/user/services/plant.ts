import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  plants = [
    { id:1, name:'Snake Plant', category:'Indoor', price:299, image:'assets/images/snake plant.jpg' },
    { id:2, name:'Aloe Vera', category:'Medicinal', price:199, image:'assets/images/alovera.jpg' },
    { id:3, name:'Peace Lily', category:'Flowering', price:349, image:'assets/images/peace lilly.jpg' },
    { id:4, name:'Rose Plant', category:'Flowering', price:249, image:'assets/images/rose.png' },
    { id:5, name:'Money Plant', category:'Indoor', price:199, image:'assets/images/money-plant.png' }
  ];

  getPlants(){
    return this.plants;
  }

  getPlantById(id:number){
    return this.plants.find(p => p.id === id);
  }

}