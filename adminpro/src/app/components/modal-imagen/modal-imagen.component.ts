import { Component } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrl: './modal-imagen.component.css'
})
export class ModalImagenComponent {
  public imagenSubir: File;
  public imgPrev: any = null;

  constructor(public modalImagenService: ModalImagenService, public fileUploadService: FileUploadService){}

  cerrarModal() {
    this.imgPrev = null;
    this.modalImagenService.cerrarModal();
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
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileUploadService
      .actualizarFoto(this.imagenSubir, tipo, id)
      .then((img) => {
        if(img){
          Swal.fire('Avatar actualizado', '', 'success')
          this.modalImagenService.nuevaImagen.emit(img);
          this.cerrarModal();
        } else {
          Swal.fire('No se pudo actualizar el avatar', 'Verifique el archivo', 'error')
        }
      });
  }


}
