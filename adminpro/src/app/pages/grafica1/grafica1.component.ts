import { Component } from '@angular/core';



@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: ``
})
export class Grafica1Component {

  labelss: string[] = [
    'fff',
    'In-StoreSales',
    'Mail-OrderSales',
  ]
  datos: number[] = [
    50,55,300
  ]

}
