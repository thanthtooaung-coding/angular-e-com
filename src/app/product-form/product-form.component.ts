import { Component, Inject, OnInit } from '@angular/core';
import { Product } from '../product';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productData: Partial<Product> = {};
  isEditMode = false;

  constructor(
    private dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: Product }
  ) {}

  ngOnInit(): void {
    if (this.data && this.data.product) {
      this.isEditMode = true;
      this.productData = { ...this.data.product };
    }
  }

  onSave(): void {
    this.dialogRef.close(this.productData);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
