import { Component, OnInit } from '@angular/core';
import { EmailFieldComponent } from "../../components/email-field/email-field.component";
import { PasswordFieldComponent } from "../../components/password-field/password-field.component";
import { ConfirmButtonComponent } from "../../components/confirm-button/confirm-button.component";
import { UserInputInterface } from '../../interfaces/input/userInputInterface';
import { UserService } from '../../services/userService/user.service';
import { FormsModule  } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ EmailFieldComponent, PasswordFieldComponent, ConfirmButtonComponent, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  credential: UserInputInterface = {name: "", surname : "", mail : "", password : "", username : ""};

  constructor(private userService : UserService, private authService : AuthService) {}

  /**
   * This method force the connected user to unacces to this page (and return to the home page when is connected).
   */
  ngOnInit() : void {
    setInterval(() => {
      if (this.authService.isLoggedIn()) {
        window.location.href = "/"; //This force to reload all the website. So the user is now connected and the menu is the correct menu.
      }
    }, 500);
  }

  updateMail(email : string | null) {
    if (email == null) return;
    this.credential.mail = email;
  }

  updatePassword(password : string | null) {
    if (password == null) return;
    this.credential.password = password;
  }

  onSubmit() {
    this.userService.login(this.credential);
  }

}
