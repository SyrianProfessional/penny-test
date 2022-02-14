import { IProduct } from './../../../../../api/src/app/product/interfaces/product.interface';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'penny-test-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  products: IProduct[] = [];
  loading = true;
  pageSize = 10;
  page = 1;
  total = 0;
  searchWord = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.loading = true;
    this.productService
      .getAllProducts({
        pageSize: this.pageSize,
        page: this.page,
        searchWord: this.searchWord,
      })
      .subscribe((res) => {
        this.loading = false;
        this.total = res.data.paging.total;

        this.products = res.data.data;
      });
  }

  changePage(page: number) {
    this.page = page;
    this.getAllProducts();
  }
  pageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
    this.page = 1;

    this.getAllProducts();
  }

  search() {
    this.page = 1;

    this.getAllProducts();
  }

  deleteProduct(_id: string) {
    this.productService.deleteProduct(_id).subscribe((data) => {
      this.getAllProducts();
    });
  }
}
