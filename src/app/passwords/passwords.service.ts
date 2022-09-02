import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Password } from "./password.model";
import { Subject, tap } from "rxjs";

@Injectable({providedIn: 'root'})
export class PasswordsService {
  passwordsChanged = new Subject<Password[]>();
  private passwords: Password[] = [];

  constructor(private http: HttpClient) {}

  fetchPasswords() {
    return this.http.get<Password[]>(
      'https://password-manager-5c89d-default-rtdb.europe-west1.firebasedatabase.app/passwords.json'
    ).pipe(
      tap(passwords => {
        if (!passwords) {
          return
        }
        this.passwords = passwords;
        this.passwordsChanged.next(this.passwords?.slice());
      })
    ).subscribe();
  }

  storePasswords() {
    return this.http.put<Password[]>(
      'https://password-manager-5c89d-default-rtdb.europe-west1.firebasedatabase.app/passwords.json',
      this.passwords.slice()
    ).subscribe();
  }

  addPassword(password: Password) {
    this.passwords.push(password);
    this.storePasswords();
    this.passwordsChanged.next(this.passwords.slice());
  }

  updatePassword(index: number, newPassword: Password) {
    this.passwords[index] = newPassword;
    this.storePasswords();
    this.passwordsChanged.next(this.passwords.slice());
  }

  deletePassword(index: number) {
    this.passwords.splice(index, 1);
    this.storePasswords();
    this.passwordsChanged.next(this.passwords.slice());
  }
}
