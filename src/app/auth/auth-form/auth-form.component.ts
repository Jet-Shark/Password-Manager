import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent implements OnInit {
  @Input() type: 'login' | 'register' = 'login';
  passwordMinLength = 6;
  form: FormGroup;

  constructor() { }

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
    if (this.form.valid) {
      console.log(this.form.value);
    }
  };
}
