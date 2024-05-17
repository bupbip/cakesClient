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
      router.navigate(['profile']);
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
      email: ['', Validators.compose([Validators.required])],  // обязательное поле
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
          this.tokenStorage.saveUser(data.user);

          console.log(data);
          console.log(this.tokenStorage.getToken());
          console.log(data.user.username)
          console.log(this.tokenStorage.getUser().username);

          this.notificationService.showSnackBar('Успешный вход!');
          const username = this.tokenStorage.getUser().username;
          this.router.navigate(['/profile', username]);
          // window.location.reload();
        }
      }, error => {
        console.log(error);
        this.notificationService.showSnackBar(error);
      }
    );
  }
}
