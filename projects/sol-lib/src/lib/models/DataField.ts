import IData from "../interfaces/IData";

export class DataField implements IData{
    _dataList: Array<{cd: string, label: string}>;

    constructor(list: Array<{cd: string, label: string}>) {
        this._dataList = list;
    }

    public addData(list: {cd: string, label: string}){
        this._dataList.push(list);
    }

    public addArrayData(lists: Array<{cd: string, label: string}>){
        lists.forEach(list => {
            this._dataList.push(list);
        });
    }

    public getData():  Array<{cd: string, label: string}> {
        return this._dataList;
    }
}