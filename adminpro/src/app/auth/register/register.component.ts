import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  public formSubmitted = false;

  public registerForm = this.fb.group(
    {
      nombre: ['Samuel', [Validators.required, Validators.minLength(3)]],
      email: ['tester123@gmail.com', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password2: ['', Validators.required],
      terminos: [false, Validators.required],
    },
    {
      validators: this.passwordIguales,
    }
  );

  constructor(private fb: FormBuilder) {}

  crearUsuario() {
    this.formSubmitted = true;
    console.log(this.registerForm.value);

    if (this.registerForm.valid) {
      console.log('Posteando formulario');
    } else {
      console.log('Formulario no es correcto');
    }
  }

  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  aceptaTerminos() {
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }

  contrasenasNoValidas() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;
    if (pass1 !== pass2 && this.formSubmitted) {
      return false;
    } else {
      return true;
    }
  }
  passwordIguales(formGroup: FormGroup) {
    const password1 = formGroup.get('password')?.value;
    const password2 = formGroup.get('password2')?.value;

    return password1 === password2 ? null : { noCoinciden: true };
  }
}
