import { Component, OnDestroy, OnInit } from '@angular/core';
import { Password } from "./password.model";
import { PasswordsService } from "./passwords.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-passwords',
  templateUrl: './passwords.component.html',
  styleUrls: ['./passwords.component.css']
})
export class PasswordsComponent implements OnInit, OnDestroy {
  passwords: Password[] = [];
  passwordsSub: Subscription;

  constructor(private passwordsService: PasswordsService) { }

  ngOnInit(): void {
    this.passwordsService.fetchPasswords();
    this.passwordsSub = this.passwordsService.passwordsChanged.subscribe(passwords => {
      this.passwords = passwords;
    });
  }

  ngOnDestroy() {
    this.passwordsSub.unsubscribe();
  }
}
