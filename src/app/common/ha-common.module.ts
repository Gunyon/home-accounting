import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LoaderComponent } from './component/loader/loader.component';

@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgxChartsModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    NgxChartsModule,
    LoaderComponent
  ]
})

export class HaCommonModule {}
