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
        { titulo: 'Main', url:''},
        { titulo: 'ProgressBar', url:'progress'},
        { titulo: 'Gráficas', url:'grafica1'},
        { titulo: 'Promesas', url:'promesas'},
        { titulo: 'RxJS', url:'rxjs'},
        { titulo: 'Perfil', url:'perfil'}
      ]
    },
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        { titulo: 'Usuarios', url:'usuarios'},
        { titulo: 'Hospitales', url:'hospitales'},
        { titulo: 'Médicos', url:'medicos'},
      ]
    }
  ]
}
