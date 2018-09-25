import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { CategoriesService } from '../../shared/services/categories.service';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'ha-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnDestroy {

  sub: Subscription;
  @Output() emitAddCategory = new EventEmitter<Category>();

  constructor(private categoriesService: CategoriesService) { }

  onSubmit(form: NgForm) {
    const { name } = form.value;
    let { capacity } = form.value;
    capacity = Math.abs(capacity);

    const category = new Category(name, capacity);

    this.sub = this.categoriesService.addCategory(category)
      .subscribe((categoryResp: Category) => {
        form.reset();
        form.form.patchValue({ capacity: 1 });
        this.emitAddCategory.emit(categoryResp);
      });
  }

  ngOnDestroy() {
    if (this.sub) { this.sub.unsubscribe(); }
  }
}
