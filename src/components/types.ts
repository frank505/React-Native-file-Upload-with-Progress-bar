export type ButtonType = {
    backgroundColor?:string,
    borderColor?:string,
    width?:string,
    height?:number,
    onPress?:(optionalParams?:any) => void,
    disabled?:boolean,
    textString:string,
    testID:string
}