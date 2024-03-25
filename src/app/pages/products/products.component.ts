import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ProductListService } from 'src/app/shared/product-list.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
    public products: Array<any> = [];
    public category: Array<string> = ['blush', 'lipstick', 'foundation', 'eyeliner', 'bronzer', 'eyeshadow', 'mascara'];
    public filterForm!: UntypedFormGroup;
    public product_basket: Array<any> = [];
    public prod_brand: Array<string>=[
        "nyx", "fenty", "clinique", "dior",  "benefit","smashbox", "covergirl", "anna sui",  "revlon", "physicians formula",
        "l'oreal",  "milani",  "annabelle","cargo cosmetics","mineral fusion","wet n wild","pacifica", "marcelle",
        "sante", "dr. hauschka", "maybelline", "almay", "pure anada", "stila", "zorah",  "suncoat","e.l.f."
    ]


    constructor(
        private Servise: ProductListService,
        private http: HttpClient,
        private fb: UntypedFormBuilder,
    ) {

    }
    ngOnInit(): void {
        this.initCategoryForm();
        let count = this.filterForm.value;
        this.loadProducts(count.min, count.max, count.category, count.brand);
        this.getProducts();
    }

    loadProducts(min: number, max: number, type: string, brand: string): void {
        this.Servise.get(min, max, type, brand).subscribe(data => {
            this.products = data;
        })
    }

    initCategoryForm(): void {
        this.filterForm = this.fb.group({
            category: [this.category[0]],
            brand: [''],
            min: [0],
            max: [9999]
        });
    }

    filter() {
        let count = this.filterForm.value;
        this.loadProducts(count.min, count.max, count.category, count.brand);
    }

    addBasket(products: any ): void {
        this.Servise.addBasket(products);
        this.getProducts();
    }

    getProducts(): void {
        if (localStorage.getItem('MAKEUP')) {
            this.product_basket = JSON.parse(<string>localStorage.getItem('MAKEUP'));
        }
    }

}
