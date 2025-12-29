import { Component } from '@angular/core';
import { EmailFieldComponent } from "../../components/email-field/email-field.component";
import { PasswordFieldComponent } from "../../components/password-field/password-field.component";
import { ConfirmButtonComponent } from "../../components/confirm-button/confirm-button.component";
import { UserInputInterface } from '../../interfaces/input/userInputInterface';
import { UserService } from '../../services/userService/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ EmailFieldComponent, PasswordFieldComponent, ConfirmButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credential: UserInputInterface = {name: "", surname : "", mail : "", password : "", username : ""};

  constructor(private userService : UserService) {}

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
