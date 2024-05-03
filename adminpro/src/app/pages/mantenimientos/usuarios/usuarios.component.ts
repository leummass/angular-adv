import { Component } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: ``
})
export class UsuariosComponent {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[];

  constructor( private usuariosService: UsuarioService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.usuariosService.cargarUsuarios(0).subscribe({
      next: ({total, usuarios}:any) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
      }
    })
  }
}
