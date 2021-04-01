import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ClienteService } from '../services/cliente.service';


@Injectable({
  providedIn: 'root'
})
export class ObservableCreateChartService {
  private server: string = this.client._server;
  public daysChartData: any = {
    "monday": [],
    "tuesday": [],
    "wednesday": [],
    "thursday": [],
    "friday": [],
    "saturday": [],
    "sunday": []
  }
  public myProductsPurchased: any[] = []
  public listCustomer: any[] = [];
  public totalMoney: any[] = []
  public myProducts: any[] = []
  public dataChart1: any[] = []
  public dataChart2: any[] = []
  public sendData (){
    return  {
      totalMoney: this.totalMoney,
      myProducts: this.myProducts,
      myProductsPurchased: this.myProductsPurchased
    }
  }

  sendInfo = new BehaviorSubject<any>(this.sendData());

  changeData() : Observable<boolean> {
    return this.sendInfo.asObservable();
   }

  constructor(private client: ClienteService) { }

  public async getData(token: string){
    this.daysChartData = {
          "monday": [],
          "tuesday": [],
          "wednesday": [],
          "thursday": [],
          "friday": [],
          "saturday": [],
          "sunday": []
        }
        //
        this.myProductsPurchased = []
        this.listCustomer = [];
        this.totalMoney = []
        this.myProducts = []
        this.dataChart1 = []
        this.dataChart2 = []
    let promise = new Promise((resolve, reject) => {
       this.client.postRequest(`${this.server}/api/v01/manage/products`, {}, token).subscribe(
      ((response:any) =>{

        this.myProducts.push(response.my_products);
        this.myProductsPurchased.push(response.my_purchased_products);

        if (response.my_register_products.length >= 1) {
          let moneyx = 0;
          for (let i = 0; i < response.my_register_products.length; i++) {
            moneyx += response.my_register_products[i].units_purchased * response.my_register_products[i].price_product;
          }
          this.totalMoney.push(moneyx)

          for (let i = 0; i < response.my_register_products.length; i++) {
            this.listCustomer.push({
              "date": response.my_register_products[i].date,
              "id_buyer": response.my_register_products[i].id_buyer,
              "lastname_buyer": response.my_register_products[i].lastname_buyer,
              "name_buyer": response.my_register_products[i].name_buyer,
              "price_product": response.my_register_products[i].price_product,
              "profile_image_buyer": response.my_register_products[i].profile_image_buyer,
              "units_purchased": response.my_register_products[i].units_purchased
            })
          }

          for (let i = 0; i < this.listCustomer.length; i++) {
            switch (this.listCustomer[i].date.slice(0,3)) {
              case 'Mon':
                this.daysChartData.monday.push(i)
                break;
              case 'Tue':
                this.daysChartData.tuesday.push(i)
                break;
              case 'Wed':
                this.daysChartData.wednesday.push(i)
                break;
              case 'Thu':
                this.daysChartData.thursday.push(i)
                break;
              case 'Fri':
                this.daysChartData.friday.push(i)
                break;
              case 'Sat':
                this.daysChartData.saturday.push(i)
                break
              case 'Sun':
                this.daysChartData.sunday.push(i)
                break;

              default:
                break;
            }

          }

          if (this.listCustomer.length !=0) {
            let monday = 0;
            let money = 0;
            for (let i = 0; i < this.daysChartData.monday.length; i++) {
              monday += response.my_register_products[this.daysChartData.monday[i]].units_purchased;
              money += response.my_register_products[this.daysChartData.monday[i]].units_purchased * response.my_register_products[this.daysChartData.monday[i]].price_product
            }
            this.dataChart1.push(monday);
            this.dataChart2.push(money);

          }

          if (this.listCustomer.length !=0) {
            let tuesday = 0;
            let money = 0;
            for (let i = 0; i < this.daysChartData.tuesday.length; i++) {
              tuesday += response.my_register_products[this.daysChartData.tuesday[i]].units_purchased
              money += response.my_register_products[this.daysChartData.tuesday[i]].units_purchased * response.my_register_products[this.daysChartData.tuesday[i]].price_product
            }
            this.dataChart1.push(tuesday);
            this.dataChart2.push(money);
          }

          if (this.listCustomer.length !=0) {
            let wednesday = 0;
            let money = 0;
            for (let i = 0; i < this.daysChartData.wednesday.length; i++) {
              wednesday += response.my_register_products[this.daysChartData.wednesday[i]].units_purchased
              money += response.my_register_products[this.daysChartData.wednesday[i]].units_purchased * response.my_register_products[this.daysChartData.wednesday[i]].price_product
            }
            this.dataChart1.push(wednesday);
            this.dataChart2.push(money);
          }

          if (this.listCustomer.length !=0) {
            let thursday = 0;
            let money = 0;
            for (let i = 0; i < this.daysChartData.thursday.length; i++) {
              thursday += response.my_register_products[this.daysChartData.thursday[i]].units_purchased
              money += response.my_register_products[this.daysChartData.thursday[i]].units_purchased * response.my_register_products[this.daysChartData.thursday[i]].price_product
            }
            this.dataChart1.push(thursday);
            this.dataChart2.push(money);
          }

          if (this.listCustomer.length !=0) {
            let friday = 0;
            let money = 0;
            for (let i = 0; i < this.daysChartData.friday.length; i++) {
              friday += response.my_register_products[this.daysChartData.friday[i]].units_purchased
              money += response.my_register_products[this.daysChartData.friday[i]].units_purchased * response.my_register_products[this.daysChartData.friday[i]].price_product
            }
            this.dataChart1.push(friday);
            this.dataChart2.push(money);
          }

          if (this.listCustomer.length !=0) {
            let saturday = 0;
            let money = 0;
            for (let i = 0; i < this.daysChartData.saturday.length; i++) {
              saturday += response.my_register_products[this.daysChartData.saturday[i]].units_purchased
              money += response.my_register_products[this.daysChartData.saturday[i]].units_purchased * response.my_register_products[this.daysChartData.saturday[i]].price_product
            }
            this.dataChart1.push(saturday);
            this.dataChart2.push(money);
          }

          if (this.listCustomer.length !=0) {
            let sunday = 0;
            let money = 0;
            for (let i = 0; i < this.daysChartData.sunday.length; i++) {
              sunday += response.my_register_products[this.daysChartData.sunday[i]].units_purchased
              money += response.my_register_products[this.daysChartData.sunday[i]].units_purchased * response.my_register_products[this.daysChartData.sunday[i]].price_product
            }
            this.dataChart1.push(sunday);
            this.dataChart2.push(money);
          }

        }

        this.sendInfo.next({
          error: false,
          totalMoney: this.totalMoney,
          myProducts: this.myProducts,
          myProductsPurchased: this.myProductsPurchased
        })

      }),
      (error =>{
        this.sendInfo.next({
          error: true,
          totalMoney: this.totalMoney,
          myProducts: this.myProducts,
          myProductsPurchased: this.myProductsPurchased
        })
        console.error("HAS OCURRED ERROR");
        console.log(error);

      })
    )

     resolve({
        "my_products": this.myProducts,
        "my_products_purchased": this.myProductsPurchased,
        "chart_1": this.dataChart1,
        "chart_2": this.dataChart2,
        "total_money": this.totalMoney
      })
    });

    let result = await promise;
    return result;
  }

}
