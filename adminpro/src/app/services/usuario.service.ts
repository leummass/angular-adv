import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';

import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';
import Swal from 'sweetalert2';

const base_url = environment.base_url;

declare const google: any;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  public usuario: Usuario;

  constructor(
    private http: HttpClient,
    private router: Router,
    private ngZone: NgZone
  ) {}

  get token() {
    return localStorage.getItem('token') || '';
  }
  get usuarioUid() {
    return this.usuario.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  logout() {
    const email = localStorage.getItem('email2') || '';
    localStorage.removeItem('token');
    localStorage.removeItem('email2');
    google.accounts.id.revoke(email, () => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      });
    });
    location.reload();
  }
  validarToken() {
    google.accounts.id.initialize({
      client_id:
        '992091660162-4ssu68eang5qt3936kg3rs48dcr1sfiq.apps.googleusercontent.com',
    });
    //Función que llama al backend para verificar que el token es válido
    return this.http
      .get(`${base_url}/login/renew`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((resp: any) => {
          //Se guardan los datos del usuario que acaba de logear
          const { email, google, nombre, role, img, uid } = resp.usuario;
          this.usuario = new Usuario(nombre, email, '', google, img, role, uid);
          localStorage.setItem('token', resp.token);
          return true;
        }),
        catchError((error) => of(false))
      );
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${base_url}/usuarios`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
        localStorage.setItem('email2', resp.usuario.email);
      })
    );
  }

  actualizarUsuario(data: { email: string; nombre: string; role: string }) {
    data = {
      ...data,
      role: this.usuario.role || '',
    };
    return this.http.put(`${base_url}/usuarios/${this.usuarioUid}`, data, {
      headers: {
        'x-token': this.token,
      },
    });
  }

  login(formData: any) {
    const formLogin: LoginForm = formData;
    return this.http.post(`${base_url}/login`, formLogin).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
        localStorage.setItem('email2', formLogin.email);
      })
    );
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((resp: any) => {
        localStorage.setItem('email2', resp.email);
        localStorage.setItem('token', resp.token);
      })
    );
  }

  cargarUsuarios(desde: number = 0) {
    return this.http
      .get(`${base_url}/usuarios?desde=${desde}`, this.headers)
      .pipe(
        map((resp: any) => {
          const usuarios = resp.usuarios.map(
            (user: any) =>
              new Usuario(
                user.nombre,
                user.email,
                '',
                user.google,
                user.img,
                user.role,
                user.uid
              )
          );
          return {
            total: resp.total,
            usuarios,
          };
        })
      );
  }

  eliminarUsuario(usuario: Usuario){
    const url = `${base_url}/usuarios/${usuario.uid}`
    return this.http.delete(url, this.headers);
  }

  guardarUsuario( usuario: Usuario){
    return this.http.put(`${base_url}/usuarios/${usuario.uid}`, usuario, this.headers);
  }
}
