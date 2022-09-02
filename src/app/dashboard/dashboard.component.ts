import { Component, OnInit } from '@angular/core';
import { PasswordsService } from "../passwords/passwords.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loaderSub: Subscription;
  loaderVisible = false;

  constructor(private passwordsService: PasswordsService) { }

  ngOnInit(): void {
    this.loaderSub = this.passwordsService.loaderVisible.subscribe(loaderVisible => {
      this.loaderVisible = loaderVisible;
    });
  }

}
