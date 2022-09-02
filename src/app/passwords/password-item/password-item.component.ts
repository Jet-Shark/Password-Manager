import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Password } from "../password.model";
import { PasswordsService } from "../passwords.service";

@Component({
  selector: 'app-password-item',
  templateUrl: './password-item.component.html',
  styleUrls: ['./password-item.component.css']
})
export class PasswordItemComponent implements OnInit {
  @Input() password: Password;
  @Input() index: number;
  form: FormGroup;
  passwordVisible = false;

  constructor(private passwordsService: PasswordsService) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.form = new FormGroup({
      name: new FormControl(this.password?.name, Validators.required),
      password: new FormControl(this.password?.password, Validators.required)
    });
  }

  get nameCtrl() {
    return this.form.get('name');
  }

  get passwordCtrl() {
    return this.form.get('password');
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const password = new Password(this.form.value.name, this.form.value.password);
    if (this.password) {
      this.passwordsService.updatePassword(this.index, password);
      return;
    }
    this.passwordsService.addPassword(password);
    this.form.reset();
  }

  onDelete() {
    this.passwordsService.deletePassword(this.index);
  }
}
