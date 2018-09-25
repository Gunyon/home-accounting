import { Component, HostBinding } from '@angular/core';

import { fadeStateTrigger } from '../common/animations/fade.animation';

@Component({
  selector: 'ha-accounting',
  templateUrl: 'accounting.component.html',
  animations: [fadeStateTrigger]
})

export class AccountingComponent {
  @HostBinding('@fade') a = true;
}
