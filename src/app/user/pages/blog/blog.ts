import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
selector: 'app-blog',
standalone: true,
imports: [CommonModule, RouterModule],
templateUrl: './blog.html',
styleUrl: './blog.css'
})
export class BlogComponent {

blogs = [

{
id:1,
title:"Top Indoor Plants For Fresh Air",
image:"assets/images/indoor-plants.png",
description:"Indoor plants are one of the best ways to bring nature inside your home.They improve air quality, create a peaceful environment and make your living space more beautiful..."
},

{
id:2,
title:"How To Care For Flowering Plants",
image:"assets/images/flowering-plants.png",
description:"Flowering plants bring color and freshness to any garden or balcony. Plants like roses, hibiscus and jasmine can make your outdoor space look vibrant and attractive..."
},

{
id:3,
title:"Beginner Guide To Home Gardening",
image:"assets/images/gardening.png",
description:"Starting a home garden is a wonderful way to connect with nature and create a relaxing green space. Even small spaces such as balconies or windows can be turned into... "
}

];

}