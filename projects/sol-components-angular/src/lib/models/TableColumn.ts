export class TableColumn{
    dataField:string;
    headerText:string;
    labelFunction:Function;
    sort:boolean;

    constructor(data?:{dataField:string, headerText:string, sort?:boolean, labelFunction?:Function,}){
        this.dataField = data && data.dataField || '';
        this.headerText = data && data.headerText || '';
        this.sort = data && data.sort || false;
        this.labelFunction = data && data.labelFunction || function(){};
    }
}