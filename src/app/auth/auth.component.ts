import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

import { fadeStateTrigger } from '../common/animations/fade.animation';

@Component({
  selector: 'ha-auth',
  templateUrl: './auth.component.html',
  animations: [fadeStateTrigger]
})

export class AuthComponent implements OnInit {
  @HostBinding('@fade') a = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.navigate(['/login']);
  }
}
