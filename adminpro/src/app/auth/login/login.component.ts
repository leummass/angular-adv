import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  NgZone,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('googleBtn') googleBtn: ElementRef;

  public formSubmitted = false;

  public loginForm = this.fb.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email],
    ],
    password: ['', [Validators.required, Validators.minLength(8)]],
    remember: [false],
  });
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit(): void {
    this.googleButton();
  }

  googleButton() {
    //Llama a la API para el login
    google.accounts.id.initialize({
      client_id:
        '992091660162-4ssu68eang5qt3936kg3rs48dcr1sfiq.apps.googleusercontent.com',
      callback: (response: any) => this.handleCredentialResponse(response),
    });

    //renderiza el botón, lo muestra
    google.accounts.id.renderButton(
      //document.getElementById('buttonDiv'),
      this.googleBtn.nativeElement,
      { theme: 'outline', size: 'large' } // customization attributes
    );
  }

  handleCredentialResponse(response: any) {
    //console.log('Encoded JWT ID token: ' + response.credential);
    this.usuarioService.loginGoogle(response.credential).subscribe({
      next: (resp) => {
        //console.log(resp);
        this.ngZone.run(() => {
          this.router.navigateByUrl('/dashboard');
        });
      },
      error: (err) => {},
    });
  }

  login() {
    this.usuarioService.login(this.loginForm.value).subscribe({
      next: (resp) => {
        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem(
            'email',
            this.loginForm.get('email')?.value || ''
          );
        } else {
          localStorage.removeItem('email');
        }
        this.router.navigateByUrl('/dashboard');
      },
      error: (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      },
    });

    //this.router.navigateByUrl('/dashboard');
  }
}
