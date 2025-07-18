import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [
    { id: 1, name: 'Gaming Mouse', price: 45, imageUrl: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTCVBsqQFTcYsUY4D8_n0SZioudqJXbGsA0hbBjs3YgsK6mBVxML6xkMt-yvwS3oku3yAqUgNaMuQc4iC6DtkCTiDYm4upW4r4GHXiVrGhQSeOgnpbeUw_oo-g', description: 'A high-precision gaming mouse.' },
    { id: 2, name: 'Mechanical Keyboard', price: 120, imageUrl: 'https://img.kwcdn.com/product/fancy/887a0524-0ddf-49fd-8f2c-3620fc36c506.jpg?imageView2/2/w/800/q/70/format/webp', description: 'A clicky and responsive keyboard.' },
    { id: 3, name: '4K Monitor', price: 350, imageUrl: 'https://www.2beshop.com/images/products/DELL%20Monitor%20P2425H.jpg', description: 'A crisp and clear 27-inch 4K monitor.' }
  ];
  private nextId = 4;
  constructor() { }

  getProducts(): Product[] {
    return this.products;
  }

  addProduct(product: Omit<Product, 'id'>): void {
    const newProduct: Product = { id: this.nextId++, ...product };
    this.products.push(newProduct);
  }

  updateProduct(updatedProduct: Product): void {
    const index = this.products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
    }
  }

  deleteProduct(id: number): void {
    this.products = this.products.filter(p => p.id !== id);
  }
}
