import { Component } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';
import { BusquedasService } from '../../../services/busquedas.service';
import Swal from 'sweetalert2';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { Subscription, delay } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: ``
})
export class UsuariosComponent {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[];
  public usuariosTemp: Usuario[];
  public desde: number = 0;
  public imgSubs: Subscription;
  public cargando: boolean = true;
  public emailUsuario: string = this.usuariosService.usuario.email;

  constructor( private usuariosService: UsuarioService, private busquedasService: BusquedasService, private modalImagenService: ModalImagenService){}

  ngOnInit(): void {

    this.cargarUsuarios();

    this.imgSubs = this.modalImagenService.nuevaImagen.pipe(
      delay(100)
    ).subscribe( img => this.cargarUsuarios() );
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.imgSubs.unsubscribe();
  }

  cargarUsuarios(){
    this.cargando = true;
    this.usuariosService.cargarUsuarios(this.desde).subscribe({
      next: ({total, usuarios}:any) => {
        this.totalUsuarios = total;
        this.usuarios = usuarios;
        this.usuariosTemp = usuarios;
        this.cargando = false;
      }
    })
  }

  cambiarPagina(valor: number){
    this.desde +=valor;

    if(this.desde < 0){
      this.desde = 0;
    } else if (this.desde > this.totalUsuarios) {
      this.desde -= valor;
    }
    this.cargarUsuarios();
  }

  buscar( termino:string){
    if( termino.length === 0 ){
      this.usuarios = this.usuariosTemp;
    }

    this.busquedasService.buscar('usuarios', termino).subscribe({
      next: (resp:any) => {
        this.usuarios = resp;
      }
    })
  }

  eliminarUsuario(usuario: Usuario){
    Swal.fire({
      title: "¿Estás seguro de borrar este usuario?",
      text: `Será eliminado permanentemente el usuario ${usuario.nombre}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí"
    }).then((result) => {
      if (result.value) {
        this.usuariosService.eliminarUsuario(usuario).subscribe({
          next: (resp:any)=> {
            Swal.fire(
              'Usuario borrado',
              `${usuario.nombre} ha sido eliminado correctamente`,
              "success"
            )
            this.cargarUsuarios();
          }
        });
      }
    });
  }

  cambiarRol(usuario: Usuario){
    this.usuariosService.guardarUsuario(usuario).subscribe({
      next: (resp:any) => {
        console.log(resp);
      }
    })
  }

  abrirModal(usuario: Usuario){
    this.modalImagenService.abrirModal('usuarios',usuario.uid || '',usuario.img);
  }
}
