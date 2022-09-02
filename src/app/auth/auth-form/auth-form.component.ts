import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent implements OnInit {
  @Input() type: 'signIn' | 'signUp' = 'signIn';
  passwordMinLength = 6;
  form: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(this.passwordMinLength)
      ])
    });
  }

  get email() {
    return this.form.get('email');
  };

  get password() {
    return this.form.get('password');
  }

  onSubmit(){
    if (this.form.invalid) {
      return;
    }
    const email = this.form.value.email;
    const password = this.form.value.password;

    switch (this.type) {
      case "signIn":
        this.authService.signIn(email, password).subscribe();
        break
      case "signUp":
        this.authService.signUp(email, password).subscribe();
        break
    }

    this.form.reset();
  };
}
