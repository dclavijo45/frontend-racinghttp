import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-ver-lista-tus-productos',
  templateUrl: './ver-lista-tus-productos.component.html',
  styleUrls: ['./ver-lista-tus-productos.component.css']
})
export class VerListaTusProductosComponent implements OnInit {
  public status: boolean;
  private token: string = localStorage.getItem('token')
  private server: string = 'http://localhost:5000';
  public listProductSelected: any[] = [];
  public showSpinner: boolean = true;
  public inputSearch: string = "";
  public filterSearch: any[] = []
  public notResultSearch: boolean = false;
  public listP: any[] = []
  public infoProduct: any;

  constructor(private client: ClienteService) { }

  ngOnInit(): void {
    this.client.postRequest(`${this.server}/api/v01/manage/myproducts`, {}, this.token).subscribe((res:any)=> {
      this.listP = res;
      try {
      this.infoProduct=  {
        id: this.listP[0].id,
        img_product: this.listP[0].img_product,
        price_product: this.listP[0].price_product,
        name_product: this.listP[0].name_product,
        description_product: this.listP[0].description_product
      }
      this.showSpinner = false;
      } catch (error) {
        this.infoProduct = {
          id: 0,
          img_product: "",
          price_product: 0,
          name_product: "",
          description_product: ""
        }
        this.showSpinner = false;
      }
    })


  }

  delFromListP (item) {
    this.listProductSelected = this.listProductSelected.filter( e => e !== item );
  }

  clickp(idProduct){
    if (!this.listProductSelected.includes(idProduct)) {
      this.listProductSelected.push(idProduct);
      console.log(this.listProductSelected);
    }else{
      this.delFromListP(idProduct);
      console.log(this.listProductSelected);
    }
  }


  delProduct(){
    if (this.listProductSelected.length == 0) return false;

  }

  editProduct(){
    if (this.listProductSelected.length > 1) return false;

  }

  searchProduct(dataFilter) {
    this.filterSearch = []
    this.listP.forEach(data =>{
      if (data.name_product.includes(dataFilter) || data.price_product.toString().includes(dataFilter) || data.vol_product.toString().includes(dataFilter)) {
        this.filterSearch.push(data)
      }
    })
    this.filterSearch.length == 0 ?
    this.notResultSearch = true :
    this.notResultSearch = false

  }

  clickToP(id){
    this.listP.forEach(data =>{
      if (data.id.toString().includes(id)) {
        this.infoProduct.img_product = data.img_product;
        this.infoProduct.price_product = data.price_product;
        this.infoProduct.name_product = data.name_product;
        this.infoProduct.description_product = data.description_product;
      }
    })
  }
}
