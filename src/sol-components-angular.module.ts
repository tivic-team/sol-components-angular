import { NgModule,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GridExtendedComponent } from './form/elements/grid-extended/grid-extended.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import {
    MatAutocompleteModule,
    MatRadioModule, MatIconModule,
    MatSnackBarModule, MatGridListModule,
    MatMenuModule, MatToolbarModule,
    MatSidenavModule, MatListModule,
    MatTooltipModule, MatTableModule,
    MatSlideToggleModule, MatProgressBarModule, MatExpansionModule, MatBadgeModule, MatTabsModule, MatProgressSpinnerModule, MatTreeModule, MatRippleModule, MatPaginatorModule, MatNativeDateModule
} from '@angular/material';

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

