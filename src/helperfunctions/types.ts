export type BlobFile = {
    type:string,
    uri:string,
    name:string|undefined
  }


  export type CustomAlertMessageParams = {
    header:string, 
    message?:string,
    callBackFunc?:Function|null
  }