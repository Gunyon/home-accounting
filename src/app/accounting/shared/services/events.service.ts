import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import { BaseApi } from '../../../common/core/base-api';
import { HaEvent } from '../models/event.model';

@Injectable()
export class EventsService extends BaseApi {
  constructor(protected http: Http) {
    super(http);
  }

  addEvent(event: HaEvent): Observable<HaEvent> {
    return this.post('events', event);
  }

  getEvents(): Observable<HaEvent[]> {
    return this.get('events');
  }

  getEventById(id: string): Observable<HaEvent> {
    return this.get(`events/${id}`);
  }
}
