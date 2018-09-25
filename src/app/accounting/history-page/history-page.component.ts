import { Component, OnInit, OnDestroy } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import * as moment from 'moment';

import { CategoriesService } from '../shared/services/categories.service';
import { EventsService } from '../shared/services/events.service';
import { Category } from '../shared/models/category.model';
import { HaEvent } from '../shared/models/event.model';

@Component({
  selector: 'ha-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  constructor(
    private categoriesService: CategoriesService,
    private eventsService: EventsService
  ) { }

  isLoaded = false;
  subs: Subscription;
  categories: Category[] = [];
  events: HaEvent[] = [];
  filteredEvents: HaEvent[] = [];
  chartData = [];
  isFilterVisible = false;


  ngOnInit() {
    this.subs = combineLatest(
      this.categoriesService.getCategories(),
      this.eventsService.getEvents()
    ).subscribe((data: [Category[], HaEvent[]]) => {
      [this.categories, this.events] = data;
      this.setOriginalEvents();
      this.calculateChartData();
      this.isLoaded = true;
    });
  }

  calculateChartData(): void {
    this.chartData = [];
    this.categories.forEach((cat) => {
      const catEvent = this.filteredEvents.filter((e) => {
        return e.category === cat.id && e.type === 'outcome';
      });
      this.chartData.push({
        name: cat.name,
        value: catEvent.reduce((total, e) => {
          total += e.amount;
          return total;
        }, 0)
      });
    });
  }

  private toggleFilterVisibility(dir: boolean) {
    this.isFilterVisible = dir;
  }

  private setOriginalEvents() {
    this.filteredEvents = this.events.slice();
  }

  openFilter() {
    this.toggleFilterVisibility(true);
  }

  closeFilterModal() {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();
    this.calculateChartData();
  }

  applyFilter({ types: t, categories: c, period: p }) {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();

    const startPeriod = moment().startOf(p).startOf('d');
    const endPeriod = moment().endOf(p).endOf('d');

    this.filteredEvents = this.filteredEvents.filter((e) => {
      return t.has(e.type) && c.has(e.category.toString());
    }).filter((e) => {
      const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss');
      return momentDate.isBetween(startPeriod, endPeriod);
    });
    this.calculateChartData();
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

}
