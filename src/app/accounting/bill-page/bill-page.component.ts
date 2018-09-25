import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, combineLatest } from 'rxjs';

import { BillService } from '../shared/services/bill.service';
import { Bill } from '../shared/models/bill.model';

@Component({
  selector: 'ha-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {

  subscrAll: Subscription;
  subscrCurrency: Subscription;
  currency: any;
  bill: Bill;
  isLoaded = false;

  constructor(private billService: BillService) { }

  ngOnInit() {
    this.subscrAll = combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency()
    ).subscribe((data: [Bill, any]) => {
      this.bill = data[0];
      this.currency = data[1];
      this.isLoaded = true;
    });
  }

  onRefresh() {
    this.isLoaded = false;
    this.subscrCurrency = this.billService.getCurrency().subscribe((currency: any) => {
      this.currency = currency;
      this.isLoaded = true;
    });
  }

  ngOnDestroy() {
    this.subscrAll.unsubscribe();
    if (this.subscrCurrency) {
      this.subscrCurrency.unsubscribe();
    }
  }
}
