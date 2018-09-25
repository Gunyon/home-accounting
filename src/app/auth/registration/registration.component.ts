import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { UsersService } from '../../common/services/users.service';
import { User } from '../../common/models/user.model';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'ha-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private title: Title,
    private meta: Meta
  ) {
    title.setTitle('Registration page');
  }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmail.bind(this)),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'name': new FormControl(null, [Validators.required]),
      'agree': new FormControl(null, [Validators.requiredTrue])
    });
  }

  onSubmit() {
    // console.log(this.form);
    const { email, password, name } = this.form.value;
    const user = new User(email, password, name);
    this.usersService.creatNewUser(user)
      .subscribe(() => {
        this.router.navigate(['/login'], {
          queryParams: {
            nowCanLogin: true,
            email: email
          }
        });
      });
  }

  forbiddenEmail(control: FormControl): Promise<any> {
    return new Promise((resolve, reject) => {
      this.usersService.getUserByEmail(control.value)
        .subscribe((user: User) => {
          if (user) {
            resolve({ forbiddenEmail: true });
          } else {
            resolve(null);
          }
        });
    });
  }

}
