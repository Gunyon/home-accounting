import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { mergeMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

import { Category } from '../../shared/models/category.model';
import { HaEvent } from '../../shared/models/event.model';
import { EventsService } from '../../shared/services/events.service';
import { BillService } from '../../shared/services/bill.service';
import { Bill } from '../../shared/models/bill.model';
import { Message } from '../../../common/models/message.model';

@Component({
  selector: 'ha-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {

  sub1: Subscription;
  sub2: Subscription;
  @Input() categories: Category[] = [];
  types = [
    { type: 'income', label: 'Income' },
    { type: 'outcome', label: 'Outcome' }
  ];

  message: Message;

  constructor(
    private eventsService: EventsService,
    private billService: BillService
  ) { }

  ngOnInit() {
    this.message = new Message('danger', '');
  }

  private showMessage(text: string) {
    this.message.text = text;
    window.setTimeout(() => this.message.text = '', 4000);
  }

  onSubmit(form: NgForm) {
    const date = moment().format('DD.MM.YYYY HH:mm:ss');
    const { category,  type, description } = form.value;
    let { amount } = form.value;
    amount = Math.abs(amount);
    const event = new HaEvent(+category, type, amount, description, date);

    this.sub1 = this.billService.getBill()
      .subscribe((bill: Bill) => {
        let value = 0;
        if (type === 'outcome') {
          if (amount > bill.value) {
            this.showMessage('Not enough money');
            return;
          } else {
            value = bill.value - amount;
          }
        } else {
          value = bill.value + amount;
        }

        this.sub2 = this.billService.updateBill({ value, currency: bill.currency })
          .pipe(mergeMap(() => this.eventsService.addEvent(event)))
          .subscribe(() => {
            form.setValue({
              category: 1,
              type: 'outcome',
              amount: 0,
              description: ''
            });
          });
      });
  }

  ngOnDestroy() {
    if (this.sub1) { this.sub1.unsubscribe(); }
    if (this.sub2) { this.sub1.unsubscribe(); }
  }

}
