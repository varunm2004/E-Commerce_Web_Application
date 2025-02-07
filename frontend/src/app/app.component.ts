import { Component, OnInit } from '@angular/core';
import { LaptopService } from './services/laptop.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  laptops: any[] = [];
  cart: any[] = [];

  constructor(private laptopService: LaptopService) {}

  ngOnInit() {
    this.laptopService.getLaptops().subscribe(data => {
      this.laptops = data;
    });
  }

  addToCart(laptop: any) {
    laptop.inCart = true;
    this.cart.push(laptop);
    this.laptopService.updateLaptop(laptop._id, laptop).subscribe();
  }

  removeFromCart(laptop: any) {
    laptop.inCart = false;
    this.cart = this.cart.filter(item => item._id !== laptop._id);
    this.laptopService.updateLaptop(laptop._id, laptop).subscribe();
  }
}
