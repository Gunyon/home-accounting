import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mergeMap } from 'rxjs/operators';

import { EventsService } from '../../shared/services/events.service';
import { CategoriesService } from '../../shared/services/categories.service';
import { HaEvent } from '../../shared/models/event.model';
import { Category } from '../../shared/models/category.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ha-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

  subs: Subscription;
  event: HaEvent;
  category: Category;
  isLoaded = false;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventsService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.subs = this.route.paramMap
      .pipe(mergeMap((params: ParamMap) => this.eventService.getEventById(params.get('id'))))
      .pipe(mergeMap((event: HaEvent) => {
        this.event = event;
        return this.categoriesService.getCategoryById(event.category);
      }))
      .subscribe((category: Category) => {
        this.category = category;
        this.isLoaded = true;
      });
  }

  ngOnDestroy() {
    if (this.subs) { this.subs.unsubscribe(); }
  }

}
