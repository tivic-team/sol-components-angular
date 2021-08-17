import { NgModule } from '@angular/core';
import { SolLibComponent } from './sol-lib.component';
import { MatInputModule } from '@angular/material/input';
import { BasicTextModule } from './basic-text/basic-text.module';
import { BasicTextComponent } from './basic-text/basic-text.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    SolLibComponent
  ],
  imports: [
    MatInputModule,
    BasicTextModule,
    MatIconModule
  ],
  exports: [
    SolLibComponent,
    BasicTextComponent
  ]
})
export class SolLibModule { }
