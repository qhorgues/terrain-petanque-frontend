import { Component, OnInit } from '@angular/core';
import { EmailFieldComponent } from "../../components/email-field/email-field.component";
import { EmailFieldCheckerComponent  } from '../../components/email-field-checker/email-field-checker.component';
import { PasswordFieldComponent } from "../../components/password-field/password-field.component";
import { PasswordFieldCheckerComponent  } from '../../components/password-field-checker/password-field-checker.component';
import { ConfirmButtonComponent } from "../../components/confirm-button/confirm-button.component";
import { TextFieldComponent } from '../../components/text-field/text-field.component';
import { UserInputInterface } from '../../interfaces/input/userInputInterface';
import { UserService } from '../../services/userService/user.service';
import { FormsModule  } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { RouterLink } from '@angular/router';
import { MatAnchor } from "@angular/material/button";

/**
 * This class represent the login page.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [EmailFieldComponent, PasswordFieldComponent, ConfirmButtonComponent, TextFieldComponent, FormsModule, EmailFieldCheckerComponent, PasswordFieldCheckerComponent, RouterLink, MatAnchor],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit {
  /**
   * This attribute represents the credential.
   */
  credential: UserInputInterface = {name: "", surname : "", mail : "", password : "", username : ""};



  /**
   * This attribute represents when the credential are wrong.
   */
  isValid: boolean = true



  /**
   * The constructor.
   *
   * @param userService The user's service.
   * @param authService The authentification service.
   */
  constructor(private userService : UserService, private authService : AuthService) {}



  /**
   * This method force the connected user to unacces to this page (and return to the home page when is connected).
   */
  ngOnInit() : void {
    setInterval(() => {
      if (this.authService.isLoggedIn()) {
        window.location.href = "/"; //This force to reload all the website. So the user is now connected and the menu is the correct menu.
      }
    }, 100);
  }



  /**
   * This method update the mail field.
   *
   * @param email The new mail.=
   */
  updateMail(email : string | null) : void {
    if (email == null) return;
    this.credential.mail = email;
  }



  /**
   * This method updates the password field.
   *
   * @param password The new password
   */
  updatePassword(password : string | null) : void {
    if (password == null) return;
    this.credential.password = password;
  }



  /**
   * This method send the credential.
   */
  onSubmit() :void {
    this.userService.createUser(this.credential).subscribe({
      next: (response) => this.userService.login(this.credential, result => this.isValid = result),
      error: (error) => this.isValid = false
    });
  }

}
