import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
selector: 'app-blog-details',
standalone: true,
imports: [CommonModule],
templateUrl: './blog-details.html',
styleUrl: './blog-details.css'
})
export class BlogDetailsComponent {

blog:any;

blogs = [

{
id:1,
title:"Top Indoor Plants For Fresh Air",
image:"assets/images/indoor-plants.png",
content:"Indoor plants are one of the best ways to bring nature inside your home.They improve air quality, create a peaceful environment and make your living space more beautiful. Plants such as snake plant, peace lilyand areca palm are known for their ability to remove toxins from the air and increase oxygen levels. These plants require very little maintenance and can grow easily even in low light conditions. If you are starting your gardening journey, indoor plants are a perfect choice. Indoor plants are a simple and effective way to bring nature inside your home. They not only improve the beauty of your living space but also help create a healthier environment. Many indoor plants have natural air-purifying qualities that remove harmful toxins from the air and provide fresh oxygen. Popular indoor plants such as snake plant, peace lily, aloe vera and areca palm are known for their ability to improve air quality. These plants are easy to maintain and grow well in indoor conditions with moderate sunlight and regular watering. In addition to improving air quality, indoor plants also create a peaceful and relaxing atmosphere. Studies show that spending time around plants can reduce stress and improve mood. Adding a few green plants to your home can make your space feel more fresh, calm and connected to nature."
},

{
id:2,
title:"How To Care For Flowering Plants",
image:"assets/images/flowering-plants.png",
content:"Flowering plants bring color and freshness to any garden or balcony. Plants like roses, hibiscus and jasmine can make your outdoor space look vibrant and attractive... To keep flowering plants healthy, it is important to provide proper sunlight, regular watering and good quality soil. With the right care and nutrients, flowering plants bloom beautifully and create a pleasant environment around your home.Flowering plants add color, fragrance and beauty to any garden or balcony. Plants like roses, hibiscus, marigold and jasmine are commonly grown in home gardens because of their bright flowers and pleasant appearance. To keep flowering plants healthy, they need proper sunlight, regular watering and nutrient-rich soil. Most flowering plants grow best when they receive at least five to six hours of sunlight each day. Using organic compost or plant fertilizers can also help plants grow stronger and produce more flowers. Pruning old branches and removing dried flowers encourages new growth and keeps the plant healthy. With proper care and attention, flowering plants can bloom beautifully and make your garden look vibrant and attractive."
},

{
id:3,
title:"Beginner Guide To Home Gardening",
image:"assets/images/gardening.png",
content:"Starting a home garden is a wonderful way to connect with nature and create a relaxing green space. Even small spaces such as balconies or windows can be turned into beautiful mini gardens. Beginner gardeners can start with easy plants like aloe vera, money plant or tulsi. With proper watering, sunlight and a little care, these plants grow quickly and help create a fresh and healthy environment at home.Home gardening is a relaxing and rewarding activity that allows people to grow plants and create a green environment at home. Even small spaces like balconies, terraces or windows can be used to grow plants and start a small garden. Beginners should start with easy and low-maintenance plants such as aloe vera, money plant, tulsi or snake plant. These plants grow easily and require very little care, making them perfect for people who are new to gardening. Good soil, proper watering and enough sunlight are important for healthy plant growth. Gardening not only improves the beauty of your home but also helps reduce stress and creates a peaceful environment. With a little patience and care, anyone can enjoy the benefits of home gardening."
}

];

constructor(private route: ActivatedRoute){}

ngOnInit(){

const id = Number(this.route.snapshot.paramMap.get('id'));

this.blog = this.blogs.find(b => b.id === id);

}

}