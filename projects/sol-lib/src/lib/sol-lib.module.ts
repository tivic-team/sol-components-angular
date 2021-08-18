import { NgModule } from '@angular/core';
import { SolLibComponent } from './sol-lib.component';
import { MatInputModule } from '@angular/material/input';
import { BasicTextModule } from './basic-text/basic-text.module';
import { MatIconModule } from '@angular/material/icon';
import { BasicDropdownModule } from './basic-dropdown/basic-dropdown.module';


@NgModule({
  declarations: [
    SolLibComponent
  ],
  imports: [
    MatInputModule,
    BasicTextModule,
    BasicDropdownModule,
    MatIconModule
  ],
  exports: [
    SolLibComponent,
    BasicDropdownModule,
    BasicTextModule
  ]
})
export class SolLibModule { }
