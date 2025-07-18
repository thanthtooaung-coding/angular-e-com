import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { MatTableDataSource } from '@angular/material/table';
import { ProductFormComponent } from '../product-form/product-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  displayedColumns: string[] = ['image', 'name', 'description',  'price', 'actions'];

  dataSource = new MatTableDataSource<Product>();

  constructor(
    private productService: ProductService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(products => {
      this.dataSource.data = products;
    });
  }

  onCreate(): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.createProduct(result).subscribe(() => {
          this.loadProducts();
        })
      }
    })
  }

  onDelete(id: number): void {
    this.productService.deleteProduct(id).subscribe(() => {
      console.log(`Deleted product with id: ${id}`);
      this.loadProducts();
    });
  }

  onEdit(product: Product): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '400px',
      data: { product: product }
    });

    dialogRef.afterClosed().subscribe(result => {      
      if (result && product.id) {
        this.productService.updateProduct(product.id, result).subscribe(() => {
          this.loadProducts();
        });
      }
    });
  }
}
