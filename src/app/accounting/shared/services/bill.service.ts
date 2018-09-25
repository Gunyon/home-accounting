import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Bill } from '../models/bill.model';
import { map } from 'rxjs/operators';
import { BaseApi } from '../../../common/core/base-api';

@Injectable()
export class BillService extends BaseApi {
  constructor(protected http: Http) {
    super(http);
  }

  getBill(): Observable<Bill> {
    return this.get('bill');
  }

  updateBill(bill: Bill): Observable<Bill> {
    return this.put('bill', bill);
  }

  getCurrency(): Observable<any> {
    return this.get('currency');
  }
}
