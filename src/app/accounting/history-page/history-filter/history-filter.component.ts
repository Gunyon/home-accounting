import { Component, Output, EventEmitter, Input } from '@angular/core';

import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'ha-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent {
  @Output() emitDismiss = new EventEmitter<any>();
  @Output() emitApply = new EventEmitter<any>();

  @Input() categories: Category[] = [];

  selectedPeriod = 'd';
  selectedTypes = new Set();
  selectedCategories = new Set();

  timePeriods = [
    { type: 'd', label: 'Day' },
    { type: 'w', label: 'Week' },
    { type: 'M', label: 'Month' }
  ];

  types = [
    { type: 'income', label: 'Income' },
    { type: 'outcome', label: 'Outcome' }
  ];

  closeModal() {
    this.selectedPeriod = 'd';
    this.selectedCategories.clear();
    this.selectedTypes.clear();
    this.emitDismiss.emit();
  }

  applyFilter() {
    this.emitApply.emit({
      types: this.selectedTypes,
      categories: this.selectedCategories,
      period: this.selectedPeriod
    });
  }

  private handleSet(setName: string, checked: boolean, value: string) {
    if (checked) {
      this[setName].add(value);
    } else {
      this[setName].delete(value);
    }
  }

  handleChangeType({ checked, value }) {
    this.handleSet('selectedTypes', checked, value);
  }

  handleChangeCategory({ checked, value }) {
    this.handleSet('selectedCategories', checked, value);
  }

}
