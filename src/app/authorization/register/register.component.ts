import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { IUserRegister } from 'src/app/shared/model/IUserRegister';
import { AuthorizationService } from 'src/app/shared/services/authorization/authorization.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    name: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    age: ['', [Validators.max(100), Validators.min(1)]],
    email: ['', [Validators.required, Validators.email]],
    role: ['', Validators.required]
  });

  constructor(private fb: FormBuilder,
    private authorizationService: AuthorizationService,
    private router: Router) { }

  onSubmit() {
    const user = this.extractUserFromForm();
    this.authorizationService.register(user).pipe(take(1)).subscribe(
      data => this.successfullyRegister(data),
      error => this.handleError(error));
  }

  private extractUserFromForm(): IUserRegister {
    return {
      username: this.registerForm.get("username").value,
      password: this.registerForm.get("password").value,
      email: this.registerForm.get("email").value,
      name: this.registerForm.get("name").value,
      age: this.registerForm.get("age").value,
      phoneNumber: this.registerForm.get("phoneNumber").value,
      role: this.registerForm.get("role").value
    }
  }

  private successfullyRegister(response) {
    this.registerForm.reset();
    this.router.navigate(['login'])
  }

  private handleError(err) {
    if (err.status == 409) {
      alert(err.error.error);
    }
  }
}
