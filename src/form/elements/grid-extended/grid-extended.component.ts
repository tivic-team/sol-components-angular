import { Component, ViewChild, Input, Output, EventEmitter, ElementRef, Injectable, Injector, ChangeDetectorRef, ComponentRef, ViewEncapsulation } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator, } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { DialogFactory } from "sol-tools-ts/dist/dialog/dialog-factory";


/** {GridComponent}
* Componente de grid para renderizacao de dados em linhas
*
* _datasource {ResultSetMap} - Dados a serem renderizados no grid, geralmente providos de um service
*
* options {any} - Opcoes para o grid
* columns {any} - Definicao de colunas para serem renderizadas no grid
* loadMethod {Function} - Busca de dados a serem renderizados no grid via service
* loadMethodValues {any} - Valores a serem enviados como argumentos para um service
*
*/
@Component({
    selector: 'sol-grid-extended',
    template: `
    <div fxLayout="column" fxFlex>
        <div #element fxLayout="column" fxFlex>
            <mat-label *ngIf="title">{{title}}</mat-label>
            <div class="grid-toolbar" fxLayoutAlign="start center" [fxShow]="selection.selected.length > 0 && (selectionMode == 'single' || selectionMode == 'multiple')">
                <span>{{selection.selected.length}} selecionado(s)</span>
                <button mat-icon-button [matMenuTriggerFor]="menu" *ngIf="selectionMode == 'multiple'">
                    <mat-icon>arrow_drop_down</mat-icon>
                </button>
                <mat-menu #menu="matMenu" yPosition="below" xPosition="after">
                    <button mat-menu-item (click)="selectAll($event)">Marcar todos
                        tudo</button>
                    <button mat-menu-item (click)="selection.clear()">Desmarcar todos</button>
                </mat-menu>
                <span fxFlex></span>
                <button mat-icon-button (click)="rowRemoveEvent.emit(selection.selected)">
                    <mat-icon>delete</mat-icon>
                </button>
            </div>
            <ng-container>
                <mat-table matSort #table [dataSource]="tableDataSource">
                    <ng-container matColumnDef="select">
                        <mat-header-cell *matHeaderCellDef style="width:60px; min-width: 60px;max-width: 60px">
                            <mat-checkbox (change)="selectAll($event);" *ngIf="selectionMode == 'multiple'"
                                [checked]="selection.hasValue() && isAllSelected()"
                                [disabled]="options.disabled"
                                [indeterminate]="selection.hasValue() && !rsm.isAllSelected()"></mat-checkbox>
                        </mat-header-cell>
                        <mat-cell *matCellDef="let register" style="width:60px; min-width: 60px;max-width: 60px">
                            <mat-checkbox (click)="$event.stopPropagation()"
                                [disabled]="options.disabled"
                                (change)="$event.register = register;gridCheckBoxChange($event, register); checkboxChange.emit($event);"
                                [checked]="selection.isSelected(register)"></mat-checkbox>
                                
                        </mat-cell>
                    </ng-container>
                    <ng-container *ngFor="let column of options.columns; let i = index">
                        <ng-container *ngIf="!column.type || column.type == 'label'" [matColumnDef]="column.dataField">
                            <mat-header-cell *matHeaderCellDef [ngStyle]="{'max-width': column.width}" mat-sort-header>
                                {{column.headerText}}
                            </mat-header-cell>
                            <mat-cell *matCellDef="let register" [ngStyle]="{'max-width': column.width}" (click)="cellOnClick(column, register, $event)">
                                <div *ngIf="!column.asyncLabelFunction" >
                                    {{processLabelFunction(column, register)}}
                                </div>
                                <div *ngIf="column.asyncLabelFunction" >
                                    {{processAsyncLabelFunction(column, register)}}
                                </div>
                            </mat-cell>
                            <mat-cell *matCellDef="let register" [ngStyle]="{'max-width': column.width}">
                                {{register[column.dataField]}}
                            </mat-cell>
                        </ng-container>
                        <ng-container *ngIf="column.type == 'check'" [matColumnDef]="column.dataField">
                            <mat-header-cell *matHeaderCellDef [ngStyle]="{'max-width': column.width}" mat-sort-header>
                                {{column.headerText}}
                            </mat-header-cell>
                            <mat-cell *matCellDef="let register" [ngStyle]="{'max-width': column.width}">
                                <mat-checkbox (click)="$event.stopPropagation()"
                                    (change)="fieldCheckBoxChange($event, register, column.dataField)"
                                    [disabled]="options.disabled"
                                    [checked]="fieldCheckSelected(register, column.dataField)"></mat-checkbox>
                            </mat-cell>
                        </ng-container>
                        <ng-container *ngIf="column.type == 'text'" [matColumnDef]="column.dataField">
                            <mat-header-cell *matHeaderCellDef [ngStyle]="{'max-width': column.width}" mat-sort-header>
                                {{column.headerText}}
                            </mat-header-cell>
                            <mat-cell *matCellDef="let register" [ngStyle]="{'max-width': column.width}">
                                <mat-form-field appearance="outline" [ngStyle]="{'width': column.width}">
                                    <input matInput 
                                    (change)="changeText($event, register, column.dataField)"
                                    [value]="register[column.dataField]"
                                    [attr.disabled]="options.disabled"
                                    />
                                </mat-form-field>
                            </mat-cell>
                        </ng-container>
                    </ng-container>
                    <ng-container matColumnDef="actions" *ngIf="options.enable !== null" stickyEnd>
                        <mat-header-cell *matHeaderCellDef class="action-area"> </mat-header-cell>
                        <mat-cell class="action-column" *matCellDef="let register" class="action-area">
                            <button mat-icon-button [matMenuTriggerFor]="menu" (click)="$event.stopPropagation();">
                                <mat-icon>more_vert</mat-icon>
                            </button>
                            <mat-menu #menu="matMenu">
                                <button mat-menu-item *ngIf="options.enable.edit"
                                    (click)="edit(register)">Visualizar</button>
                                <button mat-menu-item *ngIf="options.enable.remove"
                                    (click)="remove(register)">Deletar</button>
                                <button mat-menu-item *ngFor="let item of options.enable.additional; let i = index"
                                    (click)="item.click(register)">{{item.nameField}}</button>
                            </mat-menu>
                        </mat-cell>
                    </ng-container>
                    <mat-header-row fxLayoutGap="10px" *matHeaderRowDef="displayedColumns"></mat-header-row>
                    <mat-row fxLayoutGap="10px" #gridLines *matRowDef="let register; columns: displayedColumns"
                        [class.mat-hover]="rowClick.observers.length > 0" [class.mat-selected]="selection.isSelected(register)"
                        (click)="onRowClick($event, register)" (dblclick)="onRowDoubleClick($event, register)"></mat-row>
                </mat-table>
            </ng-container>
            <div class="no-rows" *ngIf="tableDataSource.data && tableDataSource.data.length == 0">
                Nenhum registro encontrado.
            </div>
        </div>
        <mat-paginator fxFlex="56px" [pageSizeOptions]="[5, 10, 15, 20, 50]"></mat-paginator>
    </div>
    `,
    encapsulation: ViewEncapsulation.None,
    styles: [`
        //min-width: 100%;
        max-height: 100%;
        flex: 1 !important;
        display: flex;
        flex-direction: column;
        position: relative;
        #gridContent {
            min-height: calc(100% - 59px);
            display: block;
        }
        .action-area {
            width: 48px !important;
            max-width: 48px !important;
        }
        h5,
        mat-label {
            margin: 0px 10px 0px;
            font-size: 11px;
        }

        .mat-header-cell{
            font-size: 10px;
        }

        .mat-cell{
            font-size: 12px;
        }

        .add-fab-button {
            position: absolute;
            right: 0px;
            bottom: 50px;
            z-index: 1;
        }
        .grid-toolbar {
            position: absolute;
            max-height: 57px;
            min-height: 57px;
            min-width: 100%;
            top: 0;
            left: 0;
            color: #fff;
            background: #03a9f4;
            padding: 10px;
            border-radius: 3px;
            animation-name: slideDown;
            -webkit-animation-name: slideDown;
            animation-duration: 0.3s;
            -webkit-animation-duration: 0.3s;
            animation-timing-function: ease;
            -webkit-animation-timing-function: ease;
            visibility: visible !important;
            z-index: 2;
        }
        mat-table {
            min-width: 100% !important;
            overflow-x: hidden !important;
            overflow-y: auto;
            max-height: 35vh;
        }

        .mat-header-row {
            padding: 0;
            border: none;
            cursor: pointer !important;
        }
        .mat-header-row .mat-row .mat-header-cell .mat-cell {
            display: table-cell;
            height: 48px;
            max-height: 48px;
            vertical-align: middle;
            border-bottom: 1px solid rgba(0, 0, 0, 0.12);
            cursor: pointer !important;
        }
        .mat-row {
            z-index: 0;
            &:hover {
                padding: 0;
                border: none;
                cursor: pointer !important;
                background: #eee;
                z-index: 2;
            }
            /* &.mat-selected {
                background: #aaa !important;
            } */
        }

        .mat-row:hover {
            padding: 0;
            border: none;
            cursor: pointer !important;
            background: #eee;
            z-index: 2;
        }

        .mat-form-field-infix{
            width: auto;
        }

        .action-column{
            max-width: 50px;
        }

        .no-rows {
            position: relative;
            padding: 15px;
            text-align: center;
            min-width: 100%;
            box-sizing: border-box;
            font-size: 0.85em;
        }
    
        @keyframes slideDown {
            0% {
                transform: translateY(-10%);
            }
            100% {
                transform: translateY(0%);
            }
        }
    
        @-webkit-keyframes slideDown {
            0% {
                -webkit-transform: translateY(-10%);
            }
            100% {
                -webkit-transform: translateY(0%);
            }
        }
    
    `]
})

@Injectable()
export class GridExtendedComponent {
    public tableDataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
    public selection:SelectionModel<any> = new SelectionModel<any>(false);
    
    formRegister: ComponentRef<any>;
    displayedColumns = <any>[];
    regOldRegisterSelected = {};

    trackByStrategy: any = 'id';
    pageIndex: number = 0;

    itemsPerPageLabel: 'Registros por página:';
    nextPageLabel: 'Próxima Página';
    previousPageLabel: 'Página Anterior';

    @Input() options: any = { columns: null, enable: {} };
    @Input() columns: any;
    @Input() loadOnInit: boolean = true;
    @Input() loadMethod: any;
    @Input() loadMethodValues: any;
    @Input() selectionMode: 'none' | 'single' | 'multiple' = 'none';
    @Input() title: any;
    @Input() checkboxControl: boolean;
    @Input() pagination: boolean = true;
    @Input() pageSize: number = 0;

    @Input() typeButtonBox: any;
    @Input() contentRegister: any;
    @Input() localClassRegister: any;
    @Input() saveRegister: any;
    @Input() save: any;
    @Input() removeRegister: any;
    @Input() persistOnRegister: any;
    @Input() loadAfterSaveRegister: any;
    @Input() disabled: boolean;
    @Input() selectionByRow: boolean = true;
    @Input() loadContent: any;
    @Input() allowRowClickGrid: any;
    @Input() messageAllowRowClickGrid: any;

    @Input('dataSource') public dataSource: Array<any>;


    @Output() rowAddEvent: EventEmitter<any> = new EventEmitter();
    @Output() rowEditEvent: EventEmitter<any> = new EventEmitter();
    @Output() rowRemoveEvent: EventEmitter<any> = new EventEmitter();
    @Output() rowDoubleClick: EventEmitter<any> = new EventEmitter();
    @Output() checkboxChange: EventEmitter<any> = new EventEmitter();
    @Output() rowClick: EventEmitter<any> = new EventEmitter();
    @Output() afterLoad: EventEmitter<any> = new EventEmitter();
    @Output() ready: EventEmitter<any> = new EventEmitter();

    @ViewChild('element', { read: ElementRef, static: true }) element: ElementRef;
    @ViewChild('gridLines', { read: ElementRef, static: true }) private gridLines: ElementRef;
    @ViewChild(MatPaginator, { static: true }) paginator:any;
    @ViewChild(MatSort, { static: true }) matSort:MatSort;
    @ViewChild(MatPaginator, { static: true }) matPaginator:MatPaginator;

    setDataSourceAttributes() {
        this.tableDataSource.paginator = this.matPaginator;
        this.tableDataSource.sort = this.matSort;
        this.detector.detectChanges();
    }

    constructor(
        private detector: ChangeDetectorRef,
        private dialogFactory:DialogFactory
    ) {
        this.displayedColumns = [];
    }

    async ngOnInit() {
        
        this.options['dataSource'] = this.dataSource || this.options.dataSource;
        this.options['columns'] = this.columns || this.options.columns;
        this.options['pageSize'] = this.options && this.options.pageSize ? this.options.pageSize : this.pageSize;
        this.options['loadOnInit'] = this.options && this.options.loadOnInit != undefined ? this.options.loadOnInit : this.loadOnInit;
        this.options['loadMethod'] = this.options && this.options.loadMethod ? this.options.loadMethod : this.loadMethod;
        this.options['loadMethodValues'] = this.options && this.options.loadMethodValues ? this.options.loadMethodValues : this.loadMethodValues;
        this.options['loadAfterSaveRegister'] = this.options && this.options.loadAfterSaveRegister ? this.options.loadAfterSaveRegister : this.loadAfterSaveRegister;
        this.options['sort'] = this.options && this.options.sort ? this.options.sort : this.matSort;
        this.options['selectionMode'] = this.options && this.options.selectionMode ? this.options.selectionMode : this.selectionMode;
        this.options['checkboxControl'] = this.options && this.options.checkboxControl ? this.options.checkboxControl : this.checkboxControl;
        this.options['tooltipPosition'] = this.options && this.options.tooltip && !this.options.tooltipPosition ? 'below' : this.options.tooltipPosition;
        this.options['disabled'] = this.options && this.options.disabled ? this.options.disabled : this.disabled;
        this.options['selectionByRow'] = this.options && this.options.selectionByRow ? this.options.selectionByRow : this.selectionByRow;
        this.options['loadContent'] = this.options && this.options.loadContent ? this.options.loadContent : this.loadContent;
        this.options['allowRowClickGrid'] = this.options && this.options.allowRowClickGrid ? this.options.allowRowClickGrid : this.allowRowClickGrid;
        this.options['messageAllowRowClickGrid'] = this.options && this.options.messageAllowRowClickGrid ? this.options.messageAllowRowClickGrid : this.messageAllowRowClickGrid;

        if (this.options.selectionMode !== 'none')
            this.displayedColumns.push('select');

        if (this.options && this.options.columns) {
            for (let i = 0; i < this.options.columns.length; i++) {
                this.displayedColumns.push(this.options.columns[i].dataField);
            }
            if (this.options.enable && Object.keys(this.options.enable).length > 0)
                this.displayedColumns.push('actions');
        }

        if (this.options && this.options.loadMethodValues) {
            this.loadMethodValues = this.options.loadMethodValues;
        }

        if (this.options.loadOnInit)
            await this.load();
    }

    ngAfterContentInit() {
        this.paginator.pageSize = this.pageSize;
        this.ready.emit(this);
        this.detector.detectChanges();
    }

    processLabelFunction(column:any, register:any){
        if (column && column.labelFunction && column.labelFunction instanceof Function) {
            return column.labelFunction(column, register);
        }
        return register[column.dataField] && register[column.dataField] || "";
    }

    async processAsyncLabelFunction(column:any, register:any):Promise<any>{
        return await column.asyncLabelFunction(column, register);
    }

    async cellOnClick(column:any, register:any, $event:any) {
        if (column && column.onClick && column.onClick instanceof Function) {
            $event.stopPropagation();
            column.onClick(column, register);
        }
    }

    public async load(dataSource?:Array<any>) {
        if(dataSource)
            this.options.dataSource = dataSource;
        let loadMethodValues = this.loadMethodValues instanceof Function ? this.loadMethodValues() : this.loadMethodValues;
        if(this.options.dataSource)
            this.tableDataSource = new MatTableDataSource(this.options.dataSource);
        if(this.options.loadMethod)
            this.tableDataSource.data = await this.options.loadMethod(loadMethodValues);
        this.tableDataSource.sort = this.matSort;
        this.tableDataSource.paginator = this.paginator;

        this.detector.detectChanges();

        this.onAfterLoad();
    }

    public gridCheckBoxChange($event:any, register:any) {
        if (this.options.allowRowClickGrid && !this.options.allowRowClickGrid($event) && this.options.messageAllowRowClickGrid) {
            this.selection.clear();
            this.dialogFactory.snackBar('Ooops!', this.options.messageAllowRowClickGrid, DialogFactory.TOASTY_ERROR);
            if ($event instanceof MatCheckboxChange) {
                $event.source.checked = false;
            }
            return;
        }

        if ($event && !this.options.disabled) {
            if (this.options.selectionMode == 'single') {
                if (!this.selection.isSelected($event.register)) {
                    this.selection.clear();
                    this.selection.select($event.register);
                    if ($event instanceof MatCheckboxChange && this.options.rowClick) {
                        this.options.rowClick($event);
                    }
                } else {
                    this.selection.deselect($event.register);
                    if ($event instanceof MatCheckboxChange) {
                        $event.source.checked = true;
                        this.detector.detectChanges();
                    }
                }
            } else if (this.options.selectionMode == 'multiple') {
                $event ? this.selection.toggle($event.register) : null;
            }
        }

        if (this.options.rowSelect instanceof Function) {
            this.options.rowSelect(register);
        }
    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.tableDataSource.data.length;
        return numSelected === numRows;
    }

    public selectAll($event: MatCheckboxChange) {
        this.isAllSelected() ?
        this.selection.clear() :
        this.tableDataSource.data.forEach(row => this.selection.select(row));
    }

    public getSelected() {

        let register;

        if (this.persistOnRegister) {
            let object;
            if (this.persistOnRegister instanceof Function) {
                object = this.persistOnRegister();
            }
            else {
                object = this.persistOnRegister;
            }

            register = object;
        }

        if (!register || register == null)
            register = {};

        let selectedRegister;
        if (this.options.selectionMode == 'single')
            selectedRegister = this.selection.selected[0];
        else if (this.options.selectionMode == 'multiple')
            selectedRegister = this.selection.selected;

        if (!selectedRegister || selectedRegister == null)
            return selectedRegister;

        for (let reg in selectedRegister) {
            register[reg] = selectedRegister[reg];
        }

        return register;
    }

    public onRowClick(event?:any, register?: any): void {

        if (this.options.disabled) {
            return;
        }

        if (this.options.allowRowClickGrid) {

            if (!event.register)
                event.register = register;

            if (!this.options.allowRowClickGrid(event) && this.options.messageAllowRowClickGrid) {
                this.selection.clear();
                this.dialogFactory.snackBar('Ooops!', this.options.messageAllowRowClickGrid, DialogFactory.TOASTY_ERROR);
                if (event instanceof MatCheckboxChange) {
                    event.source.checked = false;
                }
                return;
            }
        }

        event.register = register;

        if (this.options.rowClick && this.options.rowClick instanceof Function) {
            this.options.rowClick(register);
        } else if (this.rowClick && this.rowClick instanceof EventEmitter && this.rowClick.observers.length > 0) {
            if (this.options.selectionByRow) {
                this.selection.clear();
                this.selection.select(register);
            }
            //this.detectChanges.detectChanges();
            this.rowClick.emit(event);
        } else {
            if (this.options.selectionByRow) {
                if (this.options.selectionMode == 'single')
                    this.selection.clear();
                event ? this.selection.toggle(register) : null;
            }

            if (this.options.rowSelect instanceof Function) {
                this.options.rowSelect(register);
            }


            event.stopPropagation();
        }
    }

    public onRowDoubleClick(event?:any, register?:any): void {

        if (this.options.disabled) {
            return;
        }

        if (this.options.rowDoubleClick instanceof Function) {
            this.options.rowDoubleClick(register);
        } else if (this.rowDoubleClick && this.rowDoubleClick instanceof EventEmitter && this.rowDoubleClick.observers.length > 0) {
            event['register'] = register;
            this.rowDoubleClick.emit(event);
        }
    }

    public onAfterLoad(): void {
        if (this.options.afterLoad && this.options.afterLoad instanceof Function) {
            this.options.afterLoad(event);
            return;
        }

        if (this.afterLoad && this.afterLoad instanceof EventEmitter && this.afterLoad.observers.length > 0)
            this.afterLoad.emit(event);
    }

    public getRegisterDialog(reg?:any) {
        let register: any = {};
        if (this.persistOnRegister) {
            let object;
            if (this.persistOnRegister instanceof Function) {
                object = this.persistOnRegister();
            }
            else {
                object = this.persistOnRegister;
            }

            register = object;
        }
        for (let i = 0; i < this.contentRegister.length; i++) {
            for (let j = 0; j < this.contentRegister[i].fields.length; j++) {
                let f: any = this.contentRegister[i].fields[j];
                register[f.reference] = (reg ? reg[f.reference] : '');
            }
        }

        return register;
    }


    public edit(register:any) {

        if (!register || register == null) {
            this.dialogFactory.snackBar('Ooops!', 'Nenhum registro foi selecionado', DialogFactory.TOASTY_ERROR);
            return;
        }

        if (this.rowEditEvent.observers.length > 0) {
            this.rowEditEvent.emit(register);
            return false;
        }

    }

    public loadAfterSave() {
        if (this.options.loadAfterSaveRegister instanceof Function) {
            this.options.loadAfterSaveRegister();
        }
        this.load();
    }

    public remove(register:any) {
        if (!register || register == null) {
            this.dialogFactory.snackBar('Ooops!', 'Nenhum registro foi selecionado', DialogFactory.TOASTY_ERROR);
            return;
        }

        if (this.rowRemoveEvent.observers.length > 0) {
            this.rowRemoveEvent.emit(register);
            return false;
        }

        this.dialogFactory.confirm('Atenção!', 'Este registro será removido. Deseja continuar?').subscribe(async (resp) => {
            if (resp) {
                let result = await this.removeRegister(register);
                if (result.getCode() > 0) {
                    this.loadAfterSave();
                    this.dialogFactory.snackBar('Certo!', result.getMessage(), DialogFactory.TOASTY_SUCCESS);
                } else {
                    this.dialogFactory.snackBar('Ooops!', result.getMessage(), DialogFactory.TOASTY_ERROR);
                }
            }
        });
    }

    public fieldCheckBoxChange($event:any, register:any, dataField:any){
        register[dataField] = $event.checked ? 1 : 0;
    }

    public fieldCheckSelected(register:any, dataField:any){
        return register[dataField] == 1;
    }

    public changeText($event:any, register:any, dataField:any){
        register[dataField] = $event.target.value;
    }
}
