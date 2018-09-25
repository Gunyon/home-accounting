import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { BaseApi } from '../../../common/core/base-api';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';

@Injectable()
export class CategoriesService extends BaseApi {
  constructor(protected http: Http) {
    super(http);
  }

  addCategory(category: Category): Observable<Category> {
    return this.post('categories', category);
  }

  getCategories(): Observable<Category[]> {
    return this.get('categories');
  }

  updateCategory(category: Category): Observable<Category> {
    return this.put(`categories/${category.id}`, category);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.get(`categories/${id}`);
  }
}
