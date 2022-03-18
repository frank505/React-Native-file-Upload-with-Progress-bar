export type PostRequestType = {
    method:string,
    formData:any,
    onUploadProgress:(progressEvent:any) => void,
    addedUrl:string,
    contentType:string
}