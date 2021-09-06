export default interface IData {
    addData(data: any): void,
    addArrayData(data: Array<any>): void,
    getData: () => any
}