import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: ``,
})
export class PerfilComponent {
  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgPrev: any = null;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private fileUploadService: FileUploadService
  ) {
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [this.usuario.nombre, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
    });
  }

  actualizarPerfil() {
    this.usuarioService.actualizarUsuario(this.perfilForm.value).subscribe({
      next: (resp) => {
        const { nombre, email } = this.perfilForm.value;
        this.usuario.nombre = nombre;
        this.usuario.email = email;
        Swal.fire('Usuario actualizado', 'Se guardaron los cambios de forma exitosa', 'success')
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error')
      }
    });
  }

  cambiarImagen(file: File) {
    this.imagenSubir = file;

    if( !file ) {
      this.imgPrev = null;
      return;
    }

    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgPrev = reader.result;
    }
  }

  subirImagen() {
    this.fileUploadService
      .actualizarFoto(this.imagenSubir, 'usuarios', this.usuario.uid || '')
      .then((img) => {
        this.usuario.img = img
        if(img){
        Swal.fire('Avatar actualizado', '', 'success')
        } else {
          Swal.fire('No se pudo actualizar el avatar', 'Verifique el archivo', 'error')
        }
      });
  }
}
