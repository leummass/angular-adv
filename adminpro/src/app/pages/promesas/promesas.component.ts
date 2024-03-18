import { Component } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrl: './promesas.component.css',
})
export class PromesasComponent {
  ngOnInit(): void {
    this.getUsuarios().then( usuarios => {
      console.log(usuarios);
    });
    // const promesa = new Promise( (resolve, reject) => {
    //   if(false){
    //     resolve('Hola mundo');
    //   } else {
    //     reject('Algo salió mal');
    //   }
    // });
    // promesa.then( () => {
    //   console.log('Promesa terminada');
    // }).catch(error => console.log('Error en promesa: ', error))
    // console.log('fin init');
  }

  getUsuarios() {
    const promesa = new Promise((resolve) => {
      fetch('https://reqres.in/api/users?page=2')
        .then((resp) => resp.json())
        .then((body) => console.log(body.data));
    });
    return promesa;
  }
}
