import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {NotificationService} from "../../services/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private notificationService: NotificationService,
    private router: Router,
    private fb: FormBuilder
  ) {
    if (this.tokenStorage.getUser()) {
      router.navigate(['main']);
    }
  }

  /**
   * Вызывается при появлении компонента в браузере
   */

  ngOnInit(): void {
    this.loginForm = this.createLoginForm();
  }

  createLoginForm(): FormGroup {
    return this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],  // обязательное поле
      password: ['', Validators.compose([Validators.required])]
    });
  }

  submit(): void {
    const loginData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.authService.login(loginData).subscribe(data => {
        if (data.token == null) {
          console.log(data);
          this.notificationService.showSnackBar(data.error);
        } else {

          this.tokenStorage.saveToken(data.token);
          this.tokenStorage.saveUser(data);

          console.log(this.tokenStorage.getToken());

          this.notificationService.showSnackBar('Successfully logged in');
          this.router.navigate(['/']);
          window.location.reload();
        }
      } , error => {
      console.log(error);
      this.notificationService.showSnackBar(error.message);
    }
    );
  }
}
