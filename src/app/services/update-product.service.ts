import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpdateProductService {
  public product_img: string;
  public product_name: string;
  public product_size: number;
  public product_price: number;
  public product_description: string;
  public product_id: string;


  constructor() { }
}
