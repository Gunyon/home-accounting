import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';

import { UsersService } from '../../common/services/users.service';
import { User } from '../../common/models/user.model';
import { Message } from '../../common/models/message.model';
import { AuthService } from '../../common/services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { fadeStateTrigger } from '../../common/animations/fade.animation';

@Component({
  selector: 'ha-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeStateTrigger]
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  message: Message;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    private meta: Meta
  ) {
    title.setTitle('Login page');
    meta.addTags([
      { name: 'keywords', content: 'login, access' },
      { name: 'description', content: 'Login page' }
    ]);
  }

  ngOnInit() {
    this.message = new Message('', '');

    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });

    this.route.queryParams.subscribe((params: Params) => {
      if (params['nowCanLogin']) {
        this.showMessage('Now you can login', 'success');
      }
      if (params['email']) {
        this.form.controls.email.setValue(params['email']);
      }
      if (params['accessDenied']) {
        this.showMessage('You should be logged in first', 'warning');
      }
    });
  }

  private showMessage(text: string, type: string = 'danger') {
    this.message = new Message(type, text);
    window.setTimeout(() => {
      this.message = new Message('', '');
    }, 4000);
  }

  onSubmit() {
    const formData = this.form.value;
    this.usersService.getUserByEmail(formData.email)
      .subscribe((user: User) => {
        if (user) {
          if (user.password === formData.password) {
            this.message = new Message('', '');
            window.localStorage.setItem('user', JSON.stringify(user));
            this.authService.login();
            this.router.navigate(['/accounting', 'bill']);
          } else {
            this.showMessage('wrong email or password');
          }
        } else {
          this.showMessage('user don\'t exist');
        }
      });
  }
}
