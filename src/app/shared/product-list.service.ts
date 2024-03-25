import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProductListService {
    public stream$ = new Subject<number>();
    private resourceUrl = environment.PRODUCTS_URL;
    private api = {
        products: `${this.resourceUrl}`
    }

    constructor(
        private http: HttpClient
    ) { }

    get(min: number, max: number, type: string, brand: string): Observable<any> {
        return this.http.get<any>(this.api.products + `?product_type=${type}&price_greater_than=${min}&price_less_than=${max}&brand=${brand}`);
    }

    addBasket(product: any): void {

        let basket: Array<any> = [];
        if (localStorage.getItem('MAKEUP')) {
            basket = JSON.parse(<string>localStorage.getItem('MAKEUP'));
            if (basket.some(prod => prod.id === product.id)) {
                const index = basket.findIndex(prod => prod.id === product.id);
                basket[index].count += product.count;
            } else {
                product.count = 1;
                basket.push(product);
            }
        } else {
            product.count = 1;
            basket.push(product);
        }
        localStorage.setItem('MAKEUP', JSON.stringify(basket));

    }


}
