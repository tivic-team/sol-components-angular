import { NgModule } from '@angular/core';
import { SolLibComponent } from './sol-lib.component';
import { MatInputModule } from '@angular/material/input';
import { BasicTextModule } from './basic-text/basic-text.module';
import { MatIconModule } from '@angular/material/icon';
import { BasicDropdownModule } from './basic-dropdown/basic-dropdown.module';
import { BasicCheckboxModule } from './basic-checkbox/basic-checkbox.module';


@NgModule({
  declarations: [
    SolLibComponent
  ],
  imports: [
    MatInputModule,
    BasicCheckboxModule,
    BasicDropdownModule,
    BasicTextModule,
    MatIconModule
  ],
  exports: [
    SolLibComponent,
    BasicCheckboxModule,
    BasicDropdownModule,
    BasicTextModule
  ]
})
export class SolLibModule { }
