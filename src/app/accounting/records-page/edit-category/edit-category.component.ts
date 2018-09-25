import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Category } from '../../shared/models/category.model';
import { CategoriesService } from '../../shared/services/categories.service';
import { Message } from '../../../common/models/message.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ha-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  @Input() categories: Category[] = [];
  @Output() emitChangeCategory = new EventEmitter<Category>();

  currentCategoryId: number;
  currentCategory: Category;
  message: Message;
  sub: Subscription;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.message = new Message('success', '');
    this.currentCategoryId = this.categories[0].id;
    this.onChangeCategory();
  }

  onChangeCategory() {
    this.currentCategory = this.categories.find(cat => {
      return cat.id === +this.currentCategoryId;
    });
  }

  onSubmit(form: NgForm) {
    const { name } = form.value;
    let { capacity } = form.value;
    capacity = Math.abs(capacity);

    const category = new Category(name, capacity, +this.currentCategoryId);

    this.sub = this.categoriesService.updateCategory(category)
      .subscribe((categoryResp: Category) => {
        // console.log(categoryResp);
        this.emitChangeCategory.emit(categoryResp);
        this.message.text = 'Category successfully updated';
        window.setTimeout(() => this.message.text = '', 4000);
      });
  }

  ngOnDestroy() {
    if (this.sub) { this.sub.unsubscribe(); }
  }
}
