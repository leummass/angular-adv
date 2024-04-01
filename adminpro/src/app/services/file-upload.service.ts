import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }


  async actualizarFoto( archivo: File, tipo: 'usuarios' | 'medicos' | 'hospitales', id: string) {
    try {
      const url = `${base_url}/upload/${tipo}/${id}`;
      //Agrega la información al body como en postman, la key es imagen y en el backend se recibe como req.files.imagen
      const formData = new FormData();
      formData.append('imagen', archivo);
    
      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || '',
        },
        body: formData
      })
      
      const data = await resp.json();
      console.log(data);
      return 'nombre de la imagen';
    }catch(error) {
      console.log(error)
      return false;
    }
  }
}
