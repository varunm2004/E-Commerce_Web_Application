export class Laptop {
    constructor(
      public _id: string,
      public name: string,
      public brand: string,
      public price: number,
      public description: string,
      public imageUrl: string,
      public stock: number
    ) {}
  
    // Example method (optional)
    isAvailable(): boolean {
      return this.stock > 0;
    }
  }
  