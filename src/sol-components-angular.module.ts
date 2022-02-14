import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatAutocompleteModule, MatBadgeModule, MatExpansionModule, MatGridListModule, MatIconModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSidenavModule, MatSlideToggleModule, MatSnackBarModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule
} from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { GridExtendedComponent } from './form/elements/grid-extended/grid-extended.component';

let components = [
    GridExtendedComponent
];

let modules = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    
    /* Material imports */
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDatepickerModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatIconModule,
    MatSelectModule,
    MatSnackBarModule,
    MatGridListModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    MatTableModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    MatGridListModule,
    MatExpansionModule,
    MatBadgeModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatTreeModule,
    MatRippleModule,
    MatPaginatorModule,
    MatNativeDateModule
];

@NgModule({
    entryComponents: [
        ...components
    ],
    declarations:[
        ...components
    ],
    exports:[
        ...components,
    ],
    imports: [
        ...modules
    ]
})
export class SolComponentsAngularModule{}

