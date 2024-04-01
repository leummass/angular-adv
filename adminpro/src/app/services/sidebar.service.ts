import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor() { }

  menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Main', url:'/dashboard/'},
        { titulo: 'ProgressBar', url:'/dashboard/progress'},
        { titulo: 'Gráficas', url:'/dashboard/grafica1'},
        { titulo: 'Promesas', url:'promesas'},
        { titulo: 'RxJS', url:'rxjs'},
        { titulo: 'Perfil', url:'perfil'}
      ]
    }
  ]
}
