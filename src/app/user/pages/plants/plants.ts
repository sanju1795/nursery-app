import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PlantService } from '../../services/plant';

@Component({
  selector: 'app-plants',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './plants.html',
  styleUrl: './plants.css'
})
export class PlantsComponent {

plants: any[] = [];
searchText: string = '';

selectedCategory:string='All';

categories=[
  'All',
  'Indoor',
  'Outdoor',
  'Flowering',
  'Medicinal'
];

constructor(
  private plantService:PlantService,
  private route: ActivatedRoute
){}

ngOnInit(){

  this.plants = this.plantService.getPlants();

  this.route.queryParams.subscribe(params => {

    const category = params['category'];
    const search = params['search'];

    if(category){
      this.selectedCategory = category;
    }

      if(search){
    this.searchText = search;    }


  });

}

get filteredPlants(){

  let filtered = this.plants;

  // category filter
  if(this.selectedCategory !== 'All'){
    filtered = filtered.filter(
      plant => plant.category === this.selectedCategory
    );
  }

  // search filter
  if(this.searchText){
    filtered = filtered.filter(
      plant => plant.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  return filtered;

}


}