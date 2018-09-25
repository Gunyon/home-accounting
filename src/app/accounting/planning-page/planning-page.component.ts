import { Component, OnInit, OnDestroy } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';

import { BillService } from '../shared/services/bill.service';
import { CategoriesService } from '../shared/services/categories.service';
import { EventsService } from '../shared/services/events.service';
import { Bill } from '../shared/models/bill.model';
import { Category } from '../shared/models/category.model';
import { HaEvent } from '../shared/models/event.model';

@Component({
  selector: 'ha-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

  subs: Subscription;
  isLoaded = false;
  bill: Bill;
  categories: Category[] = [];
  events: HaEvent[] = [];
  groupedEvents: {};

  constructor(
    private billService: BillService,
    private categoriesService: CategoriesService,
    private eventService: EventsService
  ) { }

  ngOnInit() {
    const billStream = this.billService.getBill();
    const categoriesStream = this.categoriesService.getCategories();
    const eventsStream = this.eventService.getEvents();
    this.subs = combineLatest(billStream, categoriesStream, eventsStream)
      .subscribe((data: [Bill, Category[], HaEvent[]]) => {
        [this.bill, this.categories, this.events] = data;
        this.isLoaded = true;
      });
  }

  getCategoryCost(cat: Category): number {
    const catEvents = this.events.filter(e => e.category === cat.id && e.type === 'outcome');
    return catEvents.reduce((total, e) => {
      total += e.amount;
      return total;
    }, 0);
  }

  private getPercent(cat: Category): number {
    const percent = (100 * this.getCategoryCost(cat)) / cat.capacity;
    return percent > 100 ? 100 : percent;
  }

  getCatPercent(cat: Category): string {
    return this.getPercent(cat) + '%';
  }

  getCatColorClass(cat: Category): string {
    const percent = this.getPercent(cat);
    return percent < 50 ? 'success' : percent >= 100 ? 'danger' : 'warning';
  }

  ngOnDestroy() {
    if (this.subs) { this.subs.unsubscribe(); }
  }

}
