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
    templateUrl: './grid-extended.component.html',
    stylesUrl: [`./grid-extended.component.html`]
})
export class GridExtendedComponent {
    public tableDataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
    public selection:SelectionModel<any> = new SelectionModel<any>(false);
    
    formRegister: ComponentRef<any>;
    displayedColumns = <any>[];
    regOldRegisterSelected = {};

    trackByStrategy: any = 'id';
    @Input() pageIndex: number = 0;

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
        this.options['pageIndex'] = this.options && this.options.pageIndex ? this.options.pageIndex : this.pageIndex;
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
        setTimeout(()=>{
            this.tableDataSource.paginator?.firstPage();
            if(this.tableDataSource.paginator){
                let contador:number = this.pageIndex;
                while(contador > 0){
                    this.tableDataSource.paginator.nextPage();
                    contador--;
                }
            }
        }, 500);
        
        

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
        this.isAllSelected() ? this.selection.clear() : this.tableDataSource.data.forEach(row => this.selection.select(row));
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

    public fieldCheckBoxChange($event:any, register:any, column:any){
        register[column.dataField] = $event.checked ? 1 : 0;
        if(column.onCheck){
            column.onCheck(register, $event.checked);
        }
    }

    public fieldCheckSelected(register:any, dataField:any){
        return register[dataField];
    }

    public changeText($event:any, register:any, dataField:any){
        register[dataField] = $event.target.value;
    }
}
