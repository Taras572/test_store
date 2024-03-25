import { Component } from '@angular/core';
import { ProductListService } from 'src/app/shared/product-list.service';

@Component({
    selector: 'app-basket',
    templateUrl: './basket.component.html',
    styleUrls: ['./basket.component.scss']
})
export class BasketComponent {
    public products: Array<any> = [];
    public price = 0;

    constructor(
        private Servise: ProductListService
    ) { }

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.getProducts();
    }

    getProducts(): void {
        if (localStorage.getItem('MAKEUP')) {
            this.products = JSON.parse(<string>localStorage.getItem('MAKEUP'));
            this.price = this.getTotal(this.products);
        }
    }

    removeProduct(product: any): void {
        const index = this.products.findIndex(prod => prod.id === product.id);
        this.products.splice(index, 1);
        this.price = this.getTotal(this.products);
        localStorage.setItem('MAKEUP', JSON.stringify(this.products));
        this.Servise.stream$.next(this.getCount(this.products));
    }

    cliker(prod: any, count: boolean): void {
        if (count) {
            prod.count++;
        }
        else if (count == false && prod.count > 1) {
            prod.count--;
        }

        this.price = this.getTotal(this.products);
        localStorage.setItem('MAKEUP', JSON.stringify(this.products));
        this.Servise.stream$.next(this.getCount(this.products));
    }

    getCount(product: Array<any>): number {
        return product.reduce((total, prod) => total + prod.count, 0);
    }

    getTotal(products: Array<any>): number {
        return products.reduce((total, prod) => total + (prod.price * prod.count), 0);
    }


}
