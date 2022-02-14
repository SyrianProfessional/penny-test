import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AntService } from '../../services/ant.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'penny-test-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  form!: FormGroup;
  loading = false;

  id = this.route.snapshot.params['id'];

  constructor(
    private productService: ProductService,
    private antService: AntService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', []),
    });

    if (this.id) {
      this.productService.getProductDetails(this.id).subscribe((data) => {
        this.form.patchValue(data.data.data);
      });
    }
  }

  validForm(controlName: string, errorName: string) {
    return (
      this.form.get(controlName)?.hasError(errorName) &&
      (this.form.get(controlName)?.dirty || this.form.get(controlName)?.touched)
    );
  }

  login() {
    this.loading = true;
    (!this.id
      ? this.productService.addProduct(this.form.value)
      : this.productService.editProduct(this.id, this.form.value)
    ).subscribe(
      (data) => {
        this.antService.showMessage(data?.message, 'success');
        this.router.navigateByUrl('/products/products-list');
      },
      (e) => {},
      () => {
        this.loading = false;
      }
    );
  }
}
