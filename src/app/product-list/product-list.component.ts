import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  displayedColumns: string[] = ['image', 'name', 'price', 'actions'];

  dataSource = new MatTableDataSource<Product>();

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    const products = this.productService.getProducts();
    this.dataSource = new MatTableDataSource(products);
  }

  onDelete(id: number): void {
    this.productService.deleteProduct(id);
    this.loadProducts();
  }
}
